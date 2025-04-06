// 导入写好的页面
// import Home from '@/Mores/Home'
// import Guanyuw from '@/Mores/Guanyuw'
// import Liuyanban from '@/Mores/Liuyanban'
// import Wenzhang from '@/Mores/Wenzhang'
// import Xiangmu from '@/Mores/Xiangmu'
// import mainXiangqingWenzhang from '@/Mores/Wenzhang/mainXiangqingWenzhang'

// import newComp1 from "../newComp1.vue"

import this404 from "@/Mores/this404" // 没有的路径显示该组件

import "nprogress/nprogress.css" //导入横条动画 nprogress.css
import { start, done, configure } from "nprogress" // 导入 nprogress.js【start：开始, done：完毕】
// window.start = start
// window.done = done

// nprogress头部动画配置
configure({ //configure：配置
    showSpinner: false,//不显示右侧圆圈
    trickleSpeed: 200,//调整涓流/增量的频率（以毫秒为单位）
    minimum: 0.3,//更改启动时使用的最小百分比。（默认值0.08：）
})


// 等待xx秒辅助函数
function awaitTime(time) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

// 辅助函数：路径
function getPagePath(pathFun) {
    return async () => { //异步组件的函数不仅可以返回 Promise，还支持返回一个对象
        start(); //头部动画开始
        // console.log("组件开始加载-=-组件开始加载-=-组件开始加载");
        if (process.env.NODE_ENV === "development") {
            // 开发环境就等待2秒
            await awaitTime(2000) //该函数是Promise，需要await
        }
        // 生产环境就正常执行
        const asyncComp = await pathFun()//这段代码就是一个异步组件【这样的写法完全等于下面的写法】
        done();//头部动画完毕
        // console.log("组件加载完毕-=-组件加载完毕-=-组件加载完毕");
        return asyncComp //最后返回Promise resolve之后就得到需要的东西了
    }
}

export default [
    {
        name: 'home',
        path: '/',
        component: getPagePath(() => import(/*webpackChunkName:"Home"*/ "@/Mores/Home")),
        meta: {
            title: "首页"
        }
    },
    {
        name: 'guanyuw',
        path: '/dengYong-guanyuw',
        component: getPagePath(() => import(/*webpackChunkName:"Guanyuw"*/ "@/Mores/Guanyuw")),//这段代码就是一个异步组件
        meta: {
            title: "关于我"
        }
    },
    {
        name: 'liuyanban',
        path: '/dengYong-thisLiuyanban',
        component: getPagePath(() => import(/*webpackChunkName:"Liuyanban"*/"@/Mores/Liuyanban")),
        meta: {
            title: "留言板"
        }
    },
    {
        name: 'wenzhang',
        path: '/dengYong-wenzhang',
        component: getPagePath(() => import(/*webpackChunkName:"Wenzhang"*/"@/Mores/Wenzhang")),
        meta: {
            title: "文章"
        }
    },
    {
        name: 'mouGeWenzhang',
        path: '/dengYong-wenzhang/cate/:mouGeID',
        component: getPagePath(() => import(/*webpackChunkName:"mouGeWenzhang"*/"@/Mores/Wenzhang")),
        meta: {
            title: "文章"
        }
    },
    {
        name: 'xiangqingWenzhang',
        path: '/dengYong-wenzhang/:fenleiID',
        component: getPagePath(() => import(/*webpackChunkName:"xiangqingWenzhang"*/"@/Mores/Wenzhang/mainXiangqingWenzhang")),
        meta: {
            title: "文章详情"
        }
    },
    {
        name: 'xiangmu',
        path: '/dengYong-xiangmu',
        component: getPagePath(() => import(/*webpackChunkName:"xiangmu"*/"@/Mores/Xiangmu")),
        meta: {
            title: "项目"
        }
    },
    {
        name: "this404",
        path: "*",// *表示通配符，前面没有被匹配，那么一定被这个组件匹配了
        component: this404
    },
]