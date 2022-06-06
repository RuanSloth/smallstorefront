<template>

<!--  <router-view v-slot="{ Component }" >-->

<!--    &lt;!&ndash;    缓存，使得下滑后，切换到其他页面，再回来，还是相同位置,暂时没写要缓存的组件进去&ndash;&gt;-->
<!--      <keep-alive exclude="Cart">-->
<!--        <component :is="Component" />-->
<!--      </keep-alive>-->

<!--  </router-view>-->
<router-view></router-view>
  <tabbar v-if="this.$route.meta.showTabbar"></tabbar>
</template>

<style>
@import "assets/css/common/base.css";
</style>
<script>

import Tabbar from "@/components/tabbar/Tabbar";
export default {

  components: {
    Tabbar
  }
}
</script>