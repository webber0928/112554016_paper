import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/story',
    children: [{
      path: 'story',
      name: '學習單',
      component: () => import('@/views/story/index'),
      meta: { title: '學習單', icon: 'form' }
    }]
  },

  {
    path: '/story/create',
    component: Layout,
    children: [{
      path: '',
      name: 'StoryCreate',
      component: () => import('@/views/story/create'),
      meta: { title: '學習單建立', icon: 'dashboard', roles: ['admin-token'] }
    }]
    // hidden: true
  },

  {
    path: '/story/edit/:id',
    name: '學習單修改',
    component: () => import('@/views/story/edit'),
    meta: { title: '學習單修改', icon: 'el-icon-chat-line-round' },
    hidden: true
  },

  {
    path: '/story/:id',
    name: '學習單',
    component: () => import('@/views/story/one'),
    meta: { title: '學習單', icon: 'el-icon-chat-line-round' },
    hidden: true
  },

  {
    path: '/prompt-created',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'createPrompt',
        component: () => import('@/views/prompt/created'),
        meta: { title: 'CreatePrompt', icon: 'form' }
      }
    ],
    hidden: true
  },

  {
    path: '/prompt/edit',
    component: Layout,
    children: [
      {
        path: '',
        name: 'editPrompt',
        component: () => import('@/views/prompt/edit'),
        meta: { title: '修改 Prompt', icon: 'form' }
      }
    ],
    hidden: true
  },

  {
    path: '/prompt',
    component: Layout,
    children: [
      {
        path: '',
        name: 'listPrompt',
        component: () => import('@/views/prompt/list'),
        meta: { title: '學習單 Prompt', icon: 'form', roles: ['admin-token'] }
      }
    ]
    // hidden: true
  },

  {
    path: '/teacher',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Teacher',
        component: () => import('@/views/teacher/dashbord'),
        meta: { title: '老師儀錶板', icon: 'form', roles: ['admin-token'] }
      }
    ]
    // hidden: true
  },

  {
    path: '/teacher/aaa',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Teacher',
        component: () => import('@/views/teacher/dashbord1'),
        meta: { title: '老師儀錶板', icon: 'form', roles: ['admin-token'] }
      }
    ]
    // hidden: true
  },

  {
    path: '/teacher/user/:id',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Teacher',
        component: () => import('@/views/teacher/userOne'),
        meta: { title: '學生資料', icon: 'form', roles: ['admin-token'] }
      }
    ],
    hidden: true
  },

  // {
  //   path: '/teacher',
  //   component: Layout,
  //   redirect: '/teacher',
  //   name: 'Teacher',
  //   meta: {
  //     title: '老師儀錶板',
  //     icon: 'nested',
  //     roles: ['admin-token']
  //   },
  //   // hidden: true,
  //   children: [
  //     {
  //       path: '',
  //       component: () => import('@/views/teacher/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1', roles: ['admin-token'] },
  //       children: [
  //         {
  //           path: 'dashbord',
  //           component: () => import('@/views/teacher/dashbord'),
  //           name: 'dashbord',
  //           meta: { title: '學生資料', roles: ['admin-token'] }
  //         },
  //         {
  //           path: 'user/:id',
  //           component: () => import('@/views/teacher/userOne'),
  //           name: 'user',
  //           meta: { title: '學生資料', roles: ['admin-token'] },
  //           hidden: true
  //         }
  //       ]
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
