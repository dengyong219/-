// 启动文件、入口文件
// 这个文件主要就是 启动vue，渲染App这个组件，然后渲染的东西都交给App

import './mockjs'
import Vue from 'vue'
import "./style/all.less"
import App from './App.vue'
import router from './router'
import store from './store'; //vuex数据
import { showInfo } from './methods' //消息弹出
Vue.prototype.$showInfo = showInfo //消息弹出框

// 全局导入事件总线
import './eventBus'

// 全局指令
import vloading from './directives/loading'
import vloading2 from './directives/loading2'
import vlazy from './directives/lazy'
import vpingHua from './directives/pingHua'
console.log(vpingHua, "vpingHuavpingHuavpingHuavpingHuavpingHuavpingHuavpingHuavpingHua");

Vue.directive('loading', vloading)
Vue.directive('loading2', vloading2)
Vue.directive('lazy', vlazy) // 懒加载图片
Vue.directive('pingHua', vpingHua) // 平滑div
// 在 Vue 实例或单独的文件中定义指令




store.dispatch("setGudingData/await_getGudingData")//一开始就要拿到 固定数据
// store.dispatch("Home/await_setData")//一开始就要Home拿到【这个不用全局】
new Vue({
  router,//创建好的路由配置到此处
  store,//配置vuex
  render: h => h(App),
}).$mount('#app')



// 测试->全局设置
// import { setGudingData } from './api/setGudingData'
// setGudingData().then(resp => {
//   console.log(resp.data, "测试===>setGudingData");
// })


// // 测试eventBus
// import eventBus from './eventBus';

// function eventBus1(data) {
//   console.log('eventBus11', data);
// }
// function eventBus2(data) {
//   console.log('eventBus22', data);
// }
// eventBus.$on('test1', eventBus1)
// eventBus.$on('test1', eventBus2)
// eventBus.$on('test2', eventBus1)
// window.eventBus = eventBus;//把eventBus放到window
// window.eventBus1 = eventBus1;
// window.eventBus2 = eventBus2;


// // 测试eventBus2
// import eventBus2 from './eventBus2'
// function eventHandler1(data) {
//   console.log('eventHandler11', data);
// }
// function eventHandler2(data) {
//   console.log('eventHandler22', data);
// }
// eventBus2.$on('sj1', eventHandler1)
// eventBus2.$on('sj1', eventHandler2)
// eventBus2.$on('sj2', eventHandler1)

// window.eventBus2 = eventBus2
// window.eventHandler1 = eventHandler1
// window.eventHandler2 = eventHandler2


// 测试
// import * as wenzhangApi from './api/Wenzhang'
// wenzhangApi.getWenzhangRightTitle(12).then(resp => {
//   console.log(resp.data, '测试-getWenzhangRightTitle【右侧标题】');
// })
// wenzhangApi.postWenzhangPingLun({
//   nickname: "测试=>昵称",
//   content: "测试=>评论内容，纯文本",
//   blogId: '123',
// }).then(resp => {
//   console.log(resp.data, '测试-postWenzhangPingLun【评论】');
// })
// wenzhangApi.getWenzhangPingLun().then(resp => {
//   console.log(resp.data, '测试-getWenzhangPingLun【获取评论】');
// })


// wenzhangApi.getWenzhangTypes().then(resp => {
//   console.log('測試-文章分类', resp.data);
// })
// wenzhangApi.getWenzhangDatas(2, 30, 2).then(resp => {
//   console.log('測試-文章列表数据', resp.data);
// })

