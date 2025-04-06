// 处理主滚动条的位置
export default function (domScroll) {
    return {
        mounted() {//安装后
            this.$bus.$on('setMainScroll', this.setTopScroll)
            this.$refs[domScroll].addEventListener('scroll', this.containerScroll)
        },
        beforeDestroy() {//销毁前
            this.$bus.$emit('scroll_event')
            this.$bus.$off('setMainScroll', this.setTopScroll)
            this.$refs[domScroll].removeEventListener('scroll', this.containerScroll)
        },
        methods: {
            setTopScroll(scrollTop) {
                this.$refs[domScroll].scrollTop = scrollTop
            },
            // 滚动主区域
            containerScroll() {
                this.$bus.$emit('scroll_event', this.$refs[domScroll]);//触发scroll_event事件，拿到此时的盒子
            },
        }
    }
}