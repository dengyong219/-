import { setGudingData } from "@/api/setGudingData"
import { kongzhiTitle } from "@/methods";

export default {
    namespaced: true,//命名空间
    state: {
        loading: false,
        data: null,//拿到固定数据_一个对象格式
    },
    // 写计算方法
    getters: {

    },
    // 针对state作出同步改变
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        // 调用getData函数拿到固定数据
        getData(state, payload) {
            state.data = payload
        }
    },
    // 异步
    actions: {
        // 拿到固定数据
        async await_getGudingData(ctx) {
            ctx.commit("setLoading", true)
            const result = await setGudingData()
            // console.log(result.data, "await_getGudingData【src/store.setGudingData.js】");
            ctx.commit("getData", result.data)
            ctx.commit("setLoading", false)
            // <link rel="shortcut icon" href="/images/favicon.png (or ico?)" type="image/x-icon" />
            if (result.data.favicon) {//如果 模拟数据:result.data.favicon有值就设置，没有就默认的
                // 找icon
                const linkIcon = document.querySelector("link[rel='shortcut icon']")
                if (linkIcon) {
                    // 有icon不加；没有icon创建且加上
                    return
                }
                const link = document.createElement('link')
                link.rel = "shortcut icon"
                link.type = "image/x-icon"
                link.href = result.data.favicon
                document.querySelector("head").appendChild(link)
            };
            // if (result.data.title) {
            //     console.log("找到固定data：", result.data.title);
            //     // 更改标题
            //     const titleText = document.querySelector("title")
            //     console.log(titleText, '找标题-titleText');
            //     titleText.innerText = result.data.title
            //     document.head.appendChild(titleText)
            // }

            /*
                拿到网站数据后就可以设置标题了
            */

            // console.log(result.data.siteTitle, "<==网站的标题");
            if (result.data.siteTitle) {
                // 调用 kongzhiTitle.setWebTitle
                kongzhiTitle.setWebTitle(result.data.siteTitle)
            }
            return result.data
        }
    },
}