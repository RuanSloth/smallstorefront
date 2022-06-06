import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/home/Home";
import Category from "@/views/category/Category";
import My from "@/views/my/My";
import Cart from "@/views/cart/Cart";
import test from "@/views/test"
import Login from "@/views/other/Login";
import AdminLogin from "@/views/other/AdminLogin";
import Register from "@/views/other/Register";
import HomeView from "@/views/HomeView";



import store from '../store'
import Admin from "@/views/admin/Admin";
import AdminOrder from "@/views/admin/order/AdminOrder";
import AdminStore from "@/views/admin/store/AdminStore";
import AdminGood from "@/views/admin/good/AdminGood";
import AdminCoupon from "@/views/admin/coupon/AdminCoupon";
import AddStore from "@/views/admin/store/AddStore";
import EditStore from "@/views/admin/store/EditStore";
import AddGood from "@/views/admin/good/AddGood";
import EditGood from "@/views/admin/good/EditGood";
import AddCoupon from "@/views/admin/coupon/AddCoupon";
import EditCoupon from "@/views/admin/coupon/EditCoupon";
import GoodDetail from "@/views/other/GoodDetail";
import Order from "@/views/order/Order";
import MyInfo from "@/views/my/MyInfo";
import MyAddress from "@/views/my/MyAddress";
import AddAddress from "@/views/my/AddAddress";
import MyOrder from "@/views/order/MyOrder";
const routes = [
  {
    path: '',
    redirect: '/home',
    meta:{
      showTabbar: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta:{
      showTabbar: true
    }
  },
  {
    path: '/test',
    name: 't123',
    component: HomeView,
    meta:{
      showTabbar: true
    }
  },
  {
    path: '/category',
    name: 'category',
    component: Category,
    meta:{
      showTabbar: true
    }
  },
  {
    path: '/adminLogin',
    name: 'adminLogin',
    component: AdminLogin,
    meta:{
      showTabbar: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      showTabbar: false
    }
  },
  {
    path: '/order',
    name: 'order',
    component: Order,
    meta:{
      showTabbar: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta:{
      showTabbar: false
    }
  },
  {
    path: '/goodDetail/:goodid',
    name: 'goodDetail',
    component: GoodDetail,
    meta:{
      showTabbar: false
    }
  },
  {
    path: '/my',
    name: 'my',
    component: My,
    meta:{
      showTabbar: true
    },
  },
  {
    path: '/myorder',
    name: 'myorder',
    component: MyOrder,
    meta:{
      showTabbar: true
    },
  },
  {
    path: '/myinfo',
    name: 'myInfo',
    component: MyInfo,
    meta:{
      showTabbar: true
    },
  },
  {
    path: '/myaddress',
    name: 'myAddress',
    component: MyAddress,
    meta:{
      showTabbar: true
    },
  },
  {
    path: '/addaddress',
    name: 'addAddress',
    component: AddAddress,
    meta:{
      showTabbar: true
    },
  },
  {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta:{
      showTabbar: true
    }
  },


  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta:{
      showTabbar: false,
      title: '管理系统'
    },
    children:[
      {
        path: '/admin/order',
        name: 'adminOrder',
        component: AdminOrder,
        meta:{
          showTabbar: false,
          title: '管理订单'
        },
      },
      {
        path: '/admin/store',
        name: 'adminStore',
        component: AdminStore,
        meta:{
          showTabbar: false,
          title: '管理店铺'
        },
        children:[
          {
            path: '/admin/store/add',
            name: 'addStore',
            component: AddStore,
            meta:{
              showTabbar: false,
              title: '增加店铺',
            },
          },
          {
            path: '/admin/store/edit/:sid',
            name: 'editStore',
            component: EditStore,
            meta:{
              showTabbar: false,
              title: '编辑店铺',
            },
          }
        ]
      },
      {
        path: '/admin/good',
        name: 'adminGood',
        component: AdminGood,
        meta:{
          showTabbar: false,
          title: '管理商品'
        },
        children:[
          {
            path: '/admin/good/add',
            name: 'addGood',
            component: AddGood,
            meta:{
              showTabbar: false,
              title: '增加商品',
            },
          },
          {
            path: '/admin/good/edit/:goodid',
            name: 'editStore',
            component: EditGood,
            meta:{
              showTabbar: false,
              title: '编辑商品',
            },
          }]
      },
      {
        path: '/admin/order',
        name: 'adminOrder',
        component: AdminOrder,
        meta:{
          showTabbar: false
        },
      },
      {
        path: '/admin/coupon',
        name: 'adminCoupon',
        component: AdminCoupon,
        meta:{
          showTabbar: false
        },
        children:[
          {
            path: '/admin/coupon/add',
            name: 'addCoupon',
            component: AddCoupon,
            meta:{
              showTabbar: false,
              title: '增加优惠券',
            },
          },
          {
            path: '/admin/coupon/edit/:goodid',
            name: 'editCoupon',
            component: EditCoupon,
            meta:{
              showTabbar: false,
              title: '编辑优惠券',
            },
          }]
      },
    ]
  },


]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {

      if (to.path === '/login' || to.path === '/register' || to.path === '/adminLogin') {
        //如果是去登录或者注册页面

        //清空vuex和浏览器token
        if(to.path === '/login'){
          store.commit({
            type: 'changeLogin',
            result: '',
          })
        }
        //打印一下浏览器现在的token
        // console.log("浏览器:"+localStorage.getItem("AccessToken"))
        //打印一下vuex的token,查看是否发生变化
        // console.log("store:"+store.getters.getToken)

        next();
      } else {

        let token = store.getters.getToken;
        //拿到token
        if (token === null || token === '') {

          //没有token  跳转到login,而不是to所对应的路由
          next('/login');
          // next();
        } else {
          //如果没有这个路由
          if (to.matched.length === 0) {
            //暂时还没有搞404页面
            next('/404')
          } else {
            next();
          }
        }
      }
  }
)

export default router
