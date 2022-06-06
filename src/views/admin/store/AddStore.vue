<template>
    <div id="addStore" class="hide">

      <van-row justify="center" align="center">
        <van-col span="22" style="margin-top: 100px;height: 100px"  >
          <van-cell-group inset>
            <van-field
                v-model="this.datas.sname"
                clearable
                style="max-height: 100px"
                rows:2
                label="店铺"
                type="textarea"
                left-icon="shop"
                placeholder="店铺名称"
            />
          </van-cell-group>
        </van-col>
      </van-row>

        <van-row justify="center" align="center">
        <van-col span="22" justify="center">
          <van-cell-group inset>
            <van-field
                v-model="this.datas.saddress"
                rows="3"
                autosize
                label="地址"
                type="textarea"
                maxlength="50"
                left-icon="location"
                placeholder="店铺地址"

            />
          </van-cell-group>
        </van-col>
      </van-row>

      <van-row justify="center" align="bottom">
        <van-col span="22" justify="center">
          <van-cell-group inset>
            <van-field
                v-model="this.datas.phone"
                clearable
                label="电话"
                left-icon="phone-circle-o"
                placeholder="店铺热线"
            />
          </van-cell-group>
        </van-col>
      </van-row>

      <van-row justify="center" align="bottom" style="margin-top: 80px">
        <van-row span="10" justify="center">
          <van-button type="primary" @click="addStore">提交店铺</van-button>
        </van-row>

      </van-row>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "AddStore",
  data(){
    return{
      datas:{
        sname: '',
        saddress: '',
        phone: '',
      }
    }
  },
  methods:{
    addStore(){
      if(this.datas.sname !== '' && this.datas.saddress !== ''&& this.datas.phone !=='' ){

        request({
          url: '/store?action=addStore',
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
                this.$router.push('/admin/store').then(result => {
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
              onOpened: () => {
                this.$router.push('/admin/store').then(result => {
                  // 关闭toast
                  this.$toast.clear();
                })
              }
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

</style>