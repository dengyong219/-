<template>
    <div class="loading-container">
        <img :src="loading" alt="">
    </div>
</template>

<script>
import loading from '@/assets/loading.svg';

export default {
    data() {
        return {
            loading,
        }
    }
}
</script>

<style scoped lang="less">
@import "~@/style/var.less";

.loading-container {
    .tranJuzhong();

    img {
        width: 100%;
        height: 100%;
    }
}
</style>