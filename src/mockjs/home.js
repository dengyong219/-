import Mock from 'mockjs'
import haiyue from '@/images/haiyue.jpg'
import haiyue2 from '@/images/haiyue2.jpg'

import libai from '@/images/libai.jpg'
import libai2 from '@/images/libai2.jpg'

import zhugeliang from '@/images/zhugeliang.jpg'
import zhugeliang2 from '@/images/zhugeliang2.jpg'
Mock.mock('/api/banner', 'get', {
    "code": 0, // 错误码
    "msg": "", // 错误消息
    "data": [

        {
            id: "1",
            midImg: libai2,
            // bigImg: "https://lcmimage.ecology.smoba.qq.com/public/63658915783b55967b68b22c9d30d147.jpg?sign=1729324636-lUI3C4-0-314e61db7b4800bcc8cc3037605acf64&imageMogr2/strip/format/webp/quality/80!",
            bigImg: libai,
            title: "诗剑行-李白",
            description: "李白，字太白，号青莲居士，他既是后世所誉“诗仙”，也是少年即仗剑远游的侠客。",
            suiji: Mock.Random.cparagraph(1, 3),
        },
        {
            id: "2",
            midImg: haiyue2,
            //  bigImg: "https://lcmimage.ecology.smoba.qq.com/public/c299aafb2641381676cc3ff365c28b7a.jpg?sign=1729503163-7pfaLr-0-53e5d17161b0c8290268940c6a84619c&imageMogr2/strip/format/webp/quality/80!",
            bigImg: haiyue,//需要导入才能使用，要是直接复制地址过段事件会undefined
            title: "永夜之心-海月",
            description: "海月是最古老的月裔之一，也是神秘莫测的云中蝶的饲养人。",
            suiji: Mock.Random.cparagraph(1, 3),
        },
        {
            id: "3",
            midImg: zhugeliang2,
            // bigImg: "https://lcmimage.ecology.smoba.qq.com/public/7cb6bbd6cefc71c79ea046edb5d90c67.jpg?sign=1729325070-wYJEjM-0-3fe865ec2ed05e0f2e596a3f9683c510&imageMogr2/strip/format/webp/quality/80!",
            bigImg: zhugeliang,
            title: "苍灵仙君-诸葛亮",
            description: "稷下学院有史以来最伟大的天才，世间公认夫子的继承者。",
            suiji: Mock.Random.cparagraph(1, 3),
        },
    ] // 具体的消息内容，如果code不为0，则必为null
})