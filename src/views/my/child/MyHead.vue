<template>
  <div id="head">
    <van-image
        :src="headImg" width="1.5rem" height="1.5rem" fit="cover" round>
    </van-image>
    <div class="name">{{username}}</div>
    <div class="vip" v-if="vipdate !=null">{{vipdate}} </div>
  </div></template>

<script>
export default {
  name: "MyHead",
  props:{
    headImg: String,
    username: String,
    vipdate: String,
  }
}
</script>

<style scoped>
#head{
  padding-left: 30px;
  padding-top: 30px;
  position: relative;
  background-color: #46b8da;
  width: 100%;
  height: 100px;
  line-height: 15%;
}
.name{
  position: relative;
  font-size: 20px;
  font-family: 隶书;
  color: #f6f6f6;
  left: 1rem;
  display: inline-block;
  height: 100%;
  top: -30%
}
.vip{
  display: inline-block;
  color: #0b34ba;
  height: 20px;
}
</style>