<template>
  <div>
    <!-- <Icon type="weixin" />
      <Icon type="qq" />
      <Icon type="xiajiantou" /> -->
    <div v-for="(item, i) in types" :key="i">
      <Icon :type="item" />
    </div>
  </div>
</template>
  
  <script>
import Icon, { types } from "./";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      types,
    };
  },
};
</script>
  
  <style scoped lang="less">
.iconfont {
  font-size: 26px;
}

/* 根据Icon知道该组件有 -container，所以 */
.Icon-container {
  color: red;
}
</style>