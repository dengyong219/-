// 函数防抖
export default function (fn, time = 100) {
    let dingShi = null;//定时器
    return (...args) => { //返回一个新函数【可能有参数】
        clearTimeout(dingShi);//每次运行都先清除定时器
        dingShi = setTimeout(() => {
            fn(...args)
        }, time)
    }
}