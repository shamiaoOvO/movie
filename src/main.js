import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import AMap from "vue-amap";
import {
    InfiniteScroll
} from 'mint-ui';
import VueTouch from 'vue-touch'

Vue.use(VueTouch, {
    name: 'v-touch'
})

Vue.use(InfiniteScroll);

Vue.use(AMap);
AMap.initAMapApiLoader({
    key: "d952b4e9d6b1a56fb84d3f1df36536f8",
    plugin: ["AMap.Geolocation", "AMap.Geocoder"],
    v: '1.4.4'
});

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

let cityId = localStorage.getItem("cityId")
if (cityId) {
    store.commit('setCityId', cityId)
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')