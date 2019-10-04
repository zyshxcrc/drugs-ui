import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/layout/mainLayout'
import Warehouse from '@/views/warehouse'
import Inventory from '@/views/inventory'
import OutOfStock from '@/views/outOfStock'
import ComponyList from '@/views/basicData/componyList'
import DrugsList from '@/views/basicData/drugsList'
import ReceiverList from '@/views/basicData/receiverList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      component: MainLayout,
      children:[
        {
          path:"/",
          redirect: '/inventory',
          component:HelloWorld
        },
        {
          path:'warehouse',
          component:Warehouse
        },
        {
          path:'inventory',
          component:Inventory
        },
        {
          path:'outOfStock',
          component:OutOfStock
        },
        {
          path:'componyList',
          component:ComponyList
        },
        {
          path:'drugsList',
          component:DrugsList
        },
        {
          path:'receiverList',
          component:ReceiverList
        }
      ]
    }
  ]
})
