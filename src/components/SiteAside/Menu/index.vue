<template>
  <div class="Menu-container">
    <RouterLink class="menuDiv" exact-active-class="" active-class="selected" :exact="item.exact"
      :to="{ name: item.name }" v-for="item in items" :key="item.addr">
      <div class="icon">
        <Icon :type="item.icon" />
      </div>
      <span class="wenben">{{ item.text }}</span>
    </RouterLink>
  </div>
</template>

<script>
// import Icon from "@/components/Icon";
import Icon from "@/components/Icon";
export default {
  components: {
    Icon,
  },
  data() {
    return {
      items: [
        {
          name: "home",
          text: "首页",
          icon: "fangzi",
          exact: true,
        },
        {
          name: "wenzhang",
          text: "文章",
          icon: "gangbi",
          exact: false, //在RouterLink组件的属性exact是否要精确匹配
        },
        {
          name: "guanyuw",
          text: "关于我",
          icon: "guanyu",
          exact: true,
        },
        {
          name: "xiangmu",
          text: "项目&效果",
          icon: "daima",
          exact: true,
        },
        {
          name: "liuyanban",
          text: "留言板",
          icon: "liuyan",
          exact: true,
        },
      ],
    };
  },
};
</script>

<style scoped lang="less">
@import "~@/style/all.less";

.Menu-container {
  padding: 20px 0px;
  width: 100%;
  height: 100%;
  // background-color: @dark;

  .wenben {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  a {
    display: flex;
    color: @lightWords;
    padding: 0px 30px;
    margin: 10px 0px;
    height: 40px;
    line-height: 40px;

    &:hover {
      color: #fff;
    }

    &.selected {
      background: linear-gradient(to right, rgb(44, 62, 80), rgb(76, 161, 175));
      color: #8fffee;
      border-radius: 50% 20% / 105% 40%;
      box-shadow: inset 0 0 5px #8ffff8c2, 0 0 2px rgba(111, 187, 197, 0.414);
    }

    .icon {
      padding-right: 10px;
    }
  }
}
</style>