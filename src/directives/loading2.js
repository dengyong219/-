// 导出指令的配置对象
// export default {
//     // 指令配置对象【其实就是配置一些钩子函数】
//     bind(el, binding) {
//         console.log('指令第一次绑定到元素时调用-bind：', el, binding);
//     },
//     update(el, binding) {
//         console.log('所在组件的VNode已更新-update：', el, binding);

//     }
// }

import loadingUrl from '@/assets/pinglunLoading.svg';
import style from './loading.module.less';

// 判断el中是否带有loading的图片
function ifLoadingImg(el) {
    return el.querySelector('img[data-load=loading]')
}

// 创建图片
function createLoadingImg() {
    const img = document.createElement('img')
    img.dataset.load = 'loading'
    img.src = loadingUrl
    img.className = style.loading
    return img
}

export default function (el, binding) {
    // 根据binding.value值，创建img/删除img
    // 拿到img
    const retImg = ifLoadingImg(el)
    if (binding.value) {
        // 判断一开始没有img元素就创建img元素
        if (!retImg) {
            const img = createLoadingImg()
            el.appendChild(img)
            // console.log('创建img', img);
        }
    } else {
        if (retImg) {
            // retImg.remove()
            el.removeChild(retImg)
            // console.log('删除img');

        }
    }
}