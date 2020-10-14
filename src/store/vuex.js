import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
    state: {
        count: 0,
        city: '全国',
        //更多数据接着写即可
    },
    mutations: {
        add(state, step) {
            state.count += step
            //不要写return
        },
        setCity(state, cityName) {
            state.city = cityName
        },

    },
    actions: {
        addAsync(context, step) {
            setTimeout(() => {
                context.commit('add', step)
            }, 1000)
        },

    },
    getters: {
        getCount(state) {
            return '当前总数是' + state.count
        },
    }
})