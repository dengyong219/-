<template>
  <div class="image-loader-container">
    <img v-if="!eventShow" class="placeholder" :src="placeholder" alt="" />
    <img @load="handleLoad" :src="src" :style="{
      opacity: originOpacity,
      transition: `${duration}ms`,
    }" alt="" />
  </div>
</template>

<script>
export default {
  props: {
    // 原始图片的路径
    src: {
      type: String,
      required: true,
    },
    // 原始图片加载完成前的占位图片
    placeholder: {
      type: String,
      required: true,
    },
    //原始图片加载完成后，切换到原始图经过的毫秒数
    duration: {
      type: Number,
      default: 1500,
    },
  },
  data() {
    // 因为图片有一个 0-1的过程,所以要进行计算一下
    return {
      originLoader: false, //原图是否加载完毕
      eventShow: false, //是否所有的都可以了
    };
  },
  computed: {
    originOpacity() {
      return this.originLoader ? 1 : 0;
    },
  },
  methods: {
    handleLoad() {
      this.originLoader = true;
      // console.log("原图图片加载成功");
      setTimeout(() => {
        this.eventShow = true;
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/var.less";
@import "~@/style/all.less";

.image-loader-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  img {
    .imgDingWei();
    object-fit: cover;
  }

  //   模糊图片
  .placeholder {
    filter: blur(2vw);
  }
}
</style>