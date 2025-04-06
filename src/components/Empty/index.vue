<template>
  <div class="Empty-container">
    <Icon type="xinxi" class="iconSty" />
    <div>{{ text }}</div>
  </div>
</template>

<script>
import Icon from "../Icon";
export default {
  components: {
    Icon,
  },
  props: {
    text: {
      type: String,
      default: "无数据",
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/style/var.less";
.Empty-container {
  .tranJuzhong(); //可以传 fixed
  color: @gray;
  text-align: center;
  // border: 1px solid blue;
  .Icon-container {
    font-size: 100px;
    display: block;
    padding-bottom: 10px;
  }
}
</style>