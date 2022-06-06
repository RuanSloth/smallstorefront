<template>
    <div id="editStore" class="hide">

      <van-row justify="center" align="center">
        <van-col span="22" style="margin-top: 100px;height: 100px"  >
          <van-cell-group inset>
            <van-field
                v-model="this.store.sname"
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
                v-model="this.store.saddress"
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
                v-model="this.store.phone"
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
          <van-button type="primary" @click="toupdate">修改店铺</van-button>
        </van-row>

      </van-row>
    </div>
</template>

<script>
import {request} from "@/network/request";

export default {
  name: "EditStore",
  data(){
    return{
        store :{
          sid: this.$route.params.sid,
          sname:'',
          saddress: '',
          phone: ''}

    }
  },
  methods:{
    toupdate(){
      this.store.sid = this.store.id;
      console.log("update:"+this.store.sname)
      console.log("update:"+this.store.saddress)
      console.log("update:"+this.store.phone)
      request({
        url: '/store?action=updateStore',
        method: 'post',
        data: this.store,
      }).then(res =>{
        console.log("返回结果啦："+ res.code)
        if(res.code == 200){
          this.$toast({
            type: 'success',
            message:'修改成功哦',
            onOpened: () => {
              this.$router.push('/admin/store').then(result => {
                // 关闭toast
                this.$toast.clear();
              })
            }
          })
        }else if(res.code == 201){
          this.$toast({
            type: 'fail',
            message:'修改失败哦'
          })
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
    getStore(){
      request({
        url: '/store?action=queryStore',
        method: 'post',
        data:{ sid: this.$route.params.sid},
      }).then(res =>{
        if(res.code == 200){
          this.store = res.data
          console.log("查询信息成功")
          console.log(this.store)
        }
        else if(res.code == 203){
          this.$router.push('/login')
        }
      })
    },
    },

  created() {
    /**
     * 网络请求,获得某一商店信息
     */
   this.getStore();
  }
}
</script>
<style>
@import "~@/assets/css/content/hide.css";
</style>
<style scoped>

</style>