import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MainLayout from '@/layout/mainLayout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainLayout',
      component: MainLayout,
      children:[
        {
          path:'helloworld',
          component:HelloWorld
        }
      ]
    }
  ]
})
