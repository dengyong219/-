<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="default">
      <slot></slot>
      <!-- <button @click="anniu">按钮</button> -->
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // sayHello
    }
  },
  methods: {
    anniu() {
      // this.$sayHello()
    }
  }
};
</script>

<style scoped lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  display: flex;
  // background: orange;

  .left,
  .right {
    flex: 0 0 auto; //不能增长不能压缩，保持宽度
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .default {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 auto; //可以增长可以压缩，保持宽度
  }
}
</style>