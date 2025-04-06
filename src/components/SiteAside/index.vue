<template>
  <div class="site-aside-container">
    <template v-if="data">
      <!-- touUrl ：有默认头像，不是必须传值 -->
      <!-- <Touxiang /> -->
      <Touxiang :touUrl="data.avatar" />
      <!-- 标题 -->
      <h4>{{ data.siteTitle }}</h4>
    </template>

    <Menu />
    <Contact v-if="data" />

    <!-- ipc备案 -->
    <span class="bei" v-if="data">{{ data.icp }}</span>
  </div>
</template>

<script>
import Contact from "./Contact";
import Menu from "./Menu";
import Touxiang from "@/components/Touxiang";
// import tx from '@/images/tx.png'

import { mapState } from "vuex"
export default {
  components: {
    Contact,
    Menu,
    Touxiang,
  },
  computed: {
    ...mapState("setGudingData", ["data"])//一开始是null，因为还没加载完成，数据需要一个过程
  },
};
</script>

<style lang="less" scoped>
@import "~@/style/all.less";

.site-aside-container {
  // width: 100px;
  // background-color: red;
  width: 100%;
  height: 100%;
  padding: 30px 0;
  // background: linear-gradient(to right, rgb(15, 32, 39), rgb(49, 89, 102), rgb(44, 83, 100));
  background: linear-gradient(to right, rgb(44, 62, 80), rgba(76, 162, 175, 0.916));
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  overflow-x: hidden;
  // border-right: 1px solid rgb(40, 69, 74);

  &::-webkit-scrollbar {
    display: none;
  }

  .bei {
    color: rgb(76, 162, 175);
    // color: rgb(255, 255, 255);
    // text-shadow: -1px 0 0 #00000065,
    //   1px 0 0px #00000065,
    //   0 1px 0px #00000065,
    //   0 -1px 0px #00000065;
    text-shadow: -1px 0 0 #0000003f,
      1px 0 0 #00000065,
      0 -1px 0 #00000065,
      0 1px 0 #00000065;
    font-size: 12px;
  }

  h4 {
    color: #eeeeee;
    padding-top: 15px;
  }
}

.thisAvatar {
  width: 100%;
  height: 100%;
}
</style>