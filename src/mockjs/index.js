import './home' //如果后端做好了，可以给这个注释
import './wenzhang'
import "./setGudingData"
import "./guanyuw"
import "./xiangmu"
import "./liuyanban"
import Mock from 'mockjs'
Mock.setup({
    timeout: '500-800'//模拟网络延迟
})
//目前，接口 Mock.setup( settings ) 仅用于配置 Ajax 请求，将来可能用于配置 Mock 的其他行为