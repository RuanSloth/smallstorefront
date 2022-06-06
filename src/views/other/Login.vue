<template>
  <div id="login" >
    <van-row  align="top">

      <van-col offset="6" style="margin-top: 50px">
        <van-image
            :src="require('@/assets/img/Logo.png')" width="200px" height="200px">
        </van-image>
      </van-col>
      <van-col span="4.5">
        <van-button style="border: 0px" @click="toAdmin">管理?</van-button>
      </van-col>
      <van-col offset="3" span="16">
        <van-cell-group inset style="margin-top: 50px">
<!--          调整左侧文本宽度50px-->
          <van-field v-model="username" label="账号" placeholder="请输入用户名" label-width="50px"/>
        </van-cell-group>
      </van-col>
        <van-col offset="3" span="15">
        <van-cell-group inset>
          <!--          调整左侧文本宽度50px-->
          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" label-width="50px"/>
        </van-cell-group>
      </van-col>
      <van-col span="5" style="margin-top: 2px"><span><a href="#">忘记密码？</a></span></van-col>
      
    </van-row>



      <van-row justify="center" class="btn">
        <van-col span="5" offset="2">
          <van-button type="primary" @click="login">登录</van-button>
        </van-col>
        <van-col span="5">
          <van-button type="success" @click="register">注册</van-button>
        </van-col>
    </van-row>


    </div>


</template>

<script>
import {request} from "@/network/request";
import { NavigationFailureType, isNavigationFailure } from 'vue-router'
export default {
  name: "Login",
  data(){
    return{
      username: '',
      password: '',
    }
  },
  methods:{
    login(){
      request({
        url: '/my?action=login',
        method: 'post',
        data:{username: this.username,
              password: this.password},

      }).then(res => {
        //将会返回token
        console.log(res)
        if(res.code == 200) {
          //修改vuex的token
          this.$store.commit({
            type: 'changeLogin',
            result: res.data
          })

          //给出提示

          this.$toast({
            type : "success",
            message : "登录成功",
            //完全展示后跳转
            onOpened:()=>{

              this.$router.push('/home').then(result =>{
                // 关闭toast
                this.$toast.clear();

                // if (isNavigationFailure(result, NavigationFailureType.aborted)) {
                //   console.log("导航中断")
                // }
                // if (isNavigationFailure(result, NavigationFailureType.cancelled)) {
                //   console.log("又有新的导航")
                // }
                // if (isNavigationFailure(result, NavigationFailureType.duplicated)) {
                //   console.log("已经跳转")
                // }


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
    register(){
        this.$router.push('/register')
    },
    toAdmin(){
      this.$router.push('/adminLogin')
    }
    },


}
</script>

<style scoped>

.btn{
  margin-top: 50px;
}

</style>