<template>
    <div class="xiaoxiquyu-container">
        <div class="datafrom">
            <h2>留言信息：</h2>
            <dataFrom v-on="$listeners" />
            <!-- <dataFrom /> -->
            <div class="datafrom-title">
                <h3>
                    {{ title }}
                    {{ subTitle }}
                </h3>
            </div>
        </div>
        <div class="datalist">
            <dataList :list="list" />
        </div>
        <!-- <div class="loading" v-loading="isLoading"></div> -->
        <!-- <div class="loading" v-loading="isListLoading"></div> -->
    </div>
</template>

<script>
import dataFrom from './dataFrom.vue';
import dataList from './dataList.vue';
export default {
    props: {
        // 列表标题
        title: {
            type: String,
            default: ''
        },

        // 列表副标题
        subTitle: {
            type: String,
            default: ''
        },

        // 列表数据
        list: {
            type: Array,
            default: () => [] //默认是数组
        },

        // 列表是否加载中
        isListLoading: {
            type: Boolean,
            default: false
        },
        // 【还有一个点击事件 submit:用户点击提交时触发】
    },
    components: {
        dataFrom,
        dataList,
    },
    mounted() {
        // console.log(this.list, '测试测试');

    },
    methods: {
        // 等待父组件这里处理完再返回结果给子组件【有了$listeners，就无需显示的写了】
        // handle(info, callback) {
        //     console.log('我是父组件，我接收到你发的信息了;但是我不知道怎么做，继续往上抛=》', info, callback);
        //     this.$emit('keepEvent', info, callback)
        // },
    }
} 
</script>

<style scoped lang="less">
.xiaoxiquyu-container {
    position: relative;
    height: 100%;
    // padding-bottom: 80px;

    .datafrom {
        margin-top: 10px;
        // background-color: red;

        h2 {
            color: #696969;
            margin-bottom: 5px;
        }

        .datafrom-title {
            margin-top: 30px;
            display: flex;
            align-items: center;
        }
    }

    .datalist {
        position: relative;
        margin-top: 10px;
        // background-color: red;
    }

    .loading {
        position: relative;
        height: 100%;
        transform: translateY(40px);
    }
}
</style>
