import axios from "axios"
import showInfo from '../methods/showInfo'

const ins = axios.create()
// 添加响应拦截器
ins.interceptors.response.use(function (resp) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    //如果code不为0，则弹出消息框
    if (resp.data.code !== 0) {
        showInfo({
            text: resp.data.msg,
            type: 'cuowu'
        })
        return null
    }
    return resp.data;
})
export default ins;