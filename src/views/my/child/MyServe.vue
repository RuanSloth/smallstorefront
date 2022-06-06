<template>
<div id="myServe">

  <div class="my-o">我的服务</div>

  <van-row style="margin-top: 20px">
    <van-col span="5" offset="3">
      <van-icon name="medal" size="40" color="#1989fa"></van-icon>
      <br>
      我要充值</van-col>
    <van-col span="5">
      <van-icon name="coupon" size="40" color="#1989fa" ></van-icon>
      <br>
      优惠券</van-col>
    <van-col span="5" @click="toAddress">
      <van-icon name="location" size="40"  color="#1989fa"></van-icon>
      <br>
      地址管理</van-col>
    <van-col span="5" @click="toInfo">
      <van-icon name="friends-o" size="40"  color="#1989fa"></van-icon>
      <br>
      编辑资料</van-col>
  </van-row>
</div>
</template>

<script>
export default {
  name: "MyServe",
  methods:{
    toInfo(){
      this.$router.push('/myinfo')
    },
    toAddress(){
      this.$router.push('/myaddress')
    }
  }
}
</script>

<style scoped>

#myServe{
  width: 100%;
  height: 200px;
  margin-top: 20px;

}

.my-o{
  position: relative;
  width: 100%;
  font-size: 20px;
}
</style>