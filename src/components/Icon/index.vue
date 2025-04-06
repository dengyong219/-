<template>
  <i class="iconfont Icon-container" :class="setIcon"></i>
</template>

<script>
const classMap = {
  fangzi: "icon-shouye",
  cuowu: "icon-cuowu",
  xiajiantou: "icon-xiangxia",
  guanyu: "icon-icon20",
  guanbi: "icon-guanbi",
  liuyan: "icon-liuyan",
  github: "icon-githublogo",
  weixin: "icon-weixin-copy",
  gangbi: "icon-blog",
  jinggao: "icon-jinggao",
  youxiang: "icon-youxiang",
  shangjiantou: "icon-een",
  daima: "icon-code",
  qq: "icon-QQ-circle-fill",
  zhengque: "icon-zhengque",
  xinxi: "icon-empty",
  info: "icon-info",
};
export const types = Object.keys(classMap);
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  computed: {
    setIcon() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "//at.alicdn.com/t/c/font_4686097_69v1t5w9iy4.css";

.iconfont {
  font-size: inherit;
  color: inherit;
}
</style>