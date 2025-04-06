// 控制标题的

let routerText = "",//控制路由标题
    webText = "";//控制网站标题
// 条件判断
function setTitle() {
    if (!routerText && !webText) {
        // 两个都没有，则网站标题设置加载中
        document.title = "拼命加载中…"
    } else if (!routerText && webText) {
        // routerText没有，webText有
        document.title = webText
    } else if (routerText && !webText) {
        // routerText有，webText没有
        document.title = routerText
    } else {
        // 两个都有，则拼接
        document.title = `${routerText}-${webText}`
    }
}


export default {
    // 控制网站标题
    setWebTitle(text) {
        webText = text;
        setTitle()//设置完毕后判断
        // console.log("methods/kongzhiTitle_网站：", text);
    },

    // 控制路由标题
    setRouterTitle(text) {
        routerText = text;
        setTitle()//设置完毕后判断
        // console.log("methods/kongzhiTitle_路由：", text);
    }
}