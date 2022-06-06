<template>
  <div>

    <div class="fine">
      <van-row justify="center" align="center">
        <van-col span="15" offset="3">
          <div class="fine_text" style="text-align: center">所有商品</div>
        </van-col>
        <van-col offset="1" span="11" v-for="item in goodlist" @click="togood(item.id)">
          <van-image :src=this.$store.getters.getUrl+item.coverphoto   fit="cover"
                     radius="20px" height="160px" width="90%" style="left: 5%;margin-top: 5%"></van-image>
          <div class="goodname" style="text-align: center">{{item.goodname}}</div>
        </van-col>
      </van-row>
      <div style="margin-top: 80px"></div>
    </div>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "Category",
  data(){
    return{
      goodlist: [],
    }
  },
  methods:{
    /**
     * 去到商品详情页
     */
    togood(goodid){
      this.$router.push('/goodDetail/'+goodid)

    },


    getGoods(){
      request({
        url: '/good?action=receiveGoods',
        method: 'post',
        data:{}
      }).then(res =>{
        if(res.code == 200){
          this.goodlist = res.data

        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
  },
  created() {
  this.getGoods();
  }

}
</script>

<style scoped>

</style>