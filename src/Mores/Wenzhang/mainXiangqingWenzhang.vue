<template>
    <!-- 这个组件拿详情的文章信息 -->
    <div class="mainXiangqingwenzhang-container">
        <Layout>
            <div ref="mainContainer" class="default" v-loading="isLoading">
                <wenzhangXiangqing :wenzhangInfo="datas" v-if="datas" />
                <wenzhangBottonInfo v-if="!isLoading" />
            </div>
            <template #right>
                <div class="right" v-loading="isLoading">
                    <wenzhnagRightTOC :lists="datas.toc" v-if="datas" />
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>
import getFetchData from '@/mixins/getFetchData'
import { getWenzhangRightTitle } from '@/api/Wenzhang' //获取单个博客
import Layout from '@/components/Layout' //分栏
import wenzhangXiangqing from './components/wenzhangXiangqing'//文章详情
import wenzhnagRightTOC from './components/wenzhangRightTOC.vue' // 文章RightTOC
import mainScroll from '@/mixins/mainScroll.js'//使用混合就无需写多余代码
import { kongzhiTitle } from '@/methods' // 设置路由标题

// 底部
import wenzhangBottonInfo from './components/wenzhangBottonInfo.vue'

export default {
    mixins: [getFetchData(null), mainScroll("mainContainer")],
    components: {
        Layout,
        wenzhangXiangqing,
        wenzhnagRightTOC,
        wenzhangBottonInfo,
    },
    methods: {
        // 点击按钮-顶部主区域返回顶部
        handMainContainerScroll(scrollTop) {
            this.$refs.mainContainer.scrollTop = scrollTop
        },
        async getYuanChengData() {
            // getWenzhangRightTitle(id为当前路由的params.fenleiID)
            let result = await getWenzhangRightTitle(this.$route.params.fenleiID)
            console.log(result.data, '拿到【getWenzhangRightTitle】数据');
            // result = null    //【测试没有文章才打开】
            // 如果result没有值，那么文章不纯在显示this404组件
            if (!result) {
                this.$router.push("/404")
                return; //这里不返回下面代码还是会执行的
            }

            if (result.data.title) {//这里判不判断都无所谓了
                kongzhiTitle.setRouterTitle(result.data.title)//调用路由标题函数
            }
            return result.data
        },

        // 【使用了混入 mainScroll混入方法 就无需写下面代码】
        // mainHandScroll() {
        //     // console.log('滚动了');

        //     // 既然是全局事件总线，那么任意组件都可用这个 eventBus 事件
        //     this.$bus.$emit('scroll_event', this.$refs.mainContainer); //全局事件总线->抛出了一个eventBus事件，数据为mainContainer DOM元素
        // },
    },

    // 【使用了混入 mainScroll混入方法 就无需写下面代码】
    // mounted() {
    //     // console.log("this.$refs.mainContainer", this.$refs.mainContainer);
    //     // console.log('测试组件xiangqingWenzhang==>当前地址栏的信息', this.$route);

    //     this.$refs.mainContainer.addEventListener("scroll", this.mainHandScroll)

    //     // 点击按钮主区域滚动条返回顶部
    //     this.$bus.$on('setMainScroll', this.handMainContainerScroll)
    // },
    // beforeDestroy() {//销毁前
    //     this.$bus.$emit('scroll_event')
    //     this.$refs.mainContainer.removeEventListener("scroll", this.mainHandScroll)
    //     this.$bus.$off('setMainScroll', this.handMainContainerScroll)
    // },

    // 界面数据更新后修改路由
    updated() {
        // console.log('更新后的路由信息==》', location.hash);

        const hash = location.hash;//先保存下更新后的路由
        location.hash = "";//然后把hash值设置空

        // 等待一段时间才恢复原先hash值
        setTimeout(() => {
            location.hash = hash;
        }, 900)
    },
}
</script>

<style scoped lang="less">
@import '~@/style/all.less';

.mainXiangqingwenzhang-container {
    position: relative;
    height: 100%;
    overflow-y: scroll;
    // background-color: #4096cb38;

    // 中间主区域
    .default {
        scroll-behavior: smooth;
        position: relative;
        width: 100%;
        height: 100%;
        overflow-y: scroll;
        padding: 20px;
        padding-bottom: 0;
        // background-color: rgba(255, 166, 0, 0.526); //【中间主区域】
        white-space: wrap; //文本换行

        // &::-webkit-scrollbar {
        //     width: 5px;
        //     background-color: red;
        // }
    }

    .right {
        position: relative;
        width: 300px;
        padding: 20px;
        height: 100%;
        // background-color: rgb(0, 255, 195);
    }
}
</style>