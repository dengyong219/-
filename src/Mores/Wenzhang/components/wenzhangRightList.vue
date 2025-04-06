<template>
    <div class="wenzhangright-list-container" v-loading="isLoading">
        <h2 v-if="!isLoading">分类文章</h2>
        <rightList v-if="!isLoading" :lists="list" @chuandiData="handLi" />
    </div>
</template>

<script>
import rightList from './rightList.vue'
import getFetchData from '@/mixins/getFetchData'
import { getWenzhangTypes } from '@/api/Wenzhang'
export default {
    mixins: [getFetchData([])],
    components: {
        rightList
    },
    computed: {
        // 通过计算属性 直接返回拿到cate的ID
        mouGeID() {
            return +this.$route.params.mouGeID || -1
        },
        limit() {
            return this.$route.query.limit || 10;//当前页容量，默认10
        },
        list() {
            // 这个list要拿到原始数据
            // console.log(this.$route, '$route$route$route$route$route$route');
            // 计算全部分类下文章的数量
            const articleCount = this.datas.reduce(function (a, b) { return +a + +b.articleCount }, 0)

            // let count = 0;
            // this.datas.forEach(item => {
            //     count += item.articleCount
            // });
            // console.log(count, '计算全部分类下文章的数量');

            // 在重新加一个D
            const list = [
                { name: `全部:`, id: -1, articleCount: articleCount }, //意思是把这个全部作为第一项
                ...this.datas,  //之后的只需要展开即可
            ]
            // console.log(list, '每篇的信息');

            return list.map(item => ({
                ...item,
                isStyle: item.id === this.mouGeID,
                per: `共${item.articleCount}篇文章`
            }))
        },
    },
    mounted() {
        // console.log(this.$route, '开始就拿到当前路由信息');
    },
    methods: {
        async getYuanChengData() {
            const result = await getWenzhangTypes()
            // console.log(result.data, '拿到所有文章分類【參數】');
            return result.data;
        },
        // rightListClickEvent
        handLi(item) {
            // 利用$router 改变路径，使得内容也变
            // console.log(item, '==========================');

            let query = {
                page: 1,//每次都回到第一页
                limit: this.limit,//当前页容量，默认10
            }
            // 跳转到 当前的分类 当前的页容量 newPage的页码
            //两种情况，没有cate分类，有cate分类
            if (item.id === -1) {
                // 没有cate分类
                // `/Yong-wenzhang/?page=${newPage}&limit=${this.routerInfo.limit}`
                this.$router.push({//利用$router改变路由信息以及内容
                    name: 'wenzhang',
                    query,
                })
            } else {
                // 有care分类，需要重新拿到新的分类ID
                this.$router.push({
                    name: 'mouGeWenzhang',
                    query,
                    params: {
                        mouGeID: item.id
                    }
                })
            }
        }
    }
}
</script>

<style scoped lang="less">
.wenzhangright-list-container {
    // background-color: rgb(83, 83, 83);
    height: 100%;
    overflow-y: auto;
    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }

    h2 {
        // background-color: red;
        padding-bottom: 5px;
        border-bottom: 2px solid #ddd;
        text-align: center;
        color: #0000009d;
    }
}
</style>