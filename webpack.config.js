//【再次提醒，webpack是在node环境运行的，所以我们可以进行判断 当前环境是什么模式在进行导出】

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// // 开发环境
// const dev = {}
// // 打包环境
// const prod = {}

// 判断当前环境，vue-cli已经帮我们做了
if (process.env.NODE_ENV === 'production') {
    // 打包环境

    module.exports = {
        // webpack.config.js 或 vue.config.js
        devServer: {
            allowedHosts: ['.ngrok-free.app'] // 允许所有 ngrok 子域名
        },
        // devtool: 'source-map',
        // devtool: "none",
        plugins: [
            new BundleAnalyzerPlugin({
                // analyzerMode: 'static',  // 静态模式，直接生成一个 HTML 文件进行分析
                // openAnalyzer: false,     // 禁止自动打开分析页面
                // generateStatsFile: true, // 生成 stats.json 文件
                // statsFilename: 'stats.json'  // 设置 stats 文件名
            })
        ],
        externals: {
            // 在webpack打包时，会忽略下面模块
            'vue': 'Vue',
            'vuex': 'Vuex',
            "vue-router": "VueRouter",
            axios: 'axios',
        }
    }


} else {
    // 开发环境
    module.exports = {
        devtool: 'source-map',
        // devtool: 'none',
    }
}