import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/page/login'],resolve)
    },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/page/index'],resolve),
      children:[
        {
          path: '/user',
          name: 'user',
          component: resolve => require(['@/page/user/user'],resolve)
        },
        {
          path: '/machine',
          name: 'machine',
          component: resolve => require(['@/page/machine/machine'],resolve)
        },
        {
          path: '/order',
          name: 'order',
          component: resolve => require(['@/page/order/order'],resolve)
        },
        {
          path: '/orderManage',
          name: 'orderManage',
          component: resolve => require(['@/page/order/orderManage'],resolve)
        },
        {
          path: '/organ',
          name: 'organ',
          component: resolve => require(['@/page/organ/organ'],resolve)
        },
        {
          path: '/userGroup',
          name: 'userGroup',
          component: resolve => require(['@/page/userGroup/userGroup'],resolve)
        }
      ]
    }    
  ]
})
