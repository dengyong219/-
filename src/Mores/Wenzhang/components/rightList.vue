<template>
  <ul class="rightUl-container">
    <li v-for="(item, index) in lists" :key="index">
      <span @click="handLi(item)" :class="{ active: item.isStyle }">{{ item.name }}</span>
      <!-- 后面的多少篇文章 -->
      <span @click="handLi(item)" :class="{ active: item.isStyle }" v-if="item.per" class="per">{{ item.per }}</span>
      <!-- 递归组件 -->
      <rightList @chuandiData="handLi" :lists='item.children' />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'rightList',
  props: {
    // right列表数组 [{name='xxx', isStyle=true, children:[{name:'yyy', isStyle=false, children:[]}]}]
    lists: {
      type: Array,
      default: () => [],//默认值返回数组/对象的话需要写一个函数在返回
    }
  },
  mounted() {
    // console.log(this.lists[1], '111111111-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-`');

  },
  methods: {
    handLi(item) {
      // console.log(item.isStyle, '当前item.isStyle没有值')
      if (!item.isStyle) {//只有当前没有值才会执行
        this.$emit('chuandiData', item)
      }
    },

  }
}
</script>

<style scoped lang="less">
@import '~@/style/var.less';

.rightUl-container {
  // border: 1px solid red;
  list-style: none;
  padding: 0px 10px;

  .rightUl-container {
    margin-left: 1em;
  }

  li {
    min-height: 40px;
    line-height: 40px;
    // outline: 1px solid aqua;
    // margin-top: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: .3s;

    &:hover span {
      // font-weight: bold !important;
      // transform: translateX(20px);
    }

    span {
      // color: #b2b2b2;
    }

    // text-align: center;

    .per {
      padding-left: 10px;
      color: #c2c2c2;
      font-size: 14px !important;
      // background-color: red;
      // float: right;
      padding-left: 10px;
      // padding-right: 50px;
    }

    .active {
      color: #458d9beb;
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>