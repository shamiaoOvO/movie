import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI)

Vue.config.productionTip = false

//使用懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    loading: "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3681478079,2138136230&fm=26&gp=0.jpg"
})

//定义时间总线(后续需要使用,放在原型上)
Vue.prototype.eventBus = new Vue()

//导入vuex的store对象
import store from '@/store/vuex'

//同步localStorage到vuex中
let _token = localStorage.getItem("_token")
if (_token) {
    store.commit('updateToken', _token)
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')