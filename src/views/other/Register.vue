<template>
  <div id="register">
    <van-row  align="top">
      <van-col offset="6" style="margin-top: 50px">
        <van-image
            :src="require('@/assets/img/Logo.png')" width="200px" height="200px">
        </van-image>
      </van-col>

      <van-col span="4.5">
        <van-button style="border: 0px" @click="toUser">登录?</van-button>
      </van-col>

      <van-col offset="3" span="16">
        <van-cell-group inset style="margin-top: 50px">
          <!--          调整左侧文本宽度50px-->
          <van-field v-model="username" label="用户名" placeholder="请输入用户名" label-width="70px"/>
        </van-cell-group>
      </van-col>

      <van-col offset="3" span="17">
        <van-cell-group inset>
          <!--          调整左侧文本宽度50px-->
          <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" label-width="70px"/>
        </van-cell-group>
      </van-col>

      <van-col offset="3" span="17">
        <van-cell-group inset>
          <!--          调整左侧文本宽度50px-->
          <van-field v-model="againPassword" type="password" label="确定密码" placeholder="请输入密码" label-width="70px"/>
        </van-cell-group>
      </van-col>

      <van-col offset="3" span="15">
        <van-cell-group inset>
          <!--          调整左侧文本宽度50px-->
          <van-field v-model="phone" type="password" label="手机号" placeholder="请输入手机号" label-width="70px"/>
        </van-cell-group>
      </van-col>
    </van-row>


    <van-col offset="3" span="22">
    <van-cell-group inset>
      <van-field
          v-model="sms"
          center
          clearable
          label="验证码"
          placeholder="验证码" >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    </van-col>


    <van-row justify="center" class="btn">
      <van-col span="6">
        <van-button type="primary" @click="register" style="margin-top: 20px; margin-left: 20px">注册</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "Register",
  data(){
    return{
      username: '',
      password: '',
      againPassword: '',
      phone: '',
    }
  },
  methods:{
    register(){
      if(this.username !=='' &&
        this.againPassword !=='' &&
          this.password !=='' &&
          this.phone !==''){
        request({
          url: '/my?action=createUser',
          method: 'post',
          data:{username: this.username,
            password: this.password,
            phone: this.phone},
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
              message : "注册成功",
              //完全展示后跳转
              onOpened:()=>{
                this.$router.push('/home').then(result =>{
                  // 关闭toast
                  this.$toast.clear();
                })
              }
            })
          }
          if (res.code == 202)
          {
            //给出提示
            this.$toast.fail(res.desc)
          }
        }).catch(err => {
          console.log(err)
        })
      }else {
        this.$toast({
          type : "fail",
          message : "信息不全",
        })
      }

    },
    toUser(){
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>