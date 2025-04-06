<template>
    <div class="wenzhang-container" ref="containerTop" v-loading="isLoading">
        <ul class="ul-container">
            <li v-for="item in datas.rows" :key="item.id">
                <div class="left-img" v-if="item.thumb">
                    <router-link :to="{
                        name: 'xiangqingWenzhang',
                        params: {
                            fenleiID: item.category.id
                        }
                    }">
                        <!-- 懒加载 v-lazy -->
                        <img v-lazy="item.thumb" :alt="item.title" :title="item.title">
                        <!-- <ImageLoader :src="item.thumb"
                            placeholder="data:image/webp;base64,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"
                            :alt="item.title" :title="item.title" /> -->
                    </router-link>
                </div>
                <div class="right-text">
                    <router-link :to="{
                        name: 'xiangqingWenzhang',
                        params: {
                            fenleiID: item.category.id
                        }
                    }">{{ item.title }}</router-link>
                    <div class="numbs">
                        <span>随机-发布日期：{{ item.createDate }}</span>
                        <span>随机-浏览：{{ item.scanNumber }}</span>
                        <span>随机-评论：{{ item.commentNumber }}</span>
                        <!-- <span>{{ item }}</span> -->
                        <router-link :to="{
                            name: 'mouGeWenzhang',
                            params: {
                                mouGeID: item.category.id //意思是把动态的mouGeID根据当前路由item信息的id放进去，那么就现实跳转了
                            }
                        }">{{ item.category.name }}</router-link>
                    </div>
                    <p class="wenben">{{ item.description }}</p>
                </div>
            </li>

            <!-- 底部分页 -->
            <div class="dibu">
                <div v-if="datas.total" class="dixian">不要得寸进尺，我是有底线的</div>
                <Pagin v-if="datas.total" :current="routerInfo.page" :total="datas.total" :limit="routerInfo.limit"
                    :visibleNumber="10" @pageClicked="handChangePage" />
                <!-- 
                current 含义：当前样式页码
                total 含义：总数据量
                limit 含义：页容量[每页显示多少条数据]
                visibleNumber 含义：当前可见页码数
            -->
                <!-- <h1>{{ datas.total }}||{{ datas.limit }}</h1> -->
            </div>
        </ul>
        <!-- 无数据显示该组件 kongComp -->
        <kongComp v-if="!datas.rows && !isLoading"></kongComp>
    </div>
</template>

<script>
// getYuanChengData
import ImageLoader from '@/components/ImageLoader'
import Pagin from '@/components/Pagin'//底部页码
import getFetchData from '@/mixins/getFetchData.js'//远程获取数据
import { getWenzhangDatas } from '@/api/Wenzhang.js'//获取之前博客的数据
import mainScroll from '@/mixins/mainScroll.js'// 主区域滚动-写入混合
// import imgLoading from '@/assets/imgLoading.gif' // 动态加载图

import kongComp from "@/components/Empty" // 无数据 显示这个组件
export default {
    data() {
        return {
            // imgLoading: imgLoading,
        }
    },
    mixins: [getFetchData({ total: 0, rows: [] }), mainScroll("containerTop")],
    components: {
        Pagin,
        ImageLoader,
        kongComp,//空组件
    },

    // 【有了混入之后可以不写】都交给 mainScroll("containerTop")
    // mounted() {//安装后
    //     this.$bus.$on('setMainScroll', this.setTopScroll)
    //     this.$refs.containerTop.addEventListener('scroll', this.containerScroll)
    // },
    // destroyed() {//销毁后
    //     this.$bus.$emit('scroll_event')
    //     this.$bus.$off('setMainScroll', this.setTopScroll)
    //     this.$refs.containerTop.removeEventListener('scroll', this.containerScroll)
    // },

    computed: {
        // 通过计算属性拿 路由地址的信息
        routerInfo() {
            // console.log(this.$route, '路由地址的信息');
            // 拿到当前分页ID
            let mouGeID_cate = +this.$route.params.mouGeID || -1;//-1表示全部
            let page = +this.$route.query.page || 1;//默认第1页
            let limit = +this.$route.query.limit || 10;//默认10条数据
            // console.log(mouGeID, page, limit, 'mouGeID-page-limit');
            return {
                mouGeID_cate,
                page,
                limit
            }
        }
    },
    methods: {
        // 【有了混入之后可以不写】都交给 mainScroll("containerTop")
        // 滚动主区域
        // containerScroll() {
        //     // console.log('滚动主区域top', this.$refs.containerTop.scrollTop);
        //     this.$bus.$emit('scroll_event', this.$refs.containerTop);//触发scroll_event事件，拿到此时的盒子
        // },
        // setTopScroll(scrollTop) {
        //     this.$refs.containerTop.scrollTop = scrollTop
        //     // console.log('this.$refs.containerTop.scrollTop', this.$refs.containerTop.scrollTop);
        // },

        handChangePage(newPage) {
            // console.log("新的页码", newPage);
            let query = {
                page: newPage,
                limit: this.routerInfo.limit
            }
            // 跳转到 当前的分类 当前的页容量 newPage的页码
            //两种情况，没有cate分类，有cate分类
            if (this.routerInfo.mouGeID_cate === -1) {
                // 没有cate分类
                // `/Yong-wenzhang/?page=${newPage}&limit=${this.routerInfo.limit}`
                this.$router.push({
                    name: 'wenzhang',
                    query,
                })
            } else {
                // 有care分类，需要重新拿到新的分类ID
                this.$router.push({
                    name: 'mouGeWenzhang',
                    query,
                    params: {
                        mouGeID: this.routerInfo.mouGeID_cate
                    }
                })
            }
        },

        // 根据上面的计算属性拿到当前路由信息并放在 getWenzhangDatas获取信息函数这里
        async getYuanChengData() {
            //这里需要传递参数，第几页，多少内容，当前分类
            let result = await getWenzhangDatas(
                this.routerInfo.page,
                this.routerInfo.limit,
                this.routerInfo.mouGeID_cate,
            );
            // console.log(result.data, 'result-result-當前列表信息');
            return result.data
        },
    },
    watch: {
        // 观看$route路由 变化就重新调用函数
        async $route() {
            // 这里给一个loading效果
            this.isLoading = true

            // 把盒子滾動高度设置0，让第一个li在显示【也是比较合理的操作】
            // console.log(this.$refs.containerTop.scrollTo, 'this.$refs.container.scrollTo');
            this.$refs.containerTop.scrollTop = 0;
            // 【或者下面這種平滑效果】
            // this.$refs.containerTop.scrollTo({
            //     top: 0,
            //     left: 0,
            //     behavior: 'smooth'//平滑效果
            // })


            this.datas = await this.getYuanChengData()
            this.isLoading = false

        }
    }
}
</script>

<style scoped lang="less">
@import '~@/style/var.less';

.wenzhang-container {
    height: 100%;
    overflow-y: auto;
    scroll-behavior: smooth; //動畫平滑效果
    // background-color: aquamarine;

    &::-webkit-scrollbar {
        // display: none; //销毁滚动条
    }

    .ul-container {
        position: relative;
        height: 100%;
        width: 100%;
        padding: 0px 20px;

        li {
            border-bottom: 1px solid @gray;
            margin-top: 25px;
            padding-bottom: 25px;
            // height: 100%;
            display: flex;

            .left-img {
                max-width: 200px;
                // height: 100%;
                max-height: 150px;
                // border: 1px solid black;
                border-radius: 10px;
                // box-shadow: 0 1px 2px #000;
                overflow: hidden;
                margin-right: 15px;
                white-space: normal;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }

            .right-text {
                // flex: 1;
                width: 100%;
                // background-color: aquamarine;
                white-space: wrap; //文本会换行，
                display: flex;
                flex-direction: column;
                // justify-content: space-around;

                a {
                    color: #000;
                    font-size: 20px;
                    font-weight: bold;
                    padding: 8px 0;

                    &:hover {
                        color: @hover;
                    }
                }

                .numbs {
                    font-size: 13px;
                    color: #aaaaaa;
                    width: 100%;
                    // background-color: orange;

                    span {
                        margin-right: 20px;
                    }

                    a {
                        color: @f40;
                        float: right;
                        font-size: 15px;
                        font-weight: bold;

                        &:hover {
                            color: @hover;
                        }
                    }

                }

                p {
                    font-size: 15px;
                    margin-top: 20px;
                    // text-indent: 3ch; //缩进字符
                }
            }
        }

        .dibu {

            .dixian {
                text-align: center;
                font-size: 13px;
                margin-top: 20px;
                color: #ccc;
            }
        }
    }


}
</style>