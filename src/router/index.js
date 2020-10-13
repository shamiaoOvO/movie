import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入路由模块化文件
import centerRouter from './routes/center'
import cinemaRouter from './routes/cinema'
import filmRouter from './routes/film'
import detailRouter from './routes/detail'
const routes = [{
        path: '/',
        redirect: '/film'
    },
    centerRouter,
    cinemaRouter,
    filmRouter,
    detailRouter
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

export default router