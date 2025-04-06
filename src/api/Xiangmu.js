import xiangtong from "./xiangtong";
export async function getXiangmu() {
    return await xiangtong.get("/api/project")
}