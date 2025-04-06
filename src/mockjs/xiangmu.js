import Mock from "mockjs"
const data = []
Mock.mock("/api/project", "get", {
    code: 0,
    msg: "",
    // data,
    "data|10-25": [
        {
            id: "@uuid",
            name: "@ctitle",
            "url|1": ["@url", null],
            "github|1": ["https://github.com/dengyongGitHub", null],//github地址
            "description|1-3": ["@cparagraph(1,5)"],//项目的描述【1-3条】
            thumb: "@image(300x250, @color, #fff, @natural)",//项目的缩略图
            "order|+1": 0,//项目排序
        }
    ]
})