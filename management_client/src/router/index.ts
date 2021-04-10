import { createRouter, createWebHashHistory } from 'vue-router'
import component from '../shims-vue';

// 路由懒加载
const Auth = () => import('../views/Auth.vue')
const Home = () => import('../views/Home.vue')
const ProjectMain = () => import('../components/project/ProjectMain.vue')
const System = () => import('../components/system/System.vue')
const Friend = () => import('../components/friend/Friend.vue')
const Profile = () => import('../components/profile/Profile.vue')
const Community = () => import('../components/community/Community.vue')
const AddInfo = () => import('../components/profile/AddInfo.vue')

const routes = [
  { 
    path: '/', 
    component: Auth
  },
  {
    path: '/project',
    component: Home,
    children: [
      {
        path: '',
        component: ProjectMain
      },
      {
        path: 'friend',
        component: Friend
      },
      {
        path: 'community',
        component: Community
      },
      {
        path: 'profile',
        component: Profile
      },
      {
        path: 'system',
        component: System
      },
      {
        path: 'prefect',
        component: AddInfo
      }
    ]
  }
]

const router = createRouter({
  /**
  提供历史实现使用。为了简化起见，我们在这里使用哈希历史记录 
    1.createWebHashHistory路由模式路径带#号
    2.createWebHistory路由模式路径不带#号(生产环境下不能直接访问项目，需要nginx转发)
  */
  history: createWebHashHistory(),
  routes, //  `routes: routes` 的缩写
})

export default router