<template>
    <div class="xiangmu-container" ref="xiangmuContainer" v-loading="loading">
        <!-- v-pingHua：元素平滑上移【效果未出来】 -->
        <div v-pingHua class="xiangmu-a" v-for="datas in data" :key="datas.id">
            <a :href="datas.url ? datas.url : `javascript:alert('未开放外网，请使用内网')`"
                :target="datas.url ? '_blank' : '_self'" class="leftImg">
                <!-- 图片懒加载 v-lazy -->
                <img :src="datas.thumb" alt="" v-lazy="datas.thumb">
            </a>
            <div class="rightText">
                <h5 class="h5">
                    <a :href="datas.url ? datas.url : `javascript:alert('未开放外网，请使用内网')`"
                        :target="datas.url ? '_blank' : '_self'">{{ datas.name }}</a>
                </h5>
                <a :href="datas.github" class="github" v-if="datas.github">github</a>
                <div class="textP">
                    <p v-for="(item, i) in datas.description" :key="i">{{ item }} </p>
                </div>
            </div>
        </div>
        <kongComp v-if="data.length === 0 && !loading" />
        <!-- 底部 -->
        <div class="dibu" v-if="data">
            {{ data.length > 0 ? data.length === 1 ? '温馨提示：才写1个项目？好意思打开吗?' : '温馨提示：才写这么点项目？看看领居家孩子' : '' }}
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import mainScroll from "@/mixins/mainScroll.js"
import kongComp from "@/components/Empty" // 无数据显示该组件
export default {
    components: {
        kongComp
    },
    mixins: [mainScroll("xiangmuContainer")],
    computed: {
        ...mapState("xiangmu", ["loading", "data"])
    },
    // 记得要触发才能使用mapState
    created() {
        this.$store.dispatch("xiangmu/await_XiangmuData")
    },
    // 挂载后
    // mounted() {
    //     console.log(this.data, '11111111111111111111111111111');
    // }
}

</script>

<style scroll lang="less">
.xiangmu-container {
    a {
        display: inline-block;
    }

    scroll-behavior: smooth;
    position: relative;
    height: 100%;
    margin: 15px 13px;
    overflow-y: auto;
    padding-right: 10px;

    &:-webkit-scrollbar {
        display: none;
    }

    .xiangmu-a {
        display: flex;
        padding: 15px;
        margin: 10px;
        margin-top: 20px;
        transition: .2s;
        color: inherit;

        /* 动画过渡效果 */
        &:hover {
            box-shadow: 0 0 5px #000;
            transform: scale(1.01);
        }

        .leftImg {
            width: 265px;
            min-height: 150px;
            // background-color: rgba(255, 68, 0, 0.201);
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .rightText {
            flex: 1;
            // display: flex;
            // flex-direction: column;
            // justify-content: space-around;
            // background-color: rgb(255, 204, 0);

            .h5 {

                a {
                    font-size: 20px;

                    &:hover {
                        color: #417f8e;
                    }
                }
            }

            .github {
                color: #71a2ef;
                // margin: 10px 0px;
                transform: translateY(15px);
                display: block;
                font-size: 13px;
            }

            .textP {
                // background-color: red;
                margin-top: 30px;

                p {
                    white-space: wrap;
                    // line-height: 2rem;
                    margin-bottom: 20px;
                }

            }

        }
    }

    .xiangmu-a:last-child {
        // background-color: red;
        margin-bottom: 30px;
    }

    //底部
    .dibu {
        // background-color: red;
        text-align: center;
        color: #f40;
        // font-weight: bold;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        margin-bottom: 20px;
    }
}
</style>