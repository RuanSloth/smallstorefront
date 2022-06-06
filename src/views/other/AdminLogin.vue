<template>
  <div id="adminlogin" class="hide">

    <van-row  align="top">
    <van-col offset="6" style="margin-top: 50px">
      <van-image
          :src="require('@/assets/img/Logo.png')" width="200px" height="200px">
      </van-image>
    </van-col>
      <van-col span="4.5">

        <van-button style="border: 0px" @click="toUser" >用户?</van-button>
      </van-col>
    <van-col offset="3" span="16">

      <van-cell-group inset style="margin-top: 50px">
        <!--   colon:label后面加：       调整左侧文本宽度50px-->

        <van-field v-model="adminname" label="账号" colon placeholder="请输入管理名"
                   required  label-width="70px"/>
      </van-cell-group>
    </van-col>
    <van-col offset="3" span="15">
      <van-cell-group inset>
        <!--          调整左侧文本宽度50px-->
        <van-field v-model="password" colon
                   required type="password" label="密码" placeholder="请输入密码" label-width="70px"/>
      </van-cell-group>
    </van-col>

    </van-row>

    <van-row justify="center" class="btn">
      <van-col span="6">
        <van-button type="primary" @click="login"
                    style="margin-top: 20px; margin-left: 20px">登录</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "AdminLogin",
  data(){
    return{
      adminname: '',
      password: '',
    }
  },
  methods:{
    login(){
      request({
        url: '/admin?action=login',
        method: 'post',
        data:{adminname: this.adminname,
          password: this.password},

      }).then(res => {
        //将会返回token
        console.log(res)
        if(res.code == 200) {

          this.$store.commit({
            type: 'changeLogin',
            result: res.data
          })

          console.log(this.$store.getters.getToken);
          //给出提示

          this.$toast({
            type : "success",
            message : "登录成功",
            //完全展示后跳转
            onOpened:()=>{

              this.$router.push('/admin').then(result =>{
                // 关闭toast
                this.$toast.clear();

              })

            }
          })

        }

        if (res.code == 201)
        {
          //给出提示
          this.$toast.fail(res.desc)
        }

      }).catch(err => {
        console.log(err)
      })
    },

    toUser(){
      this.$router.push('/login')
    },

  },

}
</script>

<style scoped>
.btn{
  margin-top: 50px;
}
</style>