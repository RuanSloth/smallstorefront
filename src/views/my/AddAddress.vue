<template>
    <div id="AddAddress">
      <van-nav-bar  class="zindex"  @click-left="back" left-text="返回" placeholder fixed left-arrow
                    title="地址管理">
      </van-nav-bar>
      <van-row style="margin-top: 80px">

        <van-col>
          <van-cell-group inset>
            <van-field v-model="name"  label="收货人：" placeholder="请输入收货人" />
            <van-field v-model="phone"  label="手机号：" placeholder="请输入手机号" />
            <van-field v-model="base"  label="地区：" placeholder="请输入地区(xx省xx市)" />
            <van-field
                v-model="detail"
                rows="3"
                autosize
                label="详细地址"
                type="textarea"
                maxlength="50"
                placeholder="请输入详细地址"
                show-word-limit
            />

          </van-cell-group>
        </van-col>
      </van-row>

      <van-button type="primary" style="position: relative;left: 80%;top:200px" @click="add">提交</van-button>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "AddAddress",
  data(){
    return{
      name: '',
      base: '',
      detail: '',
      phone: '',
    }
  },
  methods:{
    back(){
      this.$router.back();
    },
    add(){
      if(
          this.name !=='' &&
          this.base !=='' &&
          this.detail !=='' &&
          this.phone !==''){
        request({
          url: '/address?action=addAddress',
          method: 'post',
          data:{name: this.name,
            base: this.base,
            detail: this.detail,
            phone: this.phone},
        }).then(res => {
          //将会返回token
          console.log(res)
          if(res.code == 200) {

            //给出提示
            this.$toast({
              type : "success",
              message : "添加成功",
              //完全展示后跳转
              onOpened:()=>{
                this.$router.push('/my').then(result =>{
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
      }else {
        this.$toast({
          type : "fail",
          message : "信息不全",
        })
      }
    }
  },
}
</script>

<style scoped>
.zindex{
  position: absolute;
  z-index: 6;
}
</style>