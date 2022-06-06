<template>
  <div>
    <span>123</span>
  <van-tabbar v-model="active">
    <van-tabbar-item name="home" icon="home-o">标签</van-tabbar-item>
    <van-tabbar-item name="search" icon="search">标签</van-tabbar-item>
    <van-tabbar-item name="friends" icon="friends-o">标签</van-tabbar-item>
    <van-tabbar-item name="setting" icon="setting-o">标签</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "test",
  data() {
    return {
      active: 'home'
    }
  }
}
</script>

<style scoped>

</style>
