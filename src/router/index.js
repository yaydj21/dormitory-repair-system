import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    redirect:'/home',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/Home.vue'),
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../views/UserInfo/UserInfo.vue'),
      },
      {
        path: '/maintainerManage',
        name: 'maintainerManage',
        component: () => import('../views/MaintainerManage/MaintainerManage.vue'),
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: () => import('../views/UserManage/UserManage.vue'),
      },
      {
        path: '/repairManage',
        name: 'repairManage',
        component: () => import('../views/RepairManage/RepairManage.vue'),
      },
      {
        path: '/noticeManage',
        name: 'noticeManage',
        component: () => import('../views/NoticeManage/NoticeManage.vue'),
      },
      {
        path: '/systemManage',
        name: 'systemManage',
        component: {render(c) {return c('router-view')}},
        // component: () => import('../views/CampusEpidemic/CampusEpidemic.vue'),
        children: [
          {
            path: '/employeeManage',
            name: 'employeeManage',
            component: () => import('../views/SystemManage/EmployeeManage.vue'),
          },
          {
            path: '/roleManage',
            name: 'roleManage',
            component: () => import('../views/SystemManage/RoleManage.vue'),
          },

        ]
      },
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
