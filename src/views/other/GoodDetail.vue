<template>
  <div id="good-detail">
    <van-nav-bar  class="zindex"  @click-left="back" left-text="返回" placeholder fixed left-arrow
                  :title="good.goodname">

    </van-nav-bar>
    <div class="swipe">
      <van-swipe :autoplay="2000" lazy-render>
        <van-swipe-item v-for="item in swipe" autoplay=2000 :key="item">
          <van-image :src="item" width="335px" style="margin-left: 5%"
                     radius="20px" height="400px"></van-image></van-swipe-item>
      </van-swipe>
    </div>
    <div class="activity">
      <van-row>
        <van-col span="12">
          <div class="font" >
            每日限量销售 <br>
            618活动秒杀
            !!!
          </div>

        </van-col>
        <van-col span="12">
          <div class="font" >
            价格: <br>￥<div style="color: red; display: inline-block">{{good.price.toFixed(2)}}</div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="parameter">
      <div class="p-text">参数：</div>
      <van-row style="margin-top: 60px">
        <van-col span="15" offset="5">
          <div v-for="(item,index) in parameter" style="margin-top: 10px">
            {{item[0]}}: {{item[1]}}<van-switch v-model="checked"  v-if="item.length > 2"/>{{item[2]}}
            </div>
        </van-col>
        <van-col></van-col>
      </van-row>

      <div style="margin: 10px">数量:</div>
      <van-stepper v-model="number" theme="round" button-size="22" disable-input style="margin-left: 120px" />
    </div>

    <div style="margin-top: 50px;width: 100%"></div>
    <van-action-bar style="z-index: 3">
      <van-action-bar-icon icon="chat-o" text="客服" @click="tophone" />
      <van-action-bar-icon icon="cart-o" text="购物车" @click="goCart" />

      <van-action-bar-button type="danger" text="加入购物车" @click="addCart" color="blue" />
      <van-action-bar-button type="danger" text="立即购买" @click="goorder" />
    </van-action-bar>
    </div>

</template>

<script>
import {request} from "@/network/request";

export default {
  name: "GoodDetail",
  data(){
    return{
      good:{},
      swipe:[],
      //购物车已有数量
      cartnum: 0,
      parameter:[[],[]],
      checked:false,
      number: 1,
      params: ''
    }
  },
  methods:{
    tophone(){
      this.$toast({
        type: 'fail',
        message:"客服不在线哦!"
      })
    },
    back(){
      this.$router.go(-1);
    },

    getGood(){
      request({
        url: '/good?action=receiveGood',
        method: 'post',
        data:{ goodid: this.$route.params.goodid},
      }).then(res =>{
        if(res.code == 200){
          this.good = res.data
          this.swipe[0] = this.$store.getters.getUrl + this.good.coverphoto
          this.swipe[1] = this.$store.getters.getUrl + this.good.photo1
          this.swipe[2] = this.$store.getters.getUrl + this.good.photo2
          this.swipe[3] = this.$store.getters.getUrl + this.good.photo3

          let array = this.good.parameter.split(';');

          for(let i = 0 ;i<array.length-1;i++){

            //参数名
            this.parameter[i].push( array[i].split(':')[0])
            array[i].split(':')[1].split('/')
            //两个参数值
            this.parameter[i].push(  array[i].split(':')[1].split('/')[0])
            if(typeof (array[i].split(':')[1].split('/')[1]) == "undefined"){
            }else this.parameter[i].push(  array[i].split(':')[1].split('/')[1])
          }
          this.parameter.pop();
            console.log(this.parameter)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },

    goCart(){
      this.$router.push('/cart');
    },

    addCart(){
      if(this.checked == false)
     this.params = this.parameter[0][0]+':'+ this.parameter[0][1]+';'
      else
     this.params = this.parameter[0][0]+':'+ this.parameter[0][2]+';'
      console.log(this.parameter)
      console.log(this.params)
      request({
        url: '/cart?action=addGoodCart',
        method: 'post',
        data:{ goodid: this.$route.params.goodid,
                number: this.number,
                parameter:this.params,
        },
      }).then(res =>{
        if(res.code == 200) {
          this.$toast({
            type: 'success',
            message:"添加成功！"
          })
        }else  if(res.code == 201){
          this.$toast({
            type: 'fail',
            message:"添加失败！"
          })
        }

      })
    },

    goorder(){
      if(this.checked == false){
        this.params = this.parameter[0][0]+':'+ this.parameter[0][1]+';'
      }
      else
        this.params = this.parameter[0][0]+':'+ this.parameter[0][2]+';'
      console.log(this.parameter)
      console.log(this.params)
      this.$router.push({
        path: '/order',
        query:{
          good:[this.$route.params.goodid],
          number: [this.number],
          parameter: [this.params],
        }
      })
    },
  },
  created() {
    this.getGood();
  }
}
</script>

<style scoped>
.activity{
  width: 90%;

  margin-left: 20px;
  margin-top: 10px;
  background-color: #19faf3;
  height: 100px;
  border-radius: 20px;
  position: relative;
  z-index: 2;
}
.font{
  font-size: 20px ;
  text-align: center ;
  margin-top: 18%;
}
.parameter{
  width: 90%;
  margin-left: 20px;
  background-color: #d4d4d4;
  height: 200px;
  border-radius: 0 0 20px 20px;
  font-size: 17px;
  position: relative;
  top: -50px;
  z-index: 1;
}

.p-text{
  position: relative;

  top: 60px;
  left: 10px;
}
</style>