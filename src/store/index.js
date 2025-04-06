import Vue from "vue"
import Vuex from "vuex";

// 如果是用传统方式引入cdn的话
if (!window.Vuex) {
    Vue.use(Vuex)
}

import Home from "./Home";
import setGudingData from "./setGudingData";
import guanyuw from "./guanyuw"
import xiangmu from "./xiangmu";


const store = new Vuex.Store({
    modules: {
        Home,
        setGudingData,
        guanyuw,
        xiangmu,
    },

    strict: true,// 开启严格模式，只允许mutation更改state数据
})
window.store = store
export default store;