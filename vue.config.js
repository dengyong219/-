
// vue.config.js设置代理 是node环境运行
module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            '/api': {
                target: 'http://test.myweb.com',//等到后端开发完就用这个接口
            },
        }
    },
    configureWebpack: require('./webpack.config.js'),//该对象将会被 webpack-merge[合并_插件] 合并入最终的 webpack 配置。【意思就是把我们自己配置的和默认配置的进行合并，最终形成webpack配置】
    publicPath: process.env.NODE_ENV === 'production' ? '/your-project-name/' : '/',

}