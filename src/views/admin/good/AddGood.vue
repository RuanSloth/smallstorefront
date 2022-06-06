<template>
  <div id="addStore" class="hide">

    <van-row justify="center" align="center">
      <van-col span="22" style="margin-top: 50px;height: 50px"  >
        <van-cell-group inset>
          <van-field
              v-model="this.datas.goodname"
              clearable
              style="max-height: 50px"
              rows:2
              label="商品"
              type="textarea"
              left-icon="shop"
              placeholder="商品名称"
          />
        </van-cell-group>
      </van-col>



      <van-col span="22" justify="center">
        <van-cell-group inset>
          <van-field
              v-model="this.datas.price"
              rows="1"
              autosize
              label="价格"
              type="textarea"
              maxlength="50"
              left-icon="location"
              placeholder="商品价格"

          />
        </van-cell-group>
      </van-col>
    </van-row>

    <van-row justify="center" align="bottom">
      <van-col span="22" justify="center">
        <van-cell-group inset>
          <van-field
              v-model="this.datas.parameter"
              clearable
              type="textarea"
              rows="3"
              label="参数"
              left-icon="more"
              placeholder="商品参数如（尺寸:大/小;）"
          />
        </van-cell-group>
      </van-col >

      <van-col span="4" justify="center" style="text-align: center;" offset="2" >
        <div style="margin-bottom: 35px">商品种类:</div>
      </van-col>
      <van-col span="17" justify="center" offset="1">
      <van-radio-group v-model="this.datas.type" direction="horizontal" style="margin-bottom: 30px">
        <van-radio name="1">零食</van-radio>
        <van-radio name="2">饮品</van-radio>
        <van-radio name="3">精选</van-radio>
        <van-radio name="4">新品</van-radio>
      </van-radio-group>
      </van-col>
      <van-col span="4" justify="center" style="text-align: center;" >
        <div style="margin-bottom: 35px">封面图片:</div>
      </van-col>
      <van-col span="15" justify="center" >
        <van-uploader v-model="this.cover" multiple :max-count="1" class="left"/>
      </van-col>


    <van-col span="6" justify="center" style="text-align: center;" >
      <div style="margin-bottom: 35px">详细图片3张:</div>
    </van-col>
    <van-col span="15" justify="center" >
      <van-uploader v-model="this.detail" multiple :max-count="3" style="margin-left: 35px"/>
    </van-col>

      <van-col span="10">
        <van-button type="primary" @click="addStore" style="margin-top: 80px;margin-left: 30px">提交商品</van-button>
      </van-col>

    </van-row>
  </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "AddGood",
  data(){
    return{
      cover:[],
      detail:[],
      datas:{
        type: 1,
        goodname: '',
        price: '',
        parameter: '',
        coverphoto: '',
        detailone: '',
        detailtwo: '',
        detailthree: '',
      }
    }
  },
  methods:{

    addStore(){
      this.datas.coverphoto = this.cover[0].content;
      this.datas.detailone = this.detail[0].content;
      this.datas.detailtwo = this.detail[1].content;
      this.datas.detailthree = this.detail[2].content;
      if(this.datas.goodname !== ''
          && this.datas.price !== ''
          && this.datas.type != 0
          && this.datas.parameter !==''
          && this.datas.coverphoto !==''
          && this.datas.detailone !==''
          && this.datas.detailtwo !==''
          && this.datas.detailthree !==''){

        request({
          url: '/good?action=saveGood',
          method: 'post',
          data: this.datas
        }).then(res => {

          if (res.code == 200) {
            //给出提示
            this.$toast({
              type: "success",
              message: "增加成功",
              //完全展示后跳转
              onOpened: () => {
                this.$router.push('/admin/good').then(result => {
                  // 关闭toast
                  this.$toast.clear();
                })
              }
            })
          } else if (res.code == 203) {
            //身份失效，转到登录页面
            //给出提示
            this.$toast.fail(res.desc)
            this.$toast({
              onOpened: () => {
                this.$router.push('/adminLogin').then(result => {
                  // 关闭toast
                  this.$toast.clear();
                })
              }
            })
          }else if (res.code == 201) {
            //给出提示
            this.$toast({
              type: "fail",
              message: "增加失败",
              //完全展示后跳转
            })

              }


        })

      }else  this.$toast.fail("信息不全")
    }
  },
}
</script>
<style>
@import "~@/assets/css/content/hide.css";
</style>
<style scoped>
.left{
  margin-left: 50px;
}
</style>