import { getXiangmu } from "@/api/Xiangmu.js"
// console.log(getXiangmu, "-=-getXiangmu-=-getXiangmu");
export default {
    namespaced: true,
    state: {
        loading: false,
        data: []
    },
    // 同步
    mutations: {
        setLoading(state, payload) {
            state.loading = payload
        },
        setXiangmuData(state, payload) {
            state.data = payload
        }
    },
    // 异步
    actions: {
        async await_XiangmuData(ctx) {
            if (ctx.state.data.length) return
            ctx.commit("setLoading", true)
            const result = await getXiangmu()
            // console.log(result.data, "store/xiangmu.js");
            ctx.commit("setXiangmuData", result.data)
            ctx.commit("setLoading", false)
        }
    }
}