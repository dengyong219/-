<template>
  <div class="test-container">
    <ImageLoader @load="loadImgHan"
      src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304"
      placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100" />
  </div>
</template>

<script>
import ImageLoader from "./";
export default {
  components: {
    ImageLoader,
  },
  methods: {
    loadImgHan() {
      console.log("通知了父组件了，表示图片已加载完成");
    },
  },
};
</script>

<style scoped>
.test-container {
  margin: 0 auto;
  width: 500px;
  height: 400px;
  border: 2px solid rgb(47, 255, 0);
}
</style>