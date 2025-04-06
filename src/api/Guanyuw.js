import xiangtong from "./xiangtong"
export async function getGuanyuw() {
    return await xiangtong.get("/api/about")
}