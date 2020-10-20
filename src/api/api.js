//发送具体的请求
import http from "@/api/http"
import store from '../store/vuex'

import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetailUrl,
    cinemaListUrl,
    ticketListUrl,
    cityListUrl,
    loginUrl,
    centerUrl,
    showCinemaListUrl,
    showCinemasDayListUrl,
    cinemaUrl,
    moviesListUrl,
    scheduleUrl,
} from "@/config/url"

// let cityId = store.state.cityId
//请求正在热映的列表数据
export const nowPlayingListData = (pageNum) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "film"
    let cityId = store.state.cityId

    return http.get(nowPlayingListUrl + pageNum + "&cityId=" + cityId)
}
//即将上映
export const comingSoonListData = (pageNum) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "film"
    let cityId = store.state.cityId

    return http.get(comingSoonListUrl + pageNum + "&cityId=" + cityId)
}

//请求电影详情数据
export const movieDetailData = filmId => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "info"

    return http.get(movieDetailUrl +
        filmId)
}

//请求电影票券列表数据
export const ticketListData = () => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "ticket"
    let cityId = store.state.cityId

    return http.get(ticketListUrl + cityId)
}

//请求电影院详细数据
export const cinemaListData = async () => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "cinema"
    let cityId = store.state.cityId

    return http.get(cinemaListUrl + cityId)
}

//请求城市信息数据
export const cityListData = async () => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "city"
    let ret = await http.get(cityListUrl)
    let cities = ret.data.data.cities
    let codeList = [] //"A","B"...(完整的26个字母)
    let dataList = [] //城市信息
    let indexList = [] //"A","B"...(处理好的字母)
    let hotList = [] //热门城市
    //循环生成26个字母
    for (let i = 65; i <= 90; i++) {
        codeList.push(String.fromCharCode(i))
    }
    codeList.forEach(element => {
        let tempArr = cities.filter((item) => element.toLowerCase() == item.pinyin.substr(0, 1))
        if (tempArr.length > 0) {
            indexList.push(element)
            dataList.push({
                index: element,
                data: tempArr
            })
        }
    })
    hotList = cities.filter(item => item.isHot == 1)

    return Promise.resolve([dataList, indexList, hotList])
}

//请求具体电影的电影院信息
export const showCinemaListData = (filmId) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "showcinema"
    let cityId = store.state.cityId
    return http.get(showCinemaListUrl + filmId + "&cityId=" + cityId)
}

//具体每天的影院信息
export const showCinemasDayListData = (string) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "cinemasday"
    let cityId = store.state.cityId
    return http.post(showCinemasDayListUrl, {
        "cityId": cityId,
        "cinemaIds": string
    })
}

//影院排片题目信息
export const cinemaData = (cinemaId) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "cinemamsg"
    return http.get(cinemaUrl + cinemaId)
}

//影片列表
export const moviesListData = (cinemaId) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "movieslist"
    return http.get(moviesListUrl + cinemaId)
}

//影片排片信息
export const scheduleData = (filmId, cinemaId, date) => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "schedule"
    return http.get(scheduleUrl + cinemaId + "&filmId=" + filmId + "&date=" + date)
}

export const userLogin = (data) => {
    return http.post(loginUrl, data)
}

//获取用户个人信息
export const userInfo = (_token) => {
    http.defaults.headers.authorization = _token
    http.interceptors.response.use(function (response) {
        if (response.data.data.length > 0) {
            response.data.data.gender = response.data.data.gender ? '女' : '男'
        }
        return response
    }, function (err) {})
    return http.get(centerUrl)
}