<template>
  <div id="myorder">
    <van-row v-for="item in order" >
      <van-col span="22" offset="1" style="font-size: 20px;text-align: center">
        {{item.sname}}
      </van-col>

        <van-col span="7" offset="3" v-for="good in item.list" >
          <van-image
              width="100px"
              height="100px"
              :src=this.$store.getters.getUrl+good.coverphoto
          />
        </van-col>
        <van-col offset="10" style="text-align: center; margin-top: 30px">
         总价： ￥{{item.sumprice}}.00
        </van-col>
      <van-col offset="10" style="text-align: center">
        状态： {{item.ostatus}}
      </van-col>
      <van-col offset="10" style="text-align: center">
        下单时间： {{item.ordertime}}
      </van-col>
      <van-col offset="15" style="text-align:right">
        <van-button  type="primary" @click="cOstatus1(item.orderid)"
                     v-if="item.ostatus == '未付款' "
                     style="width: 100px" >
          去付款</van-button>
        <van-button  type="primary" @click="cOstatus2(item.orderid)"
                     v-if="item.ostatus == '已发货' "
                     style="width: 100px" >
          确认收货</van-button>

      </van-col>

      <van-col span="24">
        <div style="height: 20px;margin-top:10px;background-color: #d4d4d4"></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "MyOrder",
  data(){
    return{
      order:{},
    }
  },
  methods:{
    cOstatus1(orderid){

      request({
        url: '/order?action=payOrder',
        method: 'post',
        data: {
          orderid : orderid
        },
      }).then(res => {

        if (res.code == 200) {
          //给出提示
          this.$toast({
            type: "success",
            message: "付款成功",

          })
        } else if (res.code == 203) {
          //身份失效，转到登录页面
          //给出提示
          this.$toast.fail(res.desc)
          this.$toast({
            onOpened: () => {
              this.$router.push('/login').then(result => {
                // 关闭toast
                this.$toast.clear();
              })
            }
          })
        }else if (res.code == 201) {
          //给出提示
          this.$toast({
            type: "fail",
            message: "付款失败",
            //完全展示后跳转
          })

        }


      })
    },
    cOstatus2(orderid){
      request({
        url: '/order?action=Receipt',
        method: 'post',
        data: {
          orderid : orderid
        },
      }).then(res => {

        if (res.code == 200) {
          //给出提示
          this.$toast({
            type: "success",
            message: "收货成功",

          })
        } else if (res.code == 203) {
          //身份失效，转到登录页面
          //给出提示
          this.$toast.fail(res.desc)
          this.$toast({
            onOpened: () => {
              this.$router.push('/login').then(result => {
                // 关闭toast
                this.$toast.clear();
              })
            }
          })
        }else if (res.code == 201) {
          //给出提示
          this.$toast({
            type: "fail",
            message: "收货失败",
            //完全展示后跳转
          })

        }


      })
    },
    getOrder(){
      request({
        url: '/order?action=receiveAllOrders',
        method: 'post',
        data: {},
      }).then(res => {

        if(res.code == 200) {
          this.order = res.data
          console.log(this.order)
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
    this.getOrder();
  }
}
</script>

<style scoped>

</style>