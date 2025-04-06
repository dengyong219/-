
import { getHome } from "@/api/Home"
export default {
    namespaced: true,//命名空间
    state: {
        loading: false,
        data: [],
    },
    // 写计算方法
    getters: {

    },
    // 针对state作出同步改变
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setData(state, payload) {
            state.data = payload
        },
    },
    // 异步
    actions: {
        // async await_setLoading(ctx) {
        //     ctx.commit("setLoading", true)
        //     const result = await getHome()
        //     console.log("拿到Home的true/false结果===》", result);
        //     ctx.commit("setLoading", false)
        // },


        async await_setData(ctx) {
            // data有数据，就return 表示无需重新赋值
            if (ctx.state.data.length) return

            ctx.commit("setLoading", true)
            const result = await getHome()
            // console.log("拿到Home的data结果", result);
            ctx.commit("setData", result)
            ctx.commit("setLoading", false)
        }
    },
}