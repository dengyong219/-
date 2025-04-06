import xiangtong from "./xiangtong";
export async function getHome() {
    const ret = await xiangtong.get('/api/banner')
    // console.log(ret, 'ret-ret-ret');
    return ret.data;
}
// getHome().then(resp => {
//     console.log(resp, "<===getHome的数据");
// })