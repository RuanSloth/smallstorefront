<template>
    <div id="adminCoupon" class="hide">

      <router-view>

      </router-view>

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
  name: "AdminCoupon",
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
    跳转到添加店铺
     */
    toadd(){
      this.btnClick("添加店铺")
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
    console.log("执行了created")
    console.log(this.$store.getters.getToken)
    this.getAllStores();
  },

  mounted() {

  }


}
</script>

