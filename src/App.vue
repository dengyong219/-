<template>
  <div class="app-container">

    <Layout>
      <template #left>
        <div class="left" ref="left">
          <SiteAside />
        </div>
      </template>

      <template v-slot:default>
        <div id="test" class="default">
          <RouterView />
        </div>
      </template>
    </Layout>

    <!-- <AsyncComponent /> //测试组件，可删除 -->
    <returnTop />
  </div>
</template>

<script>
import Layout from "@/components/Layout"; //写区域
import SiteAside from "@/components/SiteAside"; //放写好的组件
import returnTop from '@/components/returnTop' // 返回顶部
import store from './store';

// 测试异步组件
// const AsyncComponent = () => {
//   return new Promise(resolve => {
//     setTimeout(async () => {
//       const newComp1 = await import("./newComp1.vue") //测试异步组件
//       resolve(newComp1)
//     }, 2000)
//   })
// }

export default {
  components: {
    Layout,
    SiteAside,
    returnTop,
    // AsyncComponent,//测试异步组件
  },
  methods: {
  },
  mounted() {
    // console.log(this.$refs.left.parentNode, 'this.$refs.left-this.$refs.left');
  },
};
</script>

<style scoped lang="less">
@import "~@/style/all.less";
@import "~@/style/var.less";

.app-container {
  .tranJuzhong(fixed);
  width: 100%;
  height: 100%;
  // background-color: rgba(76, 162, 175, 0.916);

  .left {
    width: 250px;
    // width: calc(100% + 100px);
    height: 100%;
  }

  .default {
    height: 100%;
    // background-color: red;
  }

  .right {
    width: 200px;
    height: 100%;
  }
}
</style>