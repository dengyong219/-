<template>
  <div>
    <!-- <h1>测试Vue</h1> -->
    <Touxiang
      :size="150"
      touUrl="https://cdn.pixabay.com/photo/2023/08/25/18/40/scales-8213484_1280.jpg"
    />
    <!-- <Touxiang :size="50"
        touUrl="data:image/jpeg;base64,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" />
  
      <p>性：{{ xing }}</p>
      <p>名：{{ ming }}</p>
      <p>count被点击了 {{ count }} 次</p>
      <p>全名拼接：{{ xing + " " + ming }}</p>
      <p>全名方法调用1：{{ myName }}</p>
      <p>全名方法调用2：{{ myName }}</p>
      <p>全名方法调用3：{{ myName }}</p>
      <p>全名方法调用4：{{ myName }}</p>
      <p>全名方法调用5：{{ myName }}</p>
  
      <button @click="myName = '好名字'">点击名字换成->好名字</button> -->
  </div>
</template>
  
  <script>
// 需要导入 组件
import Touxiang from "./";

export default {
  name: "App", // 如果组件没有在注册的时候指定名字，则使用该名字
  components: {
    Touxiang,
  },

  data() {
    return {
      xing: "邓",
      ming: "泳",
      count: 0,
    };
  },
  // 计算属性
  computed: {
    myName: {
      get() {
        console.log("看我输出了几次", this);
        return this.xing + this.ming + Date.now();
      },
      set(val) {
        console.log("我在设置更改后的全名：", val);
        this.count++;
        this.xing = val[0];
        this.ming = val.substr(1);
        // this.ming=val.slice(1)
      },
    },
  },
  // 方法
  methods: {
    getName() {
      console.log(this, "多次调用多次调用多次调用多次调用多次调用");
      return this.xing + this.ming;
    },
  },
};
</script>
  
  <style></style>
  