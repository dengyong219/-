// const listeners = {};

import Vue from "vue";

const app = new Vue({})

// // 事件总线【这个事件总线是跨越组件的，任何模块都可用】
// export default {
//     // 监听某个事件且带处理函数【当什么什么发生你要处理什么事情】
//     $on(eventName, handler) {
//         // 如果在listeners中没有eventName属性，那么初始化一个空对象的集合
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler); //把事件处理函数给到listeners
//     },
//     // 取消某一个组件的事件监听
//     $off(eventName, handler) {
//         // 这里判断没有这个属性【没有这个属性监听个毛线，有属性我才需要监听】
//         if (!listeners[eventName]) return

//         listeners[eventName].delete(handler); //有这个属性就取消这个事件
//     },
//     // 触发事件：可以在任意组件触发事件且把事件给到事件总线【可能带有多个数据，那么用 ...args】
//     $emit(eventName, ...args) {
//         // 触发事件后会自动通知监听者

//         // 这里判断没有这个属性【没有这个属性监听个毛线，有属性我才需要监听】
//         if (!listeners[eventName]) return
//         for (const itemHandler of listeners[eventName]) {
//             itemHandler(...args)
//         }
//     }
// }
// 【以上是手写的】

/**
 *  事件名：随便你【这里写了scroll_event】
 * 含义：主区域滚动条位置变化后触发
 * 参数：滚动的元素，如果参数是 undefined 则表示元素不纯在
 * 
 * 
 * 事件名： setMainScroll
 * 含义：点击后把主区域的滚动条设置为0
 * 参数：0，表示主区域的滚动高度
 */


// 直接把事件总线放到原型链上，那么就非常方便
Vue.prototype.$bus = app//这样所有Vue实例都有了$bus

// 也可以同时导出
export default app;