<!-- 
 index ：组件负责呈现整体效果
 Lunbotu ：组件负责呈现单张轮播图
  -->
<template>
    <div v-loading="loading" class="home-container" ref="container" @wheel="hanWheel">
        <ul @transitionend="retTransitionEnd" class="ulImg-container" :style="{
            marginTop
        }">
            <!-- 循环图片 -->
            <li v-for="item in data" :key="item.id">
                <Lunbotu :getData="item"></Lunbotu>
            </li>
        </ul>
        <!-- 上箭头 -->
        <div @click="qiehuan(index - 1)" class="icon shangjiantou" v-show="index >= 1">
            <Icon class="animate__animated animate__shakeY " type="shangjiantou"></Icon>
        </div>
        <!-- 下箭头 -->
        <div @click="qiehuan(index + 1)" class="icon xiajiantou" v-show="index < data.length - 1">
            <Icon class="animate__animated animate__shakeY " type="xiajiantou"></Icon>
        </div>
        <!-- 循环右边按钮 -->
        <ul class="btns">
            <li :class="{
                active: index === i
            }" @click="qiehuan(i)" v-for="(item, i) in data" :key="item.id"></li>
        </ul>
        <!-- <Loading v-if="isLoading" /> -->
    </div>
</template>

<style scoped lang="less">
@import '~@/style/var.less';

.home-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    // 测试
    // width: 60%;
    // height: 50%;
    // border: 2px solid red;
    // overflow: visible;
    // margin: 100px auto;

    .ulImg-container {
        width: 100%;
        height: 100%;
        transition: .5s;
        // transform: translateY(-932px*1);

        li {
            width: 100%;
            height: 100%;
        }
    }

    // 右侧按钮
    .btns {
        position: absolute;
        right: 0px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 999;

        li {
            // box-shadow: 0 0 4px red;
            width: 20px;
            height: 20px;
            transform: rotate(45deg);
            border-radius: 2px;
            // outline: 1px solid #fff;
            margin: 15px 20px;
            cursor: pointer;
            box-shadow: 0 0 3px gray;
            outline: 2px solid #ffffff81;

            &.active {
                // background-color: @primary;
                background: linear-gradient(to right, rgb(101, 78, 163), rgb(234, 175, 200));

                // background: rgb(76, 0, 255);
                box-shadow: 0 0 5px #fff;
                outline: none;
            }
        }
    }

    // 上下箭头
    .icon {
        .tranJuzhong();
        transform: translateX(-50%);
        font-size: 30px;
        color: rgba(210, 210, 210, 0.245);
        text-shadow: 1px 0 1px #fff, -1px 0 0px #000000,
            0px 1px 0px #2c2c2c;
        cursor: pointer;
        @gap: 15px;

        &.shangjiantou {
            top: @gap;
            animation: aniUp 2s infinite;
        }

        &.xiajiantou {
            top: auto;
            bottom: @gap;
            animation: aniDown 2s infinite;
        }
    }

    // 动画
    @keyframes aniUp {
        0% {
            transform: translate(50%, 10px);
        }

        50% {
            transform: translate(50%, -10px);
        }

        100% {
            transform: translate(50%, 10px);
        }
    }

    // 动画
    @keyframes aniDown {
        0% {
            transform: translate(50%, -10px);
        }

        50% {
            transform: translate(50%, 10px);
        }

        100% {
            transform: translate(50%, -10px);
        }
    }
}
</style>
<script>
// 因为 getHome 是export default{} 直接导出的，所以要加{}，表示默认导出
import { getHome } from '@/api/Home'
import Lunbotu from './Lunbotu.vue'
import Icon from '@/components/Icon'
// import Loading from '@/components/Loading' //暂时用 自定义指令代替

// import getFetchData from '../../mixins/getFetchData';//【有了vuex这里可以不要了_这是多余代码】
import store from '../../store';
import { mapState } from "vuex"
export default {
    // mixins: [getFetchData([])],//把公共代码混入进来，要用mixin:[xxx]//【有了vuex这里可以不要了_这是多余代码】
    components: {
        Lunbotu,
        Icon,
        // Loading, //暂时用自定义指令代替
    },
    data() {
        return {
            // 什么时候开始圈圈
            // isLoading: true,//是否加载圈圈 【因为有getFetchData.js[泄漏公共代码],所以无需这个】

            // getHomes: [],//【因为有getFetchData.js[泄漏公共代码],所以无需这个】
            index: 0,//默认当前显示第几张
            liClientHeight: 0, // 拿到li的高度
            ifWheel: false, //判断是否在滚动
            countNum: 10,
        }
    },
    // 方法
    methods: {

        // 用 getYuanChengData函数拿到远程数据//【有了vuex这里可以不要了_这是多余代码】
        // async getYuanChengData() {
        //     // 因为getYuanChengDate函数是混入的，里面包含了isLoading，所以这里无需在赋值
        //     return await getHome()
        // },

        qiehuan(newIndex) {
            // 传入新的下标赋值给index
            this.index = newIndex
        },

        hanWheel(e) {
            // console.log(e.deltaY);

            if (this.ifWheel) {
                return
            }
            if (e.deltaY > this.countNum && this.index < this.data.length - 1) {
                // if (e.deltaY > this.countNum) {
                // console.log('页面向下');
                this.ifWheel = true
                this.index++;
                // if (this.index > this.getHomes.length - 1) {
                //     this.index = 0
                // }
                // console.log('当前index', this.index);


            } else if (e.deltaY < -this.countNum && this.index > 0) {
                // console.log('页面向上');
                this.ifWheel = true
                this.index--;
            }
        },

        retTransitionEnd() {
            // 滚动结束
            this.ifWheel = false
        },

        // 窗口变化处理
        resizeWind() {
            // console.log('窗口发生变化,拿到新窗口高尺寸', this.liClientHeight);
            this.liClientHeight = this.$refs.container.clientHeight
        },

    },
    // 计算
    computed: {
        marginTop() {
            return -this.index * this.liClientHeight + 'px'
            // transform: `translateY(${index}px)`
        },
        ...mapState("Home", ["data", "loading"])//拿到Home的data数据
    },
    // 创建后
    async created() {
        // 【因为有getFetchData.js[泄漏公共代码],所以无需这个】
        // this.getHomes = await getHome()
        // // console.log(this.getHomes.length - 1, this.index);
        // // 什么时候结束圈圈
        // this.isLoading = false//是否加载圈圈

        // vuex的data数据
        // console.log("一开始就加载Home数据", this.$store.state.Home);
        this.$store.dispatch("Home/await_setData")//一开始就要Home拿到
    },

    // 挂载后
    mounted() {
        // console.log(this.$refs.container.clientHeight, 'container-container-container');
        // 拿到盒子高度【能让上面计算更方便】
        this.liClientHeight = this.$refs.container.clientHeight
        window.addEventListener('resize', this.resizeWind)

    },
    // 销毁后
    destroyed() {
        // console.log('销毁后输出');
        window.removeEventListener('resize', this.resizeWind)
    }
}
</script>
