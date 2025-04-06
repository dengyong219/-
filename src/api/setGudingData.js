import xiangtong from "./xiangtong"

// 全局设置
export async function setGudingData() {
    return await xiangtong.get("/api/setting")
}