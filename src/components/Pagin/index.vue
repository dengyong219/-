<template>
  <!-- 总页数>=1才有意义 -->
  <div class="Pagin-continer" v-if="totalNumber > 1">
    <a @click="hanOnclick(1)" :class="{ show: current === 1 }">|&lt;&lt; </a>
    <a @click="hanOnclick(current - 1)" :class="{ show: current === 1 }">&lt;&lt;
    </a>
    <!-- 显示中间数字 -->
    <a @click="hanOnclick(item)" v-for="(item, index) in numbers" :class="{ active: item === current }" :key="index">{{
      item }}</a>
    <a @click="hanOnclick(current + 1)" :class="{ show: current === totalNumber }">&gt;&gt;</a>
    <a @click="hanOnclick(totalNumber)" :class="{ show: current === totalNumber }">&gt;&gt;|</a>
    <!-- <h1>{{ showNumberMin }}</h1>
      <h2>{{ showNumberMax }}</h2> -->
  </div>
</template>

<script>
export default {
  props: {
    // 含义：当前样式页码
    current: {
      type: Number,
      default: 1,
    },
    // 含义：总数据量
    total: {
      type: Number,
      //这个不是总页数，而是 总数据量[列:我有1千条数据,除非我每页1条数据才是一千页]
      default: 0,
    },
    // 含义：页容量[每页显示多少条数据]
    limit: {
      type: Number,
      default: 10,
    },
    // 含义：当前可见页码数
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    // 总页数
    totalNumber() {
      // 问题来了，当总页数大于1才有意义，才会显示页码
      return Math.ceil(this.total / this.limit);
    },
    // 虚拟可见页码
    numbers() {
      // 根据可视最小值--可视最大值进行for循环
      let arr = [];
      for (let i = this.showNumberMin; i <= this.showNumberMax; i++) {
        arr.push(i);
      }
      return arr;
    },
    // 可视区域显示最小值
    showNumberMin() {
      // 最小值=当前样式页码 - 当前可视页数/2
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) min = 1;
      return min;
    },
    showNumberMax() {
      // 最大值=最小值+当前可见页码数-1
      let max = this.showNumberMin + this.visibleNumber - 1;
      if (max > this.totalNumber) {
        // 当前最大值大于总容量的话就把当前最大值赋值为总容量
        max = this.totalNumber;
      }
      return max;
    },
  },
  methods: {
    // 处理 子组件抛出事件给父组件
    hanOnclick(newNumber) {
      // console.log(newNumber);
      if (newNumber < 1) {
        newNumber = 1;
      }
      if (newNumber > this.totalNumber) {
        newNumber = this.totalNumber;
      }
      if (newNumber === this.current) {
        return;
      }
      // 抛出事件
      this.$emit("pageClicked", newNumber);
    },
  },
};
</script>

<style lang="less">
@import "~@/style/var.less";

.Pagin-continer {
  display: flex;
  justify-content: center;
  padding: 15px 0;

  a {
    cursor: pointer;
    color: #63cbdd;
    padding: 5px 15px;
    outline: 1px solid @gray;
    border-radius: 5px;
    box-shadow: 0px 1px 2px @gray;
    margin: 0px 2px;

    &.show {
      color: @lightWords;
      cursor: not-allowed;
    }

    &.active {
      color: orange;
      font-size: 20px;
      font-weight: bold;
      cursor: text;
    }
  }
}
</style>