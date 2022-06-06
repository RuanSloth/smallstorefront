import axios from 'axios'
import store from '../store'
import router from "@/router";
export  function request(config) {
//  创建axios实例
  const instance = axios.create({
    baseURL: 'http://192.168.137.1:8080/StoreServer',
    timeout: 5000
  })

  //拦截器
  //拦截器作业
  //1.修改config里不符合服务器要求的数据
  //2.发送网络请求时，希望界面显示一个请求的图标或动画
  //3.某些网络请求（比如登录）,必须携带一些特殊信息

  //发送拦截
  instance.interceptors.request.use(
      //请求发送成功时调用
      config => {
        // console.log('我拦截了')
        // console.log(config)
        // 如果有token，则在响应头加上
        if (store.getters.getToken === null || store.getters.getToken === '' ) {}
        else {
          //如果不是请求验证或者注册接口，就加上请求头
          if(config.url !== "/my?action=login" || config.url !== "/my?action=createUser")
          config.headers.AccessToken = store.getters.getToken;
        }
        //必须返回config，让其成功连接
        console.log(config)
          return config
      },
      //请求发败失败时调用
      err => {
        console.log(err)
      }
  )
  //响应拦截
  instance.interceptors.response.use(
      //响应成功拦截
      res => {
        // console.log(res)
        //返回data,去除响应里其他的不必要信息
        if(res.data.code == 203){
          router.push('/login')
        }
        return res.data
      },
      //响应失败拦截
      err => {
        console.log(err)
      }
  )
//  发送真正的网络请求
//  会返回个promise
  return instance(config)
}




