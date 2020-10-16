//发送具体的请求
import http from "@/api/http"
import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetailUrl,
    cinemaListUrl,
    ticketListUrl,
    cityListUrl,
    loginUrl,
    centerUrl
} from "@/config/url"

//请求正在热映的列表数据
export const nowPlayingListData = pageNum => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "film"
    return http.get(nowPlayingListUrl + pageNum)
}
//即将上映
export const comingSoonListData = pageNum => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "film"
    return http.get(comingSoonListUrl + pageNum)
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
    return http.get(ticketListUrl)
}

//请求电影院详细数据
export const cinemaListData = () => {
    http.defaults.headers.authorization = ""
    http.defaults.headers.info = "cinema"
    return http.get(cinemaListUrl)
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