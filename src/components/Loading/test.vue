<template>
    <div style="position: relative">
        <loading v-if="loading"></loading>
        <button @click="loading = !loading">显示/隐藏</button>
    </div>
</template>

<script>
import loading from './index.vue'
export default {
    components: {
        loading,
    },
    data() {
        return {
            loading: true,
        }
    }
}
</script>

<style></style>