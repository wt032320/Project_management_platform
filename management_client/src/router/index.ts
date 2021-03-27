import { createRouter, createWebHashHistory } from 'vue-router'

// 路由懒加载
const Auth = () => import('../views/Auth.vue')

const routes = [
  { 
    path: '/', 
    component: Auth
  },
]

const router = createRouter({
  // 4. 提供历史实现使用。为了简化起见，我们在这里使用哈希历史记录
  history: createWebHashHistory(),
  routes, //  `routes: routes` 的缩写
})

export default router