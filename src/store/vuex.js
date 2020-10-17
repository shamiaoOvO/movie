import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        count: 0,
        city: '全国',
        _token: '',
        cityId: 310100,

    },
    mutations: {
        add(state, step) {
            state.count += step
            //不要写return
        },
        setCity(state, cityName) {
            state.city = cityName
            localStorage.setItem('city', cityName)
        },
        updateToken(state, _token) {
            state._token = _token
            localStorage.setItem('_token', _token)
        },
        setCityId(state, cityId) {
            state.cityId = cityId
            localStorage.setItem('cityId', cityId)
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