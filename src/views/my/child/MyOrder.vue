<template>
  <div id="myorder">
    <div class="my-o">我的订单 <div class="toall-o">
      <van-button @click="this.$router.push('/myorder')" style="border: 0px"> 查看全部&lt</van-button></div></div>
     <van-row style="margin-top: 20px">
       <van-col span="5" offset="3">
         <van-icon name="cash-back-record" size="40"  color="#1989fa"></van-icon>
         <br>
         待付款</van-col>
       <van-col span="5">
         <van-icon name="logistics" size="40"  color="#1989fa"></van-icon>
         <br>
         待取货</van-col>
       <van-col span="5">
         <van-icon name="flower-o" size="40"  color="#1989fa"></van-icon>
         <br>
         已完成</van-col>
       <van-col span="5">
         <van-icon name="todo-list-o" size="40"  color="#1989fa"></van-icon>
         <br>
         已取消</van-col>
     </van-row>
  </div>
</template>

<script>
export default {
  name: "MyOrder"
}
</script>

<style scoped>
#myorder{
  width: 100%;
  height: auto;
}
.my-o{
  position: relative;
  width: 100%;
  font-size: 20px;
  margin-top: 20px;
}
.toall-o{
  position: relative;
  left: 55%;
  font-size: 14px;
  display: inline-block;
}
</style>