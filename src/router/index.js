import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home/Home.vue'),
        meta: {
          requiresAuth: true,
          roles: [0, 1, 2] // 该路由需要管理员均可访问
        }
      },
      {
        path: '/userInfo',
        name: 'userInfo',
        component: () => import('../views/UserInfo/UserInfo.vue'),
        meta: {
          requiresAuth: true,
          roles: [0, 1, 2] // 该路由需要管理员均可访问
        }
      },
      {
        path: '/maintainerManage',
        name: 'maintainerManage',
        component: () => import('../views/MaintainerManage/MaintainerManage.vue'),
        meta: {
          requiresAuth: true,
          roles: [0] // 该路由需要管理员均可访问
        }
      },
      {
        path: '/userManage',
        name: 'userManage',
        component: () => import('../views/UserManage/UserManage.vue'),
        meta: {
          requiresAuth: true,
          roles: [0] // 该路由需要管理员均可访问
        }
      },
      {
        path: '/repairManage',
        name: 'repairManage',
        component: { render(c) { return c('router-view') } },
        // component: () => import('../views/RepairManage/RepairManage.vue'),
        children: [
          {
            path: '/repairManage',
            name: 'repairManage',
            component: () => import('../views/RepairManage/RepairManage.vue'),
            meta: {
              requiresAuth: true,
              roles: [0,1] // 该路由需要管理员均可访问
            }
          },
          {
            path: '/myRepairManage',
            name: 'myRepairManage',
            component: () => import('../views/RepairManage/MyRepairManage.vue'),
            meta: {
              requiresAuth: true,
              roles: [0, 1, 2] // 该路由需要管理员均可访问
            }
          },

        ]
      },
      {
        path: '/noticeManage',
        name: 'noticeManage',
        component: () => import('../views/NoticeManage/NoticeManage.vue'),
        meta: {
          requiresAuth: true,
          roles: [0] // 该路由需要管理员访问
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue')
  }
]

const router = new VueRouter({
  routes
})

// 添加导航守卫
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth // 判断该路由是否需要登录权限
  const roles = to.meta.roles // 获取该路由可访问的角色列表
  let role = JSON.parse(localStorage.getItem('state')); // 获取当前登录用户的角色
  if (role === null) {
    console.log(1);
  } else {
    role = JSON.parse(localStorage.getItem('state')).userInfo.role
  }
  if (requiresAuth) { // 如果该路由需要登录权限
    if (role) { // 如果用户已经登录
      console.log(role);
      if (roles.includes(parseInt(role))) { // 如果该角色在可访问的角色列表中
        next() // 跳转到目标路由
      } else {
        next('/home') // 跳转到首页
      }
    } else { // 如果用户没有登录
      next('/login') // 跳转到登录页面
    }
  } else {
    next() // 不需要登录权限，直接跳转
  }
})

export default router
