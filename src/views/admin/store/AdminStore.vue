<template>
    <div id="store" class="hide" >


      <router-view>

      </router-view>
<!--            也固定且占据位置-->

<!--      <van-nav-bar  left-text="返回" left-arrow fixed placeholder-->
<!--                   style="margin-top: 43px;" @click-left="toadd" @click-right="todelete">-->
<!--        <template #left>-->
<!--          <van-icon name="add-o" size="25px" />-->
<!--        </template>-->
<!--        <template #title>-->
<!--          <div>所有店铺({{storelist.length}})</div>-->
<!--        </template>-->
<!--        <template #right>-->
<!--          <van-icon name="cross"  size="25px"/>-->
<!--        </template>-->
<!--      </van-nav-bar>-->
<!--      应该是传入子组件后，navbar无法吸顶，且无法占据高度-->
      <div style="margin-top: 50px"></div>

      <van-radio-group v-model="sid">

      <van-row v-for="item in storelist" >

        <van-col span="18" offset="2" style="height: 100px ;" @click="">
          <div class="title">{{item.sname}} &nbsp;&nbsp;
          </div>{{item.phone}}<div></div><br>
          <div>{{item.saddress}}</div>
        </van-col>

        <van-col offset="1"><van-radio :name="item.id" style="margin-top: 20px"></van-radio></van-col>
      </van-row>

      </van-radio-group>


      <van-tabbar inactive-color="#1989fa" @change="onChange" v-model="index">
        <van-tabbar-item icon="add">增加</van-tabbar-item>
        <van-tabbar-item icon="info">编辑</van-tabbar-item>
        <van-tabbar-item icon="minus">删除</van-tabbar-item>
      </van-tabbar>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "AdminStore",
  data(){
    return{
        storelist: [],
        sid: 0,
        index: -1,
    }
  },
  methods:{
    /**
     * 底部选择
     */
    

    onChange(index){

      if(index == 0){
        this.index = -1
        this.toadd()
      }else if(index == 1){
        if(this.sid != 0){
          this.index = -1
          console.log(333)
          this.$router.push('/admin/store/edit/'+this.sid)
        }

        else {
          this.$toast({
            type : "fail",
            message : "选择编辑的店铺",
          })
          }
      }else if(index == 2){
        this.index = -1
        if(sid == 0)  {
          this.$toast
          ({
            type : "fail",
            message : "选择你想删除的店铺",
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
     * 删除店铺事件
     */
    todelete(){
      request({
        url: '/store?action=deleteStore',
        method: 'post',
        data: {sid:this.sid},
      }).then(res => {

            if(res.code == 200) {
              this.$toast({
                type : "success",
                message : "删除成功",
               onOpened:()=>{
                  this.getAllStores();
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
    跳转到商品
     */
    toadd(){
      this.btnClick("添加商品")
      this.$router.push('/admin/store/add');
    },

    /**
     * 网络请求
     */
    getAllStores(){
      request({
        url: '/store?action=queryStores',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.storelist = res.data

          console.log(res)
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
    // console.log(this.$store.getters.getToken());
    this.getAllStores();
  },

  mounted() {

  }

}
</script>

<style>
  .title{
    color: #1989fa;
    font-family: 华文新魏;
    font-size: 22px;
    border: 5px #1989fa;
  }
  .backgroundColor{
    background-color: #d4d4d4
  }
  .chance{
    position: absolute;
    left: 30%;
    bottom: 0px;
  }

</style>
