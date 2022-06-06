<template>
    <div id="home">
      <div class="headbackground">
        <van-row>
          <van-col span="12">
            <div class="welcome">8810小店欢迎你,小红</div></van-col>
          <van-col span="12">
            <div class="search">
              <van-cell-group inset>
                <van-field
                    v-model="search"
                    left-icon="smile"
                    placeholder="想找什么呀？"
                    input-align="right"
                />
              </van-cell-group></div>
          </van-col>
        </van-row>
      </div>

      <div class="swipe">
        <van-swipe :autoplay="2000" lazy-render>
          <van-swipe-item v-for="item in swipe" autoplay=2000 :key="item">
          <van-image :src="item" width="320px" style="margin-left: 20px"
                     radius="20px" height="200px"></van-image></van-swipe-item>
        </van-swipe>

      </div>

      <div class="recommend">
        <div class="recommend_text ">为你推荐------------</div>
        <van-row>
          <van-col offset="1" span="11" v-for="item in newlist"
                   style="background-color: #5cabfa;border-radius: 10px"
                    @click="togood(item.id)">
            <van-image :src=this.$store.getters.getUrl+item.coverphoto   fit="cover"
                       radius="20px" height="160px" width="90%" style="left: 5%;margin-top: 5%"></van-image>
            <div class="goodname">{{item.goodname}}</div>
          </van-col>
        </van-row>
      </div>

      <div class="fine">
        <van-row justify="center" align="center">
          <van-col span="15" offset="3">
            <div class="fine_text">------本周精品------</div>
          </van-col>
          <van-col offset="1" span="11" v-for="item in finelist" @click="togood(item.id)">
            <van-image :src=this.$store.getters.getUrl+item.coverphoto   fit="cover"
                       radius="20px" height="160px" width="90%" style="left: 5%;margin-top: 5%"></van-image>
            <div class="goodname">{{item.goodname}}</div>
          </van-col>
        </van-row>

      </div>

      <div style="height: 150px;width: 100%"></div>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "Home",
  data(){
    return{
      search: '',
      swipe: [require("../../assets/img/土豆.png"),require("../../assets/img/乐事薯片.png"),
        require("../../assets/img/奇趣蛋.png")],
      newlist: [],
      finelist: [],
    }
  },
  methods:{

    /**
     * 网络请求
     */
      getNew(){
          request({
            url: '/good?action=receiveGoodsType',
            method: 'post',
            data:{type: 3},
          }).then(res =>{
            if(res.code == 200){
              this.newlist = res.data


              console.log(this.newlist)
            }
            else if(res.code == 203){
              this.$router.push('/login')
            }
          })

      },

    getFine(){
      request({
        url: '/good?action=receiveGoodsType',
        method: 'post',
        data:{type: 4},
      }).then(res =>{
        if(res.code == 200){
          this.finelist = res.data
          console.log(this.finelist)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },

    /**
     * 去到商品详情页
     */
    togood(goodid){
      this.$router.push('/goodDetail/'+goodid)

    },
  },
  created() {
    this.getNew();
    this.getFine();
  }
}
</script>

<style scoped>
.headbackground{
  position: absolute;
  width: 100%;
  height: 150px;
  background-color: #1989fa;
  border-radius: 0 0 15px 15px ;
  z-index: 1;
  top: 0;
  left: 0;
}
.welcome{
  font-size: 18px;
  margin-top: 15px;
  margin-left: 5px;
}
.search{

  font-size: 17px;

  margin-top: 5px;

}

.swipe{
  position: relative;
  margin-top: 50px;
  height: 150px;
  margin-left: 10px;
  margin-right: 10px;
  z-index: 2;
}

.recommend{
  position: relative;
  top: 80px;
  height: auto;
  margin-left: 10px;
  margin-right: 10px;

}
.recommend_text{
  position: relative;
  font-size: 16px;

}
.fine{
  position: relative;
  top: 100px;
  height: auto;
  margin-left: 10px;
  margin-right: 10px;
  background-color: #d4d4d4;
  border-radius: 10px;
}
.fine_text{
  font-size: 16px;

}
.goodname{
  width: 100%;
  text-align: center;
}
</style>