<template>
  <div class="test-container">
    <SiteAside />
  </div>
</template>

<script>
import SiteAside from "./";
export default {
  components: {
    SiteAside,
  },
};
</script>

<style scoped lang="less">
@import "~@/style/all.less";

.test-container {
  width: 250px;
  height: 550px;
  overflow-x: hidden;
  overflow-y: auto;
  margin: 0 auto;
  background-color: @dark;
  border: 2px solid blueviolet;
}
</style>