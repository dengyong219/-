const height = 100
const time = 500
const map = new WeakMap()

const ob = new IntersectionObserver(entries => {
    // 观察器-=-元素离开视口
    for (const item of entries) {
        console.log(item, "观察元素item");
        if (item.isIntersecting) {
            // 出现在视口内、播放动画
            const animation = map.get(item.target);
            animation && animation()
            ob.unobserve(item.target)
        }
    }
})

function isBelowViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top > window.innerHeight
}
export default {
    mounted(el) {//元素挂载后
        if (!isBelowViewport(el)) { return }
        /*
            关键帧 @keyframes
            动画配置 animation
        */
        const animation = el.animate([
            {
                transform: `translateY(${height}px)`,
                opacity: 0.5
            }, {
                transform: `translateY(0px)`,
                opacity: 1
            }
        ], {
            duration: time,
            easeing: 'ease-out',
            fill: 'forwards',
        })
        animation.pause()
        map.set(el, animation)
        ob.observe(el)//观察这元素
    },
    // 元素卸载后
    unmounted(el) {
        ob.unobserve(el)//元素卸载后无需观察了
    }
}