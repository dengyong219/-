<template>
    <div class="liuyanban-container" ref="liuyanbanRef">
        <div class="XiaoxiQuyu-container">
            <!-- <XiaoxiQuyu @submitEvent="handle" title="留言板" :subTitle="`__${datas.data.total}_`" :list="datas.data.rows"
            :isListLoading="isLoading" /> -->
            <XiaoxiQuyu @submitEvent="handle" title="评论数" :subTitle="`__${datas.data.total}__`" v-loading="isLoading"
                :list="datas.data.rows" />
        </div>

        <!-- 底部 -->
        <div class="dibuLoading">
            <div class="loadNext" v-loading2="isSpan"></div>
            <span class="spanDibu">{{ isSpan ? '加载中~_~' :
                "~到底了~" }}</span>
        </div>
    </div>
</template>

<script>
// 有远程数据需要用到 mixins
import getFetchData from "@/mixins/getFetchData.js" //混合 -> 拿数据
import XiaoxiQuyu from "@/components/XiaoxiQuyu"
import * as liuyanbansApi from "@/api/liuyanban.js"
import mainScroll from "@/mixins/mainScroll.js" // 混合-> 滚动条事件
export default {
    data() {
        return {
            page: 1,//当前页码
            limit: 10,//页容量
            isSpan: false,
        }
    },
    mixins: [getFetchData({
        data: {
            // total：总数据，rows：当前页的数据
            total: 0,
            rows: []
        }
    }), mainScroll("liuyanbanRef")],

    components: {
        XiaoxiQuyu,
    },

    created() {
        this.$bus.$on('scroll_event', this.eventContainer)//处理滚动事件，这个方法需要接收一个dom参数
    },
    destroyed() {
        this.$bus.$off('scroll_event', this.eventContainer)
        // console.log('销毁了--=--=-==-');
    },

    computed: {
        isTrue_PingLun_Length() {
            return this.datas.data.rows.length >= this.datas.data.total
        },
    },
    methods: {
        // 处理滚动事件
        eventContainer(dom) { //需要参数
            // console.log(dom.scrollTop, 'dom滚动了Top多少');

            if (this.isSpan || !dom) {//如果当前isSpan为true，且没有主区域的dom元素，直接返回
                // 没有更多数据
                return
            }
            const jieshou_fanwei = 50;//可接受范围
            const y = Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight)

            if (y <= jieshou_fanwei) {
                console.log('到底部了，可以调用load_PingLun_Info()函数 加载评论更多数据');
                this.load_PingLun_Info()
            }

            // 返回顶部
            if (dom.scrollTop >= 500) {
                // console.log(dom.scrollTop, '我要回顶部`我要回顶部`我要回顶部`我要回顶部`我要回顶部`');
            }
        },
        // 加载评论更多数据
        async load_PingLun_Info() {
            // 作一个判断，如果 this.datas.data.rows 大于 this.datas.total，那么就不在加载
            if (this.isTrue_PingLun_Length) {
                // console.log('已经达到最大评论数');
                // this.isLoading = false;
                this.isSpan = false;
                return
            }
            // this.isLoading = true;//设置加载动画效果
            this.isSpan = true;
            this.page++;//页码加1

            const result = await this.getYuanChengData()// 在次拿到之前的评论数据
            // console.log(result, '拿到之前数据【这个需要再次添加】');

            this.datas.data.rows = [...this.datas.data.rows, ...result.data.rows]// 页容量需要在基础上在加
            // this.datas.data.rows = this.datas.data.rows.concat(result.data.rows)// 页容量需要在基础上在加
            this.datas.total = result.total; //从新赋值数量

            // this.isLoading = false;
            this.isSpan = false;
        },

        async getYuanChengData() {
            return await liuyanbansApi.getLiuyanban(this.page, this.limit)
        },
        async handle(info, callback) {
            console.log(info, "拿到提交信息【Mores/Liiuyanban】");

            const result = await liuyanbansApi.postLiuyanban(info);
            //提交事件
            result.data.nickname = info.nickname
            result.data.content = info.content

            callback("感谢留言")
            this.datas.data.rows.unshift(result.data)
            if (this.datas.data.rows.length) {
                this.datas.data.total++
            }
            // console.log(result.data, result.data.nickname, result.data.content, "result-=-result");
        }
    }
}
</script>

<style scoped lang="less">
.liuyanban-container {
    width: 100%;
    height: 100%;
    white-space: wrap;
    overflow-y: auto;
    margin: 0 auto;
    position: relative;
    scroll-behavior: smooth;
    // margin-bottom: 20px;
    // padding-bottom: 20px;
    // background-color: rgba(0, 255, 255, 0.062);

    &::-webkit-scrollbar {
        display: none;
    }

    .XiaoxiQuyu-container {
        // height: 100%;
        width: 700px;
        margin: 0 auto;
        position: relative;
        // background-color: rgba(0, 81, 255, 0.09);
    }

    .dibuLoading {
        // background-color: rgba(255, 0, 0, 0.151);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;

        .spanDibu {
            position: relative;
            // background-color: red;
            // padding: 30px;
            // width: 100%;
            // text-align: center;
            display: inline-block;
            font-size: 12px;
            margin-bottom: 10px;
            color: #37717d;
            font-weight: bold;
            letter-spacing: 1px;
        }

        //旁边的圈圈
        .loadNext {
            // background-color: red;
            position: relative;
            transform: translate(75px, -5px);
        }
    }
}
</style>