import xiangtong from "./xiangtong"

// 得到留言板消息【当前页，页容量】
export async function getLiuyanban(page = 1, limit = 10) {
    return await xiangtong.get("/api/message", {
        params: {
            page,//当前页
            limit//页容量
        }
    })
}

// 提交留言板消息
export async function postLiuyanban(info) {
    return await xiangtong.post("/api/message", info)
}