<template>
    <div ref="show_div" v-show="show" @click="topEvent" class="returntop-container">
        Top
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false
        }
    },
    mounted() {
        this.$bus.$on('scroll_event', this.returnTopEvent)
    },
    destroyed() {
        this.$bus.$off('scroll_event', this.returnTopEvent)
    },
    methods: {
        returnTopEvent(dom) {
            if (!dom) {
                this.show = false
                return;
            } //如果没有主区域的dom元素，直接返回
            // console.log(dom.scrollTop);
            this.show = dom.scrollTop >= 500
        },
        topEvent() {
            // console.log('我要回家');
            // 利用事件总线-注册事件名，参数为0，表示滚动高度
            this.$bus.$emit("setMainScroll", 0)
        },
    },
}
</script>

<style scoped lang="less">
@import "~@/style/all.less";

.returntop-container {
    position: fixed;
    bottom: 50px;
    right: 50px;
    width: 55px;
    height: 55px;
    // border-top: 20px solid transparent;
    // border-bottom: 60px solid #345b63c6;
    // border-right: 20px solid transparent;
    // border-left: 20px solid transparent;

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-weight: bold;
    font-size: 18px;
    color: #fff;
    // box-shadow: inset 1px 0px 1px #ddd,
    //     inset 0px 0px 1px #ddd,
    //     inset 0px -2px 5px #eee,
    //     -0px 1px 2px #4a9caa;
    // filter: blur(5px);
    background-color: #4893a2cf;
    transition: .2s all;
    cursor: pointer;
    z-index: 99;
    animation: ani 1.5s infinite;
    // background: url(../../images/libai.jpg) no-repeat center;


    // 动画
    @keyframes ani {
        0% {
            transform: translateY(-7px);
        }

        50% {
            transform: translateY(7px);
        }

        100% {
            transform: translateY(-7px);
        }
    }

    &:hover {
        // background-color: transparent;
        // box-shadow: inset 0px 0px 0px #ddd,
        //     inset 0px 0px 5px rgb(255, 255, 255),
        //     inset 1px 0px 5px #eee,
        //     0px 0px 3px #4b9eac;
        // box-shadow: -1px 1px 5px #050505;
        // filter: blur(1px);
    }
}
</style>