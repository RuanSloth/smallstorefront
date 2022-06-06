<template>
  <div class="home">

    <img id="base64Img" :src="headImg" />
    <button @click="registerUser">创建用户</button>
    <button @click="login">验证登录</button>
    <button @click="updateUsername">修改用户名</button>
    <button @click="updatePassword">修改密码</button>
    <button @click="updatePhone">修改电话</button>
    <button @click="readphoto">得到头像</button>
    <button @click="getUser">得到用户</button>

    {{aaa}}
    <input
        type="file"
        id="Updateimage"
        @change="toBase64()"
        accept="image/jpeg, image/png, image/jpg"
        ref="image"
    />
    <button @click="sendGoodNumber">发送商品以及数量</button>
    <button @click="addGood">增加商品</button>
    <button @click="deleteGood">删除商品</button>
    <button @click="updateGood">修改商品信息</button>
    <button @click="getGoodsInfo">得到所有商品信息</button>
    <button @click="getGoodType">得到某一种类商品信息</button>
    <button @click="getGoodInfo">得到某一商品信息</button>

    <button @click="getSimpleOrder"> 得到简略订单信息</button>
    <button @click="testToken">测试token</button>

    <van-uploader v-model="fileList" multiple />
  </div>
</template>

<style lang="scss" scoped>

</style>
<script>
// @ is an alias to /src

import {getdate} from "@/assets/js/date";
import {toBase64} from "@/assets/js/image";
import {request} from "@/network/request";
import qs from "qs";

export default {
  name: 'HomeView',
  data(){
    return{
      fileList: [],
      aaa:"1243",
      datas:{},
      headImg:require("@/assets/img/defaultHead.png"),
      baseresult:"",
    }
  },
  components: {

  },
  methods:{
    afterRead(file) {
            // 此时可以自行将文件上传至服务器
      console.log(file);
          return file;
    },
    testToken(){
      request({
        url: '/test?action=testToken',
        method: 'post',

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },

    sendGoodNumber(){
      this.datas={}
      this.datas.good = [10001,10004];
      this.datas.number = [2,3];
      request({
        url: '/test',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    getSimpleOrder(){
      this.datas={}
      this.datas.userid = 1003
      request({
        url: '/order?action=receiveAllOrders',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    addGood(){
    console.log(112)
      this.datas={}

      this.datas.goodname = "笔记本"
      this.datas.price = 43.5
      this.datas.type = 3
      this.datas.parameter = "糖分:少糖/全糖"
      this.datas.coverphoto = this.baseresult;
      this.datas.detailone = this.baseresult;
      this.datas.detailtwo = this.baseresult;
      this.datas.detailthree = this.baseresult;

      request({
        url: '/good?action=saveGood',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    deleteGood(){
      this.datas={}
      this.datas.goodid = 100009
      request({
        url: '/good?action=deleteGood',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    getGoodsInfo(){
      request({
        url: '/good?action=receiveGoods',
        method: 'post',
      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    getGoodType(){
      this.datas={}
      this.datas.type = 3
      request({
      url: '/good?action=receiveGoodsType',
      method: 'post',
      data:this.datas,
    }).then(res => {
      //输出成功信息
      this.data = res
      console.log(res)

    }).catch(err => {
      //输出失败信息
      console.log(err)
    })},
    updateGood(){
      this.datas={}
      this.datas.goodid = 100004
      this.datas.goodname = "笔记本"
      this.datas.price = 43.5
      this.datas.type = 3
      this.datas.parameter = "糖分:少糖/全糖"
      this.datas.coverphoto = this.baseresult;
      this.datas.detailone = this.baseresult;
      this.datas.detailtwo = this.baseresult;
      this.datas.detailthree = this.baseresult;

      request({
        url: '/good?action=updateGood',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      }
      )
    },
    getGoodInfo(){
      this.datas={}
      this.datas.goodid = 100010
      request({
      url: '/good?action=receiveGood',
      method: 'post',
      data:this.datas,
    }).then(res => {
      //输出成功信息
      this.data = res
      console.log(res)

    }).catch(err => {
      //输出失败信息
      console.log(err)
    })},
    getUser(){
      this.datas={}
      this.datas.username = "小红"
      request({
        url: '/my?action=receiveUser',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },

    registerUser(){
      this.datas={}
      this.datas.username = "小红223"
      this.datas.password = "123456"
      this.datas.phone = "13713201786"
      this.datas.headphoto = this.baseresult
      this.datas.vipdate = getdate();

      request({
        url: '/my?action=createUser',
        method: 'post',
        data:this.datas,

      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)

      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    readphoto(){
      this.datas ={}
      this.datas.username = "小红"
      request({
        url: '/test',
        data: this.datas,
        method: 'post',
      }).then(res =>{
        console.log(res)
        this.headImg = 'http://localhost:8080/StoreServer/'+res.headphoto
      }
      ).catch(err=>{console.log(err)})
    },
    toBase64(){
      toBase64().then( res => {
        this.baseresult = res
      }).catch( err => {
        console.log(err)
      })
    },
    login(){
      this.datas={}
      this.datas.username = "小明221"
      this.datas.password = "12345"

      request({
        url: '/my?action=login',
        method: 'post',
        data:this.datas,
      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)
      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },

    updateUsername(){
      this.datas={}
      this.datas.username = "小红221"
      this.datas.password = "123456"
      this.datas.newname = "小明221"
      request({
        url: '/my?action=updateUsername',
        method: 'post',
        data:this.datas,
      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)
      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    updatePassword(){
      this.datas={}
      this.datas.username = "小红"
      this.datas.password = "123456"
      this.datas.newpassword = "444444"
      this.datas.token = "111"
      request({
        url: '/my?action=updatePassword',
        method: 'post',
        data:this.datas,
      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)
      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    updatePhone(){
      this.datas={}
      this.datas.username = "小红"
      this.datas.password = "444444"
      this.datas.phone = "623700"

      request({
        url: '/my?action=updatePhone',
        method: 'post',
        data:this.datas,
      }).then(res => {
        //输出成功信息
        this.data = res
        console.log(res)
      }).catch(err => {
        //输出失败信息
        console.log(err)
      })
    },
    updateVipdate(){

    },

},

}
</script>
