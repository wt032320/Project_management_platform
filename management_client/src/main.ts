import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';

// 引入图标css文件
import '../src/assets/icons/iconfont.css';

createApp(App)
  .use(router)
  .use(store)
  .use(ElementPlus)
  .mount('#app')
