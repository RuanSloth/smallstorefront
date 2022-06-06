<template>
  <div id="good" >
    <van-nav-bar  class="zindex"  @click-left="back" left-text="返回" placeholder fixed left-arrow
                  title="地址管理">
    </van-nav-bar>



    <van-radio-group v-model="aid">

      <van-row v-for="item in addresslist" >

        <van-col span="14" offset="3" style="height: 100px ;" @click="">
          <div class="title">{{item.name}} &nbsp;&nbsp;
          </div>{{item.base}}<div></div>
          <div>{{item.detail}}</div>
          <div>{{item.phone}}</div>
        </van-col>


        <van-col offset="2" span="2"><van-radio :name="item.id" style="margin-top: 20px"></van-radio></van-col>
      </van-row>

    </van-radio-group>
    <div style="height: 50px"></div>
    <van-tabbar inactive-color="#1989fa" @change="onChange" v-model="index" style="margin-bottom: 50px">
      <van-tabbar-item icon="add">增加</van-tabbar-item>
      <van-tabbar-item icon="info">编辑</van-tabbar-item>
      <van-tabbar-item icon="minus">删除</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "MyAddress",
  data(){
    return{
      addresslist: [],
      aid: 0,
      index: -1,
    }
  },
  methods:{
    /**
     * 数字转换为种类
     */
    totype(type){
      switch (type) {
        case 1 : return "零食"
          break
        case 2: return "饮品"
          break
        case 3: return "精选"
          break
        case 4: return "新品"
          break;
      }
    },
    /**
     * 底部选择
     */


    onChange(index){

      if(index == 0){
        this.index = -1
        this.toadd()
      }else if(index == 1){
        if(this.aid != 0){
          this.index = -1

          this.$router.push('/admin/good/edit/'+this.aid)
        }

        else {
          this.$toast({
            type : "fail",
            message : "选择编辑的商品",
          })
        }
      }else if(index == 2){
        this.index = -1
        if(this.aid == 0)  {
          this.$toast
          ({
            type : "fail",
            message : "选择你想删除的商品",
          })
        }else {
          console.log(123)
          this.todelete()
        }

      }
    },
    /**
     * 传标题到父组件
     */
    btnClick(text) {
      //发射事件，第一个参数时事件名，
      this.$emit('store-click',text)
    },
    /**
     * 删除事件
     */
    todelete(){
      request({
        url: '/address?action=deleteAddress',
        method: 'post',
        data: {aid:this.aid},
      }).then(res => {

        if(res.code == 200) {
          this.$toast({
            type : "success",
            message : "删除成功",
            onOpened:()=>{
              this.getAllAddress();
            }
          })
        }else if(res.code == 201) {
          this.$toast({
            type : "fail",
            message : res.desc,
          })
        }
      })
    },
    /*
    跳转到添加
     */
    toadd(){
      this.btnClick("添加商品")

      this.$router.push('/addaddress');
    },

    /**
     * 网络请求
     */
    getAllAddress(){
      request({
        url: '/address?action=queryAddress',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.addresslist = res.data
          
          console.log(this.addresslist)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
    back(){

      history.back();
    },
  },


  created(){
   
    this.getAllAddress();
  },

  mounted() {

  }

}
</script>

