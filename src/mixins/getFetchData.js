
// 在自己的组件中，在写一个 getYuanChengData 方法
/**
 * 列如：
 * async getYuanChengData(){
 *  return await this.你要拿的数据的函数('记得看有没有参数')
 * }
 */

// 公共的远程数据
/**
 * 
 * @param {*} defaultDateValue 默认值是null，可按需求传递
 */
export default function (defaultDateValue = null) {
    return {
        data() {
            return {
                isLoading: true,//设置开始是否加载loading为true
                datas: defaultDateValue, //拿到数据
            }
        },
        // 在混入的时候写了create之后，那么在外的组件就无需再写了
        async created() {
            try {
                // console.log('等待结束了，可以拿到数据了111', this);
                // 创建后，拿到远程数据放data，到时候用数据是用datas
                this.datas = await this.getYuanChengData()
                // 拿到数据后把isLoading设置false
                this.isLoading = false

                // console.log('等待结束了，可以拿到数据了222', this);
            } catch (error) {
                console.log('【错误啦===>：】', error);
            }
        },
    }
}