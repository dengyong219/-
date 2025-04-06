import xiangtong from './xiangtong';

/**
 * @getWenzhangDatas ---> 【表示获取文章列表数据】
 * @page {page}  当前页码
 * @limit {limit} 一页的容量 
 * @categoryid {categoryid} 所属分类，-1表示全部 
 */
export async function getWenzhangDatas(page = 1, limit = 10, categoryid = -1) {
    // page：第几页, limit：多少内容, categoryid：当前分类ID
    // console.log('第几页:', page, '多少数据:', limit, '分类ID:', categoryid);

    return await xiangtong.get('/api/blog', {
        // 详细配置看官网的 请求配置
        params: { //params翻译：参数
            page,
            limit,
            categoryid
        },
    })
}


/**
 * @getWenzhangTypes {getWenzhangType} 【获取文章分类 】
 * 分类就无需参数了，毕竟数量有限，除非是非常庞大数据才要分类下
 */
export async function getWenzhangTypes() {
    return await xiangtong.get('/api/blogtype')
}



/**
 * @package 获取单个博客
 * @getWenzhang 【给我一个id，我给你这个id的博客】
 * 一般来说要获取当博客那么给我一个这个博客的id即可
 */
export async function getWenzhangRightTitle(id) {
    return await xiangtong.get(`/api/blog/${id}`)
}


/**
 *  【提交评论】
 */
export async function postWenzhangPingLun(textObj) {
    return await xiangtong.post(`/api/comment`, textObj)
}

/**
 * 【分页获取评论，针对某一篇的所有评论】
 * @page 1 【当前页码，默认当前页码 1】
 * @limit 10 【默认页容量 10】
 * @blogid -1 【所属的文章 默认-1表示所有文章评论，如不是-1则是谋篇文章的评论】【又因为这个项目对于获取全部文章评论意义不大，所以要不要都无所谓】
//  * @keyword 模糊查询关键字
 */
export async function getWenzhangPingLun(blogid, page = 1, limit = 10) {
    return await xiangtong.get('/api/comment', {
        // 【这里的params指的是：xxx/xxx/?page=1&limit=10】
        params: {
            page,//当前页码
            limit,//页容量
            blogid,//所属的文章
            // keyword,//模糊查询关键字【这里用不到】
        }
    })
}