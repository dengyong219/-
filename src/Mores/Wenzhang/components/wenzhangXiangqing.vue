<template>
    <div class="wenzhangXiangqing-container">
        <h1>{{ wenzhangInfo.title }}</h1>
        <div class="guanyuNumber">
            <!-- <h1>{{ wenzhangInfo.category }}</h1> -->
            <span>日期:&nbsp;{{ zhuanhuanTime(wenzhangInfo.createDate) }}</span>
            <span>浏览量:&nbsp;{{ wenzhangInfo.scanNumber }}</span>
            <a href="#datafrom-container">评论:&nbsp;{{ wenzhangInfo.commentNumber }}</a>
            <router-link :to="{
                name: 'mouGeWenzhang',
                params: {
                    mouGeID: wenzhangInfo.category.id
                }
            }">{{ wenzhangInfo.category.name }}</router-link>
        </div>
        <div v-html="wenzhangInfo.htmlContent" class="markdown-body"></div>
    </div>
</template>

<script>
import "highlight.js/styles/github.css";
import { zhuanhuanTime } from '@/zhuanhuanTime/zhuanhuanTime'
export default {
    // data() {
    //     return {
    //         htmlString: this.wenzhangInfo.htmlContent
    //     }
    // },
    props: {
        // 文章详情的对象的信息
        wenzhangInfo: {
            type: Object,//数据类型为对象格式
            required: true,//是否必须传递
        }
    },
    mounted() {
        // console.log(this.$route, '《===路由信息');
    },
    methods: {
        zhuanhuanTime,//需要把 zhuanhuanTime 方法注册才能用
    },
}
</script>

<style scoped lang="less">
@import '~@/style/var.less';
@import '~@/style/markdown.css';
// @import "highlight.js/styles/github.css";

.wenzhangXiangqing-container {
    // background-color: red;

    .guanyuNumber {
        font-size: 14px;
        color: @gray;
        text-align: right;
        margin: 20px 0;

        span {
            float: left;
            margin-right: 20px;
        }

        a {
            color: @f40;
            margin-left: 20px;
            font-size: 15px;
            font-weight: bold;

            &:hover {
                color: @hover;
            }
        }
    }
}
</style>