<template>
    <div ref="container" class="botton-container">
        <div class="botton-loading-container">
            <xiaoXiQuyu title="评论数" @submitEvent="handle" :subTitle="`__${datas.total}__`" :list="datas.rows"
                :isListLoading="isLoading" />
        </div>
        <div class="dibuLoading">
            <div class="loadNext" v-loading2="isSpan"></div>
            <span class="spanDibu" v-if="!isLoading">{{ isSpan ? '加载中~_~' : "~到底了~" }}</span>
        </div>
    </div>
</template>

<script>
import getFetchData from '@/mixins/getFetchData';
import xiaoXiQuyu from '@/components/XiaoxiQuyu'
import { getWenzhangPingLun, postWenzhangPingLun } from '@/api/Wenzhang'
export default {
    mixins: [getFetchData({ total: 0, rows: [] })],
    components: {
        xiaoXiQuyu,
    },
    data() {
        return {
            // 因为现在的导航栏没有办法记录页码和页容量，只能先这样记录着
            page: 1,
            limit: 10,//评论页容量
            isSpan: false,
        }
    },
    created() {
        this.$bus.$on('scroll_event', this.eventContainer)//处理滚动事件，这个方法需要接收一个dom参数
    },
    destroyed() {
        this.$bus.$off('scroll_event', this.eventContainer)
        // console.log('销毁了--=--=-==-');
    },

    mounted() {
        // console.log(this.datas, '拿到了模拟评论数据');
        window.load_PingLun_Info = this.load_PingLun_Info
    },
    computed: {
        isTrue_PingLun_Length() {
            return this.datas.rows.length >= this.datas.total
        },
    },
    methods: {
        eventContainer(dom) { //需要参数
            // console.log(dom.scrollTop, 'dom滚动了Top多少');

            if (this.isSpan || !dom) {//如果当前isSpan为true，且没有主区域的dom元素，直接返回
                // 没有更多数据
                return
            }
            const jieshou_fanwei = 50;//可接受范围
            const y = Math.abs(dom.clientHeight + dom.scrollTop - dom.scrollHeight)

            if (y <= jieshou_fanwei) {
                // console.log('到底部了，可以调用 加载评论更多数据');
                this.load_PingLun_Info()
            }

            // 返回顶部
            if (dom.scrollTop >= 500) {
                // console.log(dom.scrollTop, '我要回顶部`我要回顶部`我要回顶部`我要回顶部`我要回顶部`');
            }
        },

        async getYuanChengData() {
            const result = await getWenzhangPingLun(this.$route.params.fenleiID, this.page, this.limit)
            // console.log(result.data, '拿到评论的数据');
            // console.log(typeof result.data.rows[0].createDate, '拿到评论的时间');
            return result.data
        },
        // 加载评论更多数据
        async load_PingLun_Info() {
            // 作一个判断，如果 this.datas.rows 大于 this.datas.total，那么就不在加载
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

            this.datas.rows = [...this.datas.rows, ...result.rows]// 页容量需要在基础上在加
            // this.datas.rows = this.datas.rows.concat(result.rows)// 页容量需要在基础上在加
            this.datas.total = result.total; //从新赋值数量

            // this.isLoading = false;
            this.isSpan = false;
        },

        async handle(info, callback) {
            // console.log(info, "：昵称品论信息", callback, '：调用的函数');
            const result = await postWenzhangPingLun({
                blogId: this.$route.params.fenleiID,
                ...info,//最后在展开评论和昵称
            })
            // console.log(this.getYuanChengData(), '-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-');
            // 在评论区的第一个位置加上一条新的随机评论

            result.data.content = info.content
            result.data.nickname = info.nickname
            this.datas.rows.unshift(result.data)
            // console.log(this.datas.total, '当前评论数量-当前评论数量');
            this.datas.total++
            callback('发出成功！')
        },
    }
}
</script>

<style scoped lang="less">
.botton-container {
    position: relative;
    // background-color: pink;

    .botton-loading-container {
        position: relative;
        height: 100%;
        // background-color: orange;
    }

    .dibuLoading {
        // background-color: red;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;

        .spanDibu {
            position: relative;
            // background-color: red;
            // padding: 30px;
            width: 100%;
            text-align: center;
            display: inline-block;
            font-size: 12px;
            margin-bottom: 10px;
            color: #37717d;
            font-weight: bold;
            letter-spacing: 1px;
        }

        //旁边的圈圈
        .loadNext {
            // width: 25px;
            // height: 25px;
            // background-color: red;
            position: absolute;
            transform: translate(50px, -5px);
        }
    }


    // 返回顶部
    // .returnTop {
    //     background-color: red;
    //     width: 100%;
    //     height: 100%;
    // }
}
</style>