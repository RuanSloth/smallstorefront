<template>
  <div id="adminorder">

    <van-row v-for="item in order" >
      <van-col span="22" offset="1" style="font-size: 20px;text-align: center">
        {{item.orderid}}
      </van-col>

      <van-col span="7" offset="3" v-for="good in item.list" >
        <van-image
            width="100px"
            height="100px"
            :src=this.$store.getters.getUrl+good.coverphoto
        />
      </van-col>
      <van-col offset="7" style="text-align: center; margin-top: 50px">
        ￥{{item.sumprice}}.00
      </van-col>
      <van-col offset="15" style="text-align:right">
        <van-button  type="primary" @click="$toast({type:'success',message:'修改为已配送！'})" style="width: 100px" >
          代发货</van-button>
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
    console.log(111)
    this.getOrder();
  }
}
</script>

<style scoped>

</style>