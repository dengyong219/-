<template>
  <div class="Test-container">
    <Empty />
  </div>
</template>

<script>
import Empty from "./index.vue";
export default {
  components: {
    Empty,
  },
};
</script>

<style scoped lang="less">
.Test-container {
  position: relative;
  width: 500px;
  height: 500px;
  border: 2px solid pink;
}
</style>