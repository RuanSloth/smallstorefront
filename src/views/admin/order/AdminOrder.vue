<template>
  <div id="good" class="hide">


    <van-row v-for="item in order" style="margin-top: 50px">
      <van-col span="22" offset="1" style="font-size: 20px;text-align: center">
        {{item.orderid}}
      </van-col>

      <van-col span="7" offset="3" v-for="good in item.list" >
        <van-image
            width="100px"
            height="100px"
            :src=this.$store.getters.getUrl+good.coverphoto
        />
        <div style="text-align: center">数量：{{good.number}}</div>
      </van-col>
      <van-col offset="7" style="text-align: center; margin-top: 50px">
        ￥{{item.sumprice}}.00
      </van-col>
      <van-col offset="15" style="text-align:right">
        <van-button  type="primary"
                     @click="cOstatus1(item.orderid)"
                     style="width: 100px"
                      v-if="item.ostatus === '已付款'">
          确认发货</van-button>
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
  name: "AdminOrder",
  data(){
    return{
      order:{},
    }
  },
  methods:{
    getOrder(){
      request({
        url: '/order?action=AreceiveAllOrders',
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
    },
    cOstatus1(orderid){

      request({
        url: '/order?action=SendGood',
        method: 'post',
        data: {
          orderid : orderid
        },
      }).then(res => {

        if (res.code == 200) {
          //给出提示
          this.$toast({
            type: "success",
            message: "发货成功",

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
            message: "发货失败",
            //完全展示后跳转
          })

        }


      })}
  },
  created() {

    this.getOrder();
  }
}
</script>

