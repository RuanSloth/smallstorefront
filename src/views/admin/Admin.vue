<template>
  <div id="admin" class="hide">
    <!--      fiexd固定顶部，placeholder占据固定的位置 key改变就重新刷新组件（不用也行）-->
    <van-nav-bar  class="zindex" :title="title" @click-left="back" left-text="返回" placeholder fixed left-arrow
                  :key="title">

    </van-nav-bar>

<!--    key改变时，重新创建不复用-->
<!--    暂时先搞这样，这样会每次重新进入都会刷新，性能感觉不太好  从子组件拿到标题-->
    <router-view :key="this.$route.path" @store-click="changeFatherTitle"></router-view>

    <van-row justify="center" class="btn">
      <van-col span="13">
        <!--            调用点击事件，拿到text-->
        <van-button
            id="admingood" type="primary" to="/admin/good"
            round style="margin-top: 150px;  width: 100%"
            @click="changeTitle($event)">管理商品</van-button>
      </van-col>
      <van-col span="13">
        <van-button
            id="adminstore"  type="primary" to="/admin/store"
            round style="margin-top: 50px;  width: 100%"
             @click="changeTitle($event)">管理店铺</van-button>
      </van-col>
      <van-col span="13">
        <van-button id="adminorder"  type="primary" to="/admin/order"
                    round style="margin-top: 50px;  width: 100%"
                    @click="changeTitle($event)" >管理订单</van-button>
      </van-col>
      <van-col span="13">
        <van-button id="admincoupon"  type="primary" to="/admin/coupon"
                    round style="margin-top: 50px;  width: 100%"
                    @click="changeTitle($event)" >管理优惠券</van-button>
      </van-col>
    </van-row>

</div>
</template>

<script>
export default {
  name: "Admin",
  data(){
    return{
      title: this.$route.meta.title,
      refrush: true,
    }
  },

  methods:{
    back(){
      //首先退出token
    //   this.$store.commit({
    //   type: 'changeLogin',
    //   result: ''
    // })
      this.$router.go(-1);
    },


    changeTitle(e){
      //获得对应文本，修改标题
      this.title =  e.target.innerText
      console.log("title:" +this.title)
    },
    changeFatherTitle(text){
      this.title = text
    }
  }
}
</script>

<style scoped>
.zindex{
  position: absolute;
  z-index: 6;
}
</style>