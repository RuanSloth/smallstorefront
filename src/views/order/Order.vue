<template>
  <div id="order">
    <van-nav-bar  class="zindex"  @click-left="back" left-text="返回" placeholder fixed left-arrow
                  title="提交订单">
    </van-nav-bar>
    <div class="title">你的订单</div>
<!--    <div class="store">仲恺分店</div>-->
    <van-row v-for="(item,index) in good">
      <van-col span="5" offset="2" style="margin-top: 30px">
          {{item.goodname}}<br>
        {{item.parameter}}<br>
        数量：{{item.number}}<br>
        单价：￥{{item.price}}.00
      </van-col>
      <van-col offset="2" span="8">
        <van-image
            width="100px"
            height="100px"
            :src=this.$store.getters.getUrl+item.coverphoto
        />
      </van-col>

      <van-col span="4" offset="3" style="margin-top: 30px">
        <div>￥{{(item.price*item.number).toFixed(2)}}</div>
      </van-col>
    </van-row>
    <van-field
        v-model="sname"
        is-link
        readonly
        label="店铺"
        placeholder="请选择店铺"
        @click="sshow = true"
    />
    <van-popup v-model:show="sshow" round position="bottom">
      <van-cascader
          v-model="sid"
          title="请选择所在店铺"
          :options="soptions"
          @close="sshow = false"
          @finish="sonFinish"
      />
    </van-popup>



    <div style="margin-left: 30px ;font-size: 16px">
      送货方式：到店自取
      <van-switch v-model="mchecked"/>
      配送
    </div>
    <van-field
        v-model="aname"
        is-link
        readonly
        label="地址"
        placeholder="请选择地址"
        v-if="mchecked"
        @click="ashow = true"
    />
    <van-popup v-model:show="ashow" round position="bottom">
      <van-cascader
          v-model="aid"
          title="请选择所在地址"
          :options="aoptions"
          @close="ashow = false"
          @finish="aonFinish"
      />
    </van-popup>
    <div style="margin-left: 30px ;font-size: 16px;margin-top: 20px">优惠券：无</div>

    <van-button type="primary" style="position: absolute;bottom: 50px;right: 50px" @click="tocommit">提交订单</van-button>
  </div>
</template>

<script>
import {request} from "@/network/request";
import qs from "qs";

export default {
  name: "Order",
  data(){
    return {
      lastprice: 0,
      sumprice : 0,
      good:[],
      mchecked: false,
      method: '',
      aid: 0,
      sname: '',
      aname: '',
      mid: 1001,
      cid: 0,
      sid: 0,
      storelist: [],
      addresslist: [],
      sshow: false,
      soptions:[],
      aoptions:[],
      ashow: false,

      good1:[],
      n1: [],
      p1:[],
    }
  },
  methods:{
    sonFinish({ selectedOptions }){
      this.sshow = false;
      this.sname = selectedOptions.map((option) => option.text)
    },

    aonFinish({ selectedOptions }){
      this.ashow = false;
      this.aname = selectedOptions.map((option) => option.text)
    },
    /**
     * 网络请求
     */
    /**
     * 网络请求
     */
    getAllAddress(){
      request({
        url: '/address?action=queryAddress',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.addresslist = res.data
          for(let i= 0 ;i< this.addresslist.length ;i ++){
            let option = {
                text: this.addresslist[i].name+this.addresslist[i].phone+
                    ':'+this.addresslist[i].base+this.addresslist[i].detail,
                value: this.addresslist[i].id
            }
            this.aoptions.push(option);
          }
          console.log(this.aoptions)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
    /**
     * 网络请求
     */
    getStores(){
      request({
        url: '/store?action=queryStores',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.storelist = res.data
          for(let i= 0 ;i< this.storelist.length ;i ++){
            let option = {
              text: this.storelist[i].sname+this.storelist[i].phone+
                  ':'+this.storelist[i].saddress,
              value: this.storelist[i].id
            }
            this.soptions.push(option);
          }
          console.log(this.soptions)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
    back(){

      history.back();
    },
    tocommit(){
     if(this.mchecked == false){
       this.method = "自取"
     }else this.method = "配送"

      this.lastprice = this.sumprice;
      console.log("总价："+this.sumprice);
      console.log("sid:"+this.sid)
      console.log("aid:"+this.aid)
      console.log("sid:"+this.sid)
      console.log("method:"+this.method)
      console.log("good:"+this.good)
      console.log("g1:"+this.good1)
      console.log("n1:"+this.n1)
      console.log("p1:"+this.p1)

      request({
        url: '/order?action=createOrder',
        method: 'post',
        data: {
          method: this.method,
          mid: this.mid,
          aid: this.aid,
          sid: this.sid,
          cid: this.cid,
          lastprice: this.lastprice,
          sumprice: this.sumprice,
          good: this.good1,
          number: this.n1,
          parameter: this.p1
        },
      }).then(res => {

        if(res.code == 200) {
          this.$toast({
            type : "success",
            message : "生成成功！",
            onOpened:()=>{
              this.$router.push('/cart')
            }
          })
        }else if(res.code == 201) {
          this.$toast({
            type: "fail",
            message: res.desc,
          })

        }
      })
    }
  },
  created() {

    this.good = qs.parse(this.$route.query.chancegood)
    console.log(this.good)
    for(let item in this.good){
      console.log(this.good[item])
      this.sumprice += this.good[item].price*this.good[item].number
      this.good1.push(this.good[item].goodid)
      this.n1.push(this.good[item].number)
      this.p1.push(this.good[item].parameter)
    }
    this.lastprice = this.sumprice;
    
    this.getStores();
    this.getAllAddress();

  }

}
</script>

<style scoped>
#order{
  width: 100%;
  height: 100%;
}
.title{
  margin: 10px
}
.store{

}
</style>