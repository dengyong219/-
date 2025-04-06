<!-- 这是测试别的东西用的 -->

<template>
  <div>
    <!-- 分数>=90，优 -->
    <!-- 分数>=70，良 -->
    <!-- 其他，加油 -->
    <!-- <h1 v-if="count >= 90">优</h1>
    <h2 v-else-if="count >= 70">良</h2>
    <h3 style="color: red" v-else>加油</h3>
    <hr /> -->
    <h1 v-show="ifShow">点击下面按钮隐藏/显示</h1>
    <button @click="ifShow = !ifShow">按~钮</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   count: 9,
      ifShow: true,
    };
  },
};
</script>
<style>
</style>