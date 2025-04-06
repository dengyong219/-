<template>
    <div class="wenzhang-container">
        <layout>
            <template #default>
                <div ref="default" class="default">
                    <wenzhangDatas />
                </div>
            </template>
            <template #right>
                <div class="right">
                    <wenzhangRightList />
                </div>
            </template>
        </layout>
    </div>
</template>

<script>
import layout from '@/components/Layout';
import wenzhangDatas from './components/wenzhangDatas.vue'// 中间数据
import wenzhangRightList from './components/wenzhangRightList.vue'// 右边数据
import returntop from "@/components/returnTop"; // 返回顶部
export default {
    components: {
        layout,
        wenzhangDatas,//中间数据
        wenzhangRightList,//右侧数据
        returntop,
    },
}
</script>

<style scoped lang="less">
.wenzhang-container {
    width: 100%;
    height: 100%;
    // background-color: aquamarine;
    // position: relative;

    .default {
        height: 100%;
        // background-color: rgba(255, 166, 0, 0.189);
    }

    .right {
        width: 250px;
        height: 100%;
        padding: 10px 10px 20px 10px;
        // background-color: aqua;
    }
}
</style>