<template>
  <div id="cart" ><br>
    <div style="font-size: 23px;margin-left: 20px">购物车</div>
<!--    <van-radio-group v-model="goodid" style="background-color: #19faf3;border-radius: 20px">-->
      <van-checkbox-group v-model="good_index" style="background-color: #19faf3;border-radius: 20px">
      <van-row v-for="(item,index) in goodlist" :key="item" >



<!--          <van-checkbox name="a">复选框 a</van-checkbox>-->
<!--          <van-checkbox name="b">复选框 b</van-checkbox>-->

        <van-col span="6" offset="2" style="height: 120px ; font-size: 17px" @click="toGood(item.goodid)">
          <div class="title">{{item.goodname}} &nbsp;&nbsp;
          </div>￥{{item.price.toFixed(2)}}<div></div>
          <div>{{item.parameter}}</div>
          <div>数量:{{item.number}}</div>

        </van-col>

        <van-col offset="3" span="7" @click="toGood(item.goodid)">
          <van-image
              width="100px"
              height="100px"
              :src=this.$store.getters.getUrl+item.coverphoto
          />
        </van-col>
<!--        <van-col offset="2" span="2"><van-radio :name="item.goodid" style="margin-top: 20px"></van-radio></van-col>-->
        <van-col offset="2" span="2">

          <van-checkbox :name="index" style="margin-top: 20px"></van-checkbox></van-col>

        <van-col span="24" style="background-color: #d4d4d4"></van-col>

      </van-row>

    </van-checkbox-group>

    <div style="height: 50px"></div>

    <van-tabbar inactive-color="#1989fa" @change="onChange" v-model="index" style="margin-bottom: 50px">
      <van-tabbar-item icon="delete-o">清空</van-tabbar-item>
      <van-tabbar-item icon="minus">删除</van-tabbar-item>
      <van-tabbar-item icon="guide-o">购买</van-tabbar-item>
    </van-tabbar>

    <div v-if="goodlist.length == 0" class="desc">购物车为空哦！快去买东西吧！</div>
  </div>
</template>

<script>
import {request} from "@/network/request";
import qs from "qs";

export default {
  name: "Cart",
  data(){
    return{
     
      good:[],
      number:[],
      parameter:[],
      goodlist:[],
      price: [],
      index: -1,
      chancegood: [],
      good_index:[],
      push:[],
    }
  },
  methods:{

    /**
     * 跳转到商品
     */
    toGood(goodid){
      this.$router.push("/goodDetail/"+goodid)
    },
    /**
     * 网络请求
     */
    getGoods(){
      request({
        url: '/cart?action=queryCart',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.goodlist = res.data
          console.log(res)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },

    /**
     * 清空
     * @param index
     */

    toclear(){
      request({
        url: '/cart?action=clearGoodCart',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200) {
          this.$toast({
            type : "success",
            message : "清空成功",
            onOpened:()=>{
              this.getGoods();
            }
          })
        }else if(res.code == 201) {
          this.$toast({
            type : "fail",
            message : res.desc,
          })
        }else if(res.code == 203) {
          this.$router.push('/login')
        }
      })
    },
    /**
     * 提交
     */
    tocommit(){
      // let goodlenth = this.good.length
      // // for(let i = 0; i<this.good_index.length;i++){
      // for(let index of this.good_index){
      //
      //   //push是已经push的索引值
      //   if(this.push.length == 0){
      //     // console.log("push进数组了："+ index)
      //     // console.log("push"+this.push)
      //     this.push.push(index)
      //     this.good.push(this.goodlist[index].goodid);
      //     this.number.push(this.goodlist[index].number);
      //     this.parameter.push(this.goodlist[index].parameter);
      //     this.price.push(this.goodlist[index].price);
      //   }else {
      //     //是否已经push有这个商品索引
      //     let have = false;
      //     for(let i of this.push){
      //       // console.log("i："+i + "index："+index)
      //       if(index === i)
      //       {
      //         //如果以及push 就不push进3个数组
      //         have = true;
      //         break;
      //       }
      //
      //     }
      //     if(have == false){
      //       // console.log("push进数组了："+ index)
      //       // console.log("push"+this.push)
      //       this.push.push(index)
      //       this.good.push(this.goodlist[index].goodid);
      //       this.number.push(this.goodlist[index].number);
      //       this.parameter.push(this.goodlist[index].parameter);
      //       this.price.push(this.goodlist[index].price);
      //     }
      //
      //   }
      //
      //
      //
      // }
      //更简单的
      for(let i = 0; i < this.good_index.length;i++){
        let ii = this.good_index[i];
        this.chancegood.push(this.goodlist[ii]);
      }


      this.$router.push({
        path: '/order',
        query:{
          chancegood: qs.stringify(this.chancegood)
        }
      })
    },
    /**
     * 删除事件
     */
    todelete(){
      console.log(this.goodlist[this.good_index[0]].goodid)
      request({
        url: '/cart?action=deleteGoodCart',
        method: 'post',
        data: {goodid:this.goodlist[this.good_index[0]].goodid,
          parameter:this.goodlist[this.good_index[0]].parameter,
        },
      }).then(res => {

        if(res.code == 200) {
          this.getGoods()
          this.$toast({
            type : "success",
            message : "删除成功",
            onOpened:()=>{
            }
          })
        }else if(res.code == 201) {
          this.$toast({
            type : "fail",
            message : res.desc,
          })

        }else if(res.code == 203) {
          this.$router.push('/login')
        }
      })
    },

    onChange(index){

      if(index == 0){
        this.index = -1
        this.toclear()
      }else if(index == 1){
        if(this.good_index.length != 1){
          this.index = -1
          this.$toast({
            type : "fail",
            message : "暂只能删除一件商品",
          })
        } else {
          this.$toast({
            type : "success",
            message : "删除成功",
            onOpened:()=>{
              this.todelete()
            }
          })
        }
      }else if(index == 2){
        this.index = -1
        if(this.good_index.length  == 0)  {
          this.$toast
          ({
            type : "fail",
            message : "选择购买的商品",
          })
        }else {
          this.tocommit();
        }

      }
    }
  },
  created() {
    this.getGoods();
  }
}
</script>

<style scoped>
#cart{
  background-color: #d4d4d4;
  height: 100vh;
}
.desc{
  position: relative;
  font-size: 40px;
  width: 80%;
  left: 10%;
  top: 50px
}
.title{}
</style>