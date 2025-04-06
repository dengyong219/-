<template>
  <div>
    <!-- 传输数据需要绑定 v-bind 简写 ：-->
    <img :src="touUrl" class="Touxiang-container" :style="{
      width: size + 'px',
      height: size + 'px',
    }" alt="" />
  </div>
</template>

<script>
import tx from '@/images/tx.png'
export default {
  // 因为要传输数据，所以props
  props: {
    // touUrl: String,    // 表示只能写 字符串类型
    touUrl: {
      type: String, // 表示只能写 字符串类型
      // required: true, // 表示必须传输数据
      default: tx,//默认头像
    },
    size: {
      width: Number,
      default: 160,
    },
  },
};
</script>

<style scoped>
/* 带有作用域的样式 */
.Touxiang-container {
  /* border: 2px solid red; */
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>