import getCompDom from './getCompDom'
import Icon from '@/components/Icon';
import styles from './showInfoStyle.module.less'



/**
 * @param {object} showInfo 里面写一个对象
 * @param {String} text 弹出的消息
 * @param {String} type 消息类型 info cuowu zhengque jinggao
 * @param {Number} time 多久消失 默认两秒
 * @param {HTMLElement} container 要把消息放在那个 ref获取 容器居中
 */
// export default function (text, type = 'info', time = 1500, container) {
export default function (object = {}) {
    const text = object.text || '';
    const type = object.type || 'info';
    const time = object.time || 1500;
    const container = object.container || document.body
    // console.log(styles);
    // document.body.style.height = 100 + 'vh' //也行

    // 创建消息元素
    const div = document.createElement('div')

    // 拿到图标
    const iconDom = getCompDom(Icon, { type })

    // 给div设置样式
    const typeStyle = styles[`module-${type}`];//类型样式名
    // div.className = `${styles.module} ${typeStyle}`
    div.className = `${styles.module} ${styles[`module-${type}`]}`

    div.innerHTML = `<span class="${styles.iconStyle}">${iconDom.outerHTML}</span><div>${text}</div>`;

    //将div放到容器中
    //判断容器有没有相对定位
    if (object.container) {
        if (getComputedStyle(container).position === 'static') {
            container.style.position = 'relative'
        }
    }

    // console.log(div);
    container.appendChild(div) || document.body.appendChild(div)

    // 强行渲染一遍浏览器，让div显示先
    div.clientHeight;//强行渲染，会reflow

    // 回到正常位置
    div.style.opacity = 1
    div.style.transform = `translate(-50%,-50%)`

    // 等待多久消失
    setTimeout(() => {
        div.style.transform = `translate(-50%,-100px) scale(0)`
        div.style.opacity = 0
        div.addEventListener('transitionend', function () {
            div.remove()
            // 判断是否有回调函数，如果有，那就运行他
            object.callback && object.callback()
        }, { once: true })
    }, time)
}
