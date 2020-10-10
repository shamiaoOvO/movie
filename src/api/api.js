//发送具体的请求
import http from "@/api/http"
import {
    nowPlayingListUrl,
    comingSoonListUrl,
    movieDetailUrl
} from "@/config/url"

//请求正在热映的列表数据
export const nowPlayingListData = pageNum => {
    http.defaults.headers.info = "film"
    return http.get(nowPlayingListUrl + pageNum)
}
//即将上映
export const comingSoonListData = pageNum => {
    http.defaults.headers.info = "film"
    return http.get(comingSoonListUrl + pageNum)
}

//请求电影详情数据
export const movieDetailData = filmId => {
    http.defaults.headers.info = "info"
    return http.get(movieDetailUrl +
        filmId)
}