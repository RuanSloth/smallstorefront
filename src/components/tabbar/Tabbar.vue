<template>
  <van-tabbar  route  v-model="active">
    <van-tabbar-item replace to="/home"  icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category"  icon="shop">商品</van-tabbar-item>
    <van-tabbar-item replace to="/cart"  icon="shopping-cart">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/my"  icon="user-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  name: "Tabbar",
  data(){
    return{
      active: 0
    }
  }
}
</script>

<style scoped>

</style>