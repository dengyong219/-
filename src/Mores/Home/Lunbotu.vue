<template>
    <div @mousemove="getMousePosition" @mouseleave="setMouseChuQu" class="lunbotu-container" ref="container">
        <div class="word">
            <h1 class="title" ref="thisTitle">{{ getData.title }}</h1>
            <div class="description" ref="thisDescription">{{ getData.description }}</div>
            <div class="suiji" ref="thissuiji"><i>随机文本：</i>{{ getData.suiji }}</div>
        </div>
        <div class="imgFu" ref="imgFu" :style="setImgPosition">
            <ImageLoader @load="
                this.showWord
                " :src="getData.bigImg" :placeholder="getData.midImg" />
        </div>
    </div>
</template>


<!-- <script src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/16327/gsap-lates-beta.min.js"></script> -->
<script>
// import "https://s3-us-west-2.amazonaws.com/s.xdpn.io/16327/gsap-lates-beta.min.js"
import ImageLoader from '@/components/ImageLoader'
export default {
    data() {
        return {
            titleWidth: 0,
            descriptionWidth: 0,
            suijiWidth: 0,


            containerSize: null,// 外城容器宽高
            imgFuSize: null, // img父容器宽高
            // 记录鼠标位置
            mouseX: 0,
            mouseY: 0,
        }
    },
    props: ['getData'],
    components: {
        ImageLoader
    },
    // 计算属性
    computed: {

        // 设置图片坐标的top，left值。给到img的父容器
        setImgPosition() {
            if (!this.containerSize || !this.imgFuSize) {
                return {}
            }
            const width = this.imgFuSize.width - this.containerSize.width
            const height = this.imgFuSize.height - this.containerSize.height
            // console.log('剩余width:', width, '剩余height:', height);

            const left = -width / this.containerSize.width * this.mouseX
            const top = -height / this.containerSize.height * this.mouseY
            // console.log(left, top, 'qqqqqqqqqqqqqqqqqqqqqqqqqq');

            return {
                transform: `translate(${left}px,${top}px)`
                // 使用left和top会有明显的卡顿
                // left: left + 'px',
                // top: top + 'px'
            }
        }
    },
    // 方法
    methods: {
        // 开始图片就是在中间
        setImgPositionJuZhong() {
            this.mouseX = this.containerSize.width / 2;
            this.mouseY = this.containerSize.height / 2;
        },

        // 鼠标移出之后回归中间
        setMouseChuQu() {
            this.mouseX = this.containerSize.width / 2;
            this.mouseY = this.containerSize.height / 2;
        },

        // 当前鼠标位置
        getMousePosition(e) {
            this.mouseX = e.clientX
            this.mouseY = e.clientY
            // console.log('mouseX:', this.mouseX, 'mouseY:', this.mouseY);

            this.mouseX = this.mouseX - this.$refs.container.getBoundingClientRect().left
            this.mouseY = this.mouseY - this.$refs.container.getBoundingClientRect().top
            // console.log(this.mouseX, this.mouseY, ' this.mouseX/Y ');

        },

        // 获取外层容器和img父容器的宽高
        getContainerOrImgSize() {
            // 外层容器宽高
            this.containerSize = {
                width: this.$refs.container.clientWidth,
                height: this.$refs.container.clientHeight,
            }
            // img父容器宽高
            this.imgFuSize = {
                width: this.$refs.imgFu.clientWidth,
                height: this.$refs.imgFu.clientHeight,
            }
            // console.log('外层容器和img父容器--宽高', this.containerSize, this.imgFuSize);
        },


        showWord2() {
            console.log('测试-测试-测试');
        },
        // 显示文字
        showWord() {
            this.$refs.thisTitle.style.opacity = 1;
            this.$refs.thisTitle.style.width = 0;
            // 强行重排
            this.$refs.thisTitle.clientWidth; // 强行重排
            this.$refs.thisTitle.style.transition = '3s';
            this.$refs.thisTitle.style.width = this.titleWidth + 'px';

            // 下排文字
            this.$refs.thisDescription.style.opacity = 1;
            this.$refs.thisDescription.style.width = 0;
            // 强行重排
            this.$refs.thisDescription.clientWidth; // 强行重排
            this.$refs.thisDescription.style.transition = '2s 1s';
            this.$refs.thisDescription.style.width = this.descriptionWidth + 'px';

            // 随机短文
            this.$refs.thissuiji.style.opacity = 1;
            this.$refs.thissuiji.style.width = 0;
            // 强行重排
            this.$refs.thissuiji.clientWidth; // 强行重排
            this.$refs.thissuiji.style.transition = '2s 2s';
            this.$refs.thissuiji.style.width = this.suijiWidth + 'px';
        },
    },
    // 挂载后
    mounted() {
        this.titleWidth = this.$refs.thisTitle.clientWidth
        this.descriptionWidth = this.$refs.thisDescription.clientWidth
        this.suijiWidth = this.$refs.thissuiji.clientWidth
        // console.log(this.suijiWidth, 'this.suijiWidth');
        // this.showWord()

        // 打印外层容器和img父容器宽高
        this.getContainerOrImgSize()
        // 窗口变化重新获取外层容器和img父容器的宽高值
        window.addEventListener('resize', this.getContainerOrImgSize)

        // 都执行完后才给图片放中间
        this.setImgPositionJuZhong()
    },
    // 销毁后
    destroyed() {
        // console.log('已销毁');
        window.removeEventListener('resize', this.getContainerOrImgSize)
    },
}
</script>

<style scoped lang="less">
@import '~@/style/var.less';

.lunbotu-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .imgFu {
        width: 115%;
        height: 115%;
        position: absolute;
        // z-index: -1;
        transition: .2s;
    }

    .word {
        color: rgb(255, 255, 255);
        text-shadow: -1px 0 0 #00000065,
            1px 0 0px #00000065,
            0 1px 0px #00000065,
            0 -1px 0px #00000065;
        position: absolute;
        z-index: 999;
        left: calc(10% - 50px);
        top: 50%;
        transform: translateY(-50%);
        letter-spacing: 3px;
        line-height: 3rem;
        font-size: 18px;

        * {
            white-space: nowrap;
            overflow: hidden;
            opacity: 0;
        }

        .suiji {
            font-size: 15px;

            i {
                opacity: 1;
                font-weight: bold;
                color: aqua;
            }
        }

    }

}
</style>