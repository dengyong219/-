import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from "./routes.js"
import store from '@/store/index.js'
import { kongzhiTitle } from "@/methods" // 控制标题
// console.log(store, '11111111111111111111111');

// 如果是用传统方式引入cdn的话
if (!window.VueRouter) {
    Vue.use(VueRouter)//使用插件
}
const router = new VueRouter({
    // 配置路由
    routes,
    mode: 'history',
})


// afterEach跳转之后要做什么事【路由标题 - 我的个人空间】
router.afterEach(async (to, from) => {

    // // console.log("afterEach_to：", to.meta, "document.title：", document.title);
    // // 先判断有没有文本
    if (to.meta.title) {
        //     if (store.state.setGudingData.data) {
        //         document.title = to.meta.title + '-' + store.state.setGudingData.data.siteTitle
        //     } else {
        //         document.title = to.meta.title
        //     }

        // console.log(to.meta.title, "<==路由的标题");

        kongzhiTitle.setRouterTitle(to.meta.title)
    }
})
export default router;