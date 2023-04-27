import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'
import localCache from '@/utils/LocalStorage'
import { ElMessage } from 'element-plus'

const router = createRouter({
  // 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes
})

// 路由守卫
router.beforeEach(async (to, from) => {
  const isAuthenticated = localCache.getCache('token')
  if (!isAuthenticated && to.name !== 'login') {
    ElMessage.warning('您还未登录,请先登录账户!')
    return { name: 'login' }
  }
})

export default router
