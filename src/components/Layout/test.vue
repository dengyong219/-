<template>
  <div class="test-components">
    <Layout>
      <template #left>
        <div class="left">
          <SiteAside />
        </div>
      </template>
      <div class="default">主体内容-ssdjflkwhwehrwkjrhsjlfsdjflsjdlfsjlfj</div>
      <template v-slot:right>
        <div class="right">右侧内容,如果多出则溢出隐藏</div>
      </template>
    </Layout>
  </div>
</template>

<script>
import SiteAside from "@/components/SiteAside";
import Layout from "./";
export default {
  components: {
    Layout,
    SiteAside,
  },
};
</script>

<style scoped lang="less">
.test-components {
  width: 80%;
  height: 100%;
  border: 2px solid red;
  margin: 0 auto;
}

.left {
  //   width: 200px;
  height: 100%;
  background-color: red;
}

.default {
  width: 100%;
  height: 100%;
  background-color: pink;
}

.right {
  width: 150px;
  height: 100%;
  background-color: green;
}
</style>