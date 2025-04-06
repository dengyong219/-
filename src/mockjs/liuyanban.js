// 王者荣耀头像
import txlibai from '@/images/tx-libai.png'
import txzhugeliang from '@/images/tx-zhugeliang.png'
import txmingshiying from '@/images/tx-mingshiying.png'
import txyixing from '@/images/tx-yixing.png'
import txjing from '@/images/tx-jing.png'
import tx from '@/images/tx.png'

import Mock from "mockjs"
import querystring from 'querystring'//专门拿地址栏参数的第三方库

// 提交品论
Mock.mock("/api/message", "post", {
    code: 0,
    msg: "",
    data: {
        id: "@guid",
        nickname: "@first",//英文昵称
        content: "随机洋文短句-> @paragraph(1,3)", //留言内容，纯文本
        // createDate: "@date('T')",//时间
        createDate: Date.now(),//时间
        "avatar|1": [
            // {
            txlibai,
            txzhugeliang,
            txmingshiying,
            txyixing,
            txjing,
            tx,
            'https://s.panlai.com/zb_users/upload/2024/10/20241028074611173007277174739.png-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111143933169968477391403.jpg-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111132808169968048827966.jpg-pcthumbs',
            'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111140253169968257360256.jpg-pcthumbs',

            // }
        ],//随机的头像地址
    }
})
// 【获取评论】
Mock.mock(/^\/api\/message\/?.+$/, 'get', function (opa) {
    // console.log('没格式化之前的opa的url', opa);
    const urlObj = querystring.parse(opa.url)
    // console.log('格式化之后的opa.url的地址', urlObj);
    return Mock.mock({
        code: 0,
        msg: "",
        data: {
            'total|10-50': 0,//总数评论
            [`rows|${urlObj.limit || 10}`]: [ //页容量默认10
                {
                    id: '@guid',
                    nickname: "@cname",
                    content: "随机洋文短句-> @paragraph(1,3)",
                    // createDate: Date.now(),
                    createDate: "@date('T')",
                    'avatar|1': [
                        // {
                        txlibai,
                        txzhugeliang,
                        txmingshiying,
                        txyixing,
                        txjing,
                        tx,
                        'https://s.panlai.com/zb_users/upload/2024/10/20241028074611173007277174739.png-pcthumbs',
                        'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111143933169968477391403.jpg-pcthumbs',
                        'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111132808169968048827966.jpg-pcthumbs',
                        'https://s.panlai.com/upload/2023/11/bizhihui_com_20231111140253169968257360256.jpg-pcthumbs',
                        // }
                    ],
                }
            ]
        }
    })
})