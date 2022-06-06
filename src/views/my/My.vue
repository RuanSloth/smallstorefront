<template>
  <div>
    <my-head
        :head-img="user.headphoto" :username="user.username" :vipdate="user.vipdate">
    </my-head>
    <my-order>

    </my-order>
    <my-serve></my-serve>
    <van-button @click="tokentest" style="position: relative;left: 270px;top: 100px" type="primary">退出登录</van-button>
  </div>
</template>

<script>
import MyHead from "@/views/my/child/MyHead";
import MyOrder from "@/views/my/child/MyOrder";
import MyServe from "@/views/my/child/MyServe";
import {request} from "@/network/request";
export default {
  name: "My",
  components: {
    MyHead,
    MyOrder,
    MyServe
  },
  data(){
    return{
      headImg: require("@/assets/img/defaultHead.png"),
      user: {},
    }
  },
  methods:{
    tokentest(){
      this.$store.commit({
        type: 'changeLogin',
        result: ''
      })
      this.$router.push('/login')
    },

  },
  created() {
    request({
      url: '/my?action=receiveUser',
      method: 'post',
      data:{},
    }).then(res =>{
      if(res.code == 200){
        console.log(res.data)
        this.user = res.data
        if(this.user.headphoto == null)
          this.user.headphoto = this.headImg
        else this.user.headphoto = this.$store.getters.getUrl+this.user.headphoto
        console.log(this.user)
      }
      else if(res.code == 203){
        this.$router.push('/login')
      }
    })
  },

}
</script>

<style scoped>



</style>
