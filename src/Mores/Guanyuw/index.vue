<template>
    <!-- 
     loading为true 或 iframe没有加载完成，继续loading效果
    解释：就是说Axios加载中或网页还没加载完成，则继续loading效果
    -->
    <div ref="gaunyuwDiv" class="guanyuw-container" v-loading="loading || !urlLoading">
        <!-- @load="urlLoading = true"【表示网页加载完成】 -->
        <iframe width="100%" height="100%" @load="urlLoading = true" v-if="url" :src="url" frameborder="0"></iframe>
    </div>
</template>

<script>
import { mapState } from "vuex"
export default {
    data() {
        return {
            urlLoading: false,//iframe加载完成
        }
    },
    // 拿仓库的数据
    computed: {
        ...mapState("guanyuw", {
            url: "data",
            loading: "loading",//loading需要等到网页加载完成或Axios请求完成才会停止
        })
    },
    // 记得要触发 await_guanyuwData这个函数
    created() {
        this.$store.dispatch("guanyuw/await_guanyuwData")
    },
}
</script>

<style scoped lang="less">
.guanyuw-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
</style>