<template>
  <div class="test-container">
    <Menu />
  </div>
</template>

<script>
import Menu from "./";
export default {
  components: {
    Menu,
  },
};
</script>

<style scoped lang="less">
@import "~@/style/all.less";
.test-container {
  width: 300px;
  height: 500px;
  color: #fff;
  margin: 0 auto;
  background-color: @dark;
}
</style>