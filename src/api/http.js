//封装axios,添加请求的拦截器,添加请求头
import axios from "axios"
//设置基础域名
axios.defaults.baseURL = "https://m.maizuo.com/"
//请求拦截器处理,添加请求头
axios.interceptors.request.use(
    function (config) {
        let host = ""
        let info = config.headers.info
        if (info == "film") {
            host = "mall.film-ticket.film.list"
        }
        if (info == "cinema") {
            host = "mall.film-ticket.cinema.list"
        }
        if (info == "info") {
            host = "mall.film-ticket.film.info"
        }
        if (info == "ticket") {
            host = "mall.cfg.cinema.banners"
        }
        //其他的可以继续添加

        //请求头
        config.headers = {
            'X-Client-Info': ' {"a":"3000","ch":"1002","v":"5.0.4","e":"16022268592862436788994050","bc":"310100"}',
            'X-Host': host
        }
        return config
    },
    function (err) {
        //错误处理
        return Promise.reject(err)
    })
//导出封装好的axios
export default axios