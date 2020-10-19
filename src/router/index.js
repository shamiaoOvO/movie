import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入路由模块化文件
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
import detailRouter from './routes/detail'
import cityRouter from './routes/city'
import vuexRouter from './routes/vuex'
import loginRouter from './routes/login'
import cinemasRouter from './routes/cinemas.js'

const routes = [{
        path: '/',
        redirect: '/film'
    },
    centerRouter,
    cinemaRouter,
    filmRouter,
    detailRouter,
    cityRouter,
    vuexRouter,
    loginRouter,
    cinemasRouter
]

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
    mode: 'history',
    //前缀
    // base: process.env.BASE_URL,
    routes
})

//路由守卫
router.beforeEach((to, from, next) => {
    let arr = [
        //存储需要登录的页面
        "/cinema"
    ]
    if (arr.includes(to.path)) {
        //返回真,则在需要登录的数组中
        if (localStorage.getItem('_token')) {
            next()
        } else {
            if (confirm('您还没有登录,是否前往登录')) {
                next({
                    path: '/login',
                    query: {
                        refer: to.fullPath //fullPath包括地址栏问号后面的传参
                    }
                })
            }
        }
    } else {
        next()
    }
})

export default router