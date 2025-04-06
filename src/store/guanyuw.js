import { getGuanyuw } from "@/api/Guanyuw"
const store = {
    // 仓库
    // 设置命名空间
    namespaced: true,
    state: {
        loading: false,
        data: null,
    },
    // 同步
    mutations: {
        // 设置加载
        setLoading(state, payload) {
            state.loading = payload;
        },
        setGuanyuwData(state, payload) {
            state.data = payload
        },
    },
    // 异步
    actions: {
        async await_guanyuwData(ctx) {
            ctx.commit("setLoading", true)
            const result = await getGuanyuw()
            console.log(result, "设置且拿到`关于我`的Data数据_store/guanyuw.js");
            // 拿到数据[网页地址]后，设置到setGuanyuwDta处
            ctx.commit("setGuanyuwData", result.data)
            ctx.commit("setLoading", false)
            return result.data
        },
    }
}
export default store;