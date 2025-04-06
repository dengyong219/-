import eventBus from '@/eventBus';
import { handFangDou } from '@/methods';// 函数防抖
import defaultImgGif from '@/assets/imgLoading.gif'

// images数组【为什么要dom，应为光有src不够，滚轮看到的要的是img元素，所以把他弄成一个对象[images在放进数组里]】
let images = [];//只控制当前页面的图片，没有就是空数组


/**
 * @param setImage(img) 【处理单张图片】
 */
function setImage(img) {
    img.dom.src = defaultImgGif;//开始的时候就先用默认图片【浏览器会自动缓存这张gif】

    // 没有被处理过写的事情
    // console.log('img-=-', img);//【[111]这里输出没有意义，因为这个setImage函数需要开始就运行，但是它是需要滚动后才运行的】
    const resultImg = img.dom.getBoundingClientRect();
    const resultImgHeight = resultImg.height || 150// 没有高度则用150
    const windowHeight = document.documentElement.clientHeight// 拿到视口高度

    // console.log('图片Top：', resultImg.top, '图片height：', -resultImgHeight, '窗口：', windowHeight);


    if (resultImg.top >= -resultImgHeight && resultImg.top <= windowHeight) {
        // 【等待真实图片加载完成】
        // const newImg = new Image(); // 重新创建新的img元素，用于代替默认gif图
        // // 【务必等待真实图片加载完才设置到真实DOM的img的src】
        // newImg.src = img.src; //全部元素加载完才设置真实Dom的img元素的src的路径
        // newImg.onload = function () {//onload【全部资源加载完成才运行】
        //     // 当真实图片加载完成后才赋值
        //     img.dom.src = img.src;//缓存真实的Img地址 [img.dom.src这里的地址是上面缓存的]
        // }

        // 【或者到了该地方就直接替换'等待gif图片'】
        img.dom.src = img.src

        // console.log('加载真实dom图片', img.dom);

        // 处理过的图片直接删了
        images = images.filter((item) => item !== img)//不相等才会保留图片，相等就不要了
    }
    // //【可以开始先缓存默认图片，那么就无需写下面这么多代码】
    // if (resultImg.top < -resultImgHeight || resultImg.top > windowHeight) {
    //     img.dom.src = defaultImgGif;
    //     console.log(img.dom, resultImg.top, resultImg.height, '不在视口范围内');
    // } else {
    //     console.log(img.dom, resultImg.top, resultImg.height, '在视口范围内');
    // }
}

/**
 * @param setImages() 函数调用后显示图片【处理多张图片】
 */
function setImages() {
    // console.log('我滚动了');
    // 因为会有多张图片，然后又要一个个看单张图片是否需要显示。所以要一个数组
    images.forEach(item => {
        setImage(item);//把每张图片处理给到 setImage() 函数
    });
}

// 监听的事件函数
function lazyScrollHand(dom) {
    // 滚动的时候不断地处理 images 的图片
    setImages();//每次滚动都调用这个函数
}

// 【测试图片每页多少个】
// setInterval(() => {
//     console.log(images);
// }, 1000)

// 每次滚动都调用 setImages()
eventBus.$on('scroll_event', handFangDou(lazyScrollHand, 50))//监听滚动事件

export default {
    // 利用生命周期函数bind_元素创建的时候放进去
    inserted(el, binding) {
        // 【添加完后记得删除，不然下一页后会累加前面的图片，且切换页面也不会删除数组】
        const img = {
            // 为什么要这么多参数，因为我们要渲染img元素，还要它的src。这才是完整的img
            dom: el,//这里dom也是绑定到img上，不会跑到img的父亲【这里的dom就是img元素】
            src: binding.value,//通过 v-lazy指令 拿到图片路径
            // 【其实 v-lazy指令 只要做这个images.push[我们只需要维护这里的数组，表示那些图片需要显示]，然后在滚动不断地出来这些图片】
        };
        images.push(img)

        // 【[222]所以在这里就需要先处理每张的单张图片，就是说开始先运行setImage函数】
        setImage(img)
    },
    unbind(el) {//跟元素解除的时候调用
        // 利用过滤_filter【我们要找 bind的dom元素 == unbind的el】
        images = images.filter(item => item.dom !== el)

        // 移除事件监听器
        eventBus.$off('scroll_event', handFangDou(lazyScrollHand, 50));
    }
}