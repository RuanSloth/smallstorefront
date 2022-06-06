<template>
  <div id="good" class="hide">

    <router-view>

    </router-view>

    <div style="margin-top: 50px"></div>

    <van-radio-group v-model="goodid">

      <van-row v-for="item in goodlist" >

        <van-col span="6" offset="2" style="height: 100px ;" @click="">
          <div class="title">{{item.goodname}} &nbsp;&nbsp;
          </div>￥{{item.price}}<div></div>
          <div>{{item.parameter}}</div>
          <div>{{this.totype(item.type)}}</div>
        </van-col>

      <van-col offset="3" span="7" >
        <van-image
            width="100px"
            height="100px"
            :src=this.$store.getters.getUrl+item.coverphoto
        />
      </van-col>
        <van-col offset="2" span="2"><van-radio :name="item.id" style="margin-top: 20px"></van-radio></van-col>
      </van-row>

    </van-radio-group>

    <div style="height: 50px"></div>

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
  name: "AdminGood",
  data(){
    return{
      goodlist: [],
      goodid: 0,
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
        if(this.goodid != 0){
          this.index = -1

          this.$router.push('/admin/good/edit/'+this.goodid)
        }

        else {
          this.$toast({
            type : "fail",
            message : "选择编辑的商品",
          })
        }
      }else if(index == 2){
        this.index = -1
        if(this.goodid == 0)  {
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
        url: '/good?action=deleteGood',
        method: 'post',
        data: {goodid:this.goodid},
      }).then(res => {

        if(res.code == 200) {
          this.$toast({
            type : "success",
            message : "删除成功",
            onOpened:()=>{
              this.getAllGoods();
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

      this.$router.push('/admin/good/add');
    },

    /**
     * 网络请求
     */
    getAllGoods(){
      request({
        url: '/good?action=receiveGoods',
        method: 'post',
        data:{},
      }).then(res =>{
        if(res.code == 200){
          this.goodlist = res.data

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
    console.log(this.$store.getters.getUrl);
    this.getAllGoods();
  },

  mounted() {

  }

}
</script>

