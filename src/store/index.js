import { createStore } from 'vuex'

export default createStore({
  state: {
    // 存储token
    AccessToken: typeof(localStorage.getItem('AccessToken')) == undefined ? '' :
                      localStorage.getItem('AccessToken'),

    //基本的请求路径
    BaseUrl : 'http://192.168.137.1:8080/StoreServer/'
  },
  getters: {
      getToken(state){
        return state.AccessToken
      },
      getUrl(state){
      return state.BaseUrl
    }
  },
  mutations: {
    // 修改token
    //这里result在外面传进来时是token，进来是commit的整个对象
    changeLogin(state, result) {
      state.AccessToken = result.result
      
      localStorage.setItem('AccessToken', result.result);

    },
  },
  actions: {
  },
  modules: {
  }
})
