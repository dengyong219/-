// 事件总线需要做的事
/**
 * 提供监听某个事件的接口
 * 提供取消监听的接口
 * 触发事件的接口（可传递数据）
 * 触发事件后会自动通知监听者
 */

const listeners = {
    // 事件名: ['触发事件', '触发事件']
}
export default {
    // 监听某个事件
    $on(eventName, handler) {
        if (!listeners[eventName]) {
            listeners[eventName] = new Set(); //先初始化一个空值
        }
        // 到了下面代码一定是有这个属性的
        listeners[eventName].add(handler);//把事件处理函数放到数组里面
    },
    // 取消监听的接口
    $off(eventName, handler) {
        if (!listeners[eventName]) return
        listeners[eventName].delete(handler)
    },
    // 触发事件的接口
    $emit(handler, ...args) {
        if (!listeners[handler]) return
        // 遍历事件处理函数的数组
        for (const handlers of listeners[handler]) {
            handlers(...args);
        }
    },
}