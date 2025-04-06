<template>
    <div>
        <h1>App-Vue-组件的分页，必要会</h1>
        <Pagin :total="total" :current="current" @pageClicked="showHanReu($event)" />
    </div>
</template>

<script>
import Pagin from "./";
export default {
    data() {
        return {
            current: 1,
            total: 2000000,
        };
    },
    components: {
        Pagin,
    },
    methods: {
        showHanReu(newPage) {
            this.current = newPage;
            console.log("加载数据", newPage);
        },
    },
};
</script>

<style></style>