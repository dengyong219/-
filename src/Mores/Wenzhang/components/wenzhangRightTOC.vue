<template>
    <div class="wenzhangright-toc-container">
        <h2>分类{{ dangqianUrl }}&nbsp;目录</h2>
        <!-- <rightList :lists="lists" @chuandiData="handClick" /> -->
        <!-- 绑定 tocDaiYou_isStyle计算属性 -->
        <rightList :lists="tocDaiYou_isStyle" @chuandiData="handClick" />
    </div>
</template>

<script>
import rightList from './rightList.vue'
import { handFangDou } from '@/methods';
export default {
    components: {
        rightList,
    },
    props: {
        lists: {
            type: Array,
        }
    },
    data() {
        return {
            // 【写一个方法setTrueAnchor() 只要调用这个方法,那么 isStyleAnchor 就得到正确值】
            isStyleAnchor: ''//只要控制这个，那么选中效果就被控制
        }
    },
    computed: {
        dangqianUrl() {
            return this.$route.params.fenleiID
        },

        /**
         * @tocDaiYou_isStyle 【根据list属性以及 isStyleAnchor 得到带有isStyle的属性的list数组【现在就是把带有isStyle的lists的数组映射一个新数组】】
         */
        tocDaiYou_isStyle() {
            // 必会用到递归
            // 映射lists
            const getTOC = (toc = []) => {//你给我一个toc，我返回一个新的对象给你且带有新的属性
                return toc.map(item => ({
                    ...item,//把原来的对象展开
                    isStyle: item.anchor === this.isStyleAnchor,//添加新属性isStyle【当前的类是否 等于 this.isStyleAnchor】
                    children: getTOC(item.children)//对item的子目录同样操作。有children就继续递归，因为children可以是undefined，所以默认值 []
                }))//解释上面代码【你给我一个数组，我把这个数组变成一个新的对象，且我自己又加了一些属性】
            }
            return getTOC(this.lists)
        },
        // 根据lists得到对应的元素数组，我们要分析元素的位置
        doms() {
            // 需要一个空数组
            const doms = [];
            const addTocDoms = (list) => {
                for (const item of list) {
                    // console.log('拿到循环的每一个类然后放到doms，也就相当于拿到了它们的元素===》', document.getElementById(item.anchor));

                    // doms.push(document.querySelector(`#${item.anchor}`))//根据自身H元素id把所有元素放到doms数组
                    doms.push(document.getElementById(item.anchor))

                    // 需要递归自己的孩子
                    if (item.children && item.children.length) {
                        addTocDoms(item.children)
                    }
                }
            }
            addTocDoms(this.lists)
            return doms; //返回真实dom到数组中
        }
    },

    // 钩子函数
    created() {
        this.newSetTrueAnchor = handFangDou(this.setTrueAnchor, 30)//30表示延迟多少豪秒
        // window.setTrueAnchor = this.setTrueAnchor
        // 创建后监听事件
        this.$bus.$on('scroll_event', this.newSetTrueAnchor)
        // console.log('当前的路由地址：', this.$route.params.fenleiID);
    },
    destroyed() {
        this.$bus.$off('scroll_event', this.newSetTrueAnchor)
    },

    methods: {
        handClick(item) {
            // console.log('点击了Right==>', item);
            location.hash = item.anchor
        },

        // 设置 isStyleAnchor 为正确的值
        setTrueAnchor(scrollDom) {
            if (!scrollDom) return  //如果没有主区域的dom元素，直接返回
            // console.log('滚动scrollDom-=-函数防抖-=-handFangDou');
            this.isStyleAnchor = '';//每次调用前都把样式清空

            // 假设弄一个h元素的高度
            const domH = 80;

            for (const dom of this.doms) {
                // dom.style.backgroundColor = "#f40"
                // console.log('当前dom===》', dom);
                if (!dom) {
                    continue;
                }
                // 拿到每一个dom元素离视口顶边距离
                const domTop = dom.getBoundingClientRect().top
                // console.log(domTop, 'domTop-=-domTop-=-domTop-==-domTop');

                if (domTop >= 0 && domTop <= domH) {
                    // console.log(domTop, 'domTop2222222222');
                    // 在规定范围中，则显示isStyle
                    this.isStyleAnchor = dom.id;//把当前的dom元素id赋值
                    return;
                } else if (domTop > domH) {
                    // 在规定范围下
                    return;
                } else {
                    // 在规定范围上，则显示isStyle
                    this.isStyleAnchor = dom.id;//假设激活，碰到下面需要激活在重新赋值激活
                }
            }
        }
    },
}
</script>

<style scoped lang="less">
.wenzhangright-toc-container {
    // background-color: rgb(83, 83, 83);
    height: 100%;
    overflow-y: auto;
    overflow-x: none;
    position: relative;

    &::-webkit-scrollbar {
        display: none;
    }

    h2 {
        // background-color: red;
        padding-bottom: 5px;
        border-bottom: 2px solid #ddd;
        text-align: center;
        color: #0000009d;
    }
}
</style>