<template>
    <form @submit.prevent="handle" id="datafrom-container" class="datafrom-container" ref="tanchuInfo">
        <div class="yonghuName">
            <div class="yonghuName-info Info">
                <input v-model="userInfo.userName" ref="input" type="text" maxlength="10" placeholder="用户昵称">
                <span>{{ userInfo.userName.length }}/10</span>
            </div>
            <div class="yonghuName-error erro">
                <!-- 你妹写昵称啊 -->
                {{ userInfo.error }}
            </div>
        </div>
        <div class="texts">
            <div class="texts-info Info">
                <textarea v-model="textInfo.text" ref="textarea" maxlength="250" placeholder="输入你想骂街的话" />
                <span>{{ textInfo.text.length }}/250</span>
            </div>
            <div class="texts-error erro">
                <!-- 你妹写发表内容啊 -->
                {{ textInfo.error }}
            </div>
        </div>
        <div class="tijiao">
            <button :disabled="isFin">
                {{ isFin ? '提交中^_^' : '提交' }}
            </button>
        </div>
    </form>
</template>

<script>

export default {
    data() {
        return {
            userInfo: {
                userName: '',
                error: '',
            },
            textInfo: {
                text: '',
                error: '',
            },
            isFin: false
        }
    },
    // props: {
    //     click: Function,
    // },
    methods: {
        handle() {
            this.userInfo.error = this.userInfo.userName ? '' : '你写昵称啊'
            this.textInfo.error = this.textInfo.text ? '' : '你写发表内容啊'

            // 有错误不能提交
            if (this.userInfo.error || this.textInfo.error) return

            // 没有错误
            this.isFin = true; //正在提交，防止重复点击

            this.$emit('submitEvent', { //提交事件
                nickname: this.userInfo.userName + "<==测试内容:this.userInfo.userName->测试名称_在XiaoxiQuyu/dataFrom.vue",
                content: this.textInfo.text + "<==测试内容:this.textInfo.text->测试评论_在XiaoxiQuyu/dataFrom.vue",
            }, (duoGeInfo) => {

                console.log('多个error信息===》', duoGeInfo);

                /**
                    * @param {object} showInfo 里面写一个对象
                    * @param {String} text 弹出的消息
                    * @param {String} type 消息类型 info cuowu zhengque jinggao
                    * @param {Number} time 多久消失 默认两秒
                    * @param {HTMLElement} container 要把消息放在那个 ref获取 容器居中
                */
                this.$showInfo({
                    text: duoGeInfo,//根据wenzhangBottonInfo组件的返回结果拿到【发出成功】信息
                    type: 'info',
                    time: 1000,
                    container: this.$refs.tanchuInfo,
                    // 【提示完成才显示消息在下面】
                    callback: () => {
                        this.userInfo.userName = ''
                        this.textInfo.text = ''
                        this.isFin = false; //正在提交，防止重复点击
                        // console.log(this.$showInfo, 'showInfo-=-=showInfo');
                    }
                })
            })

        }
    }
}
</script>

<style scoped lang="less">
@import '~@/style/all.less';

.datafrom-container {
    overflow: hidden;
    position: relative;
    height: 100%;
    // background-color: aqua !important;

    input,
    textarea {
        width: 100%;
        height: 40px;
        padding: 10px;
        outline: none;
        border: 1.5px dashed #ccc;
        border-radius: 7px;

        &:focus {
            // border: 1.5px dashed #458c9b;

            border: 1px dashed #458c9b;
            /* 设置虚线边框 */
            animation: dashedAnimation 1s linear infinite;
            /* 动画 */


            /* 动画效果 */
            @keyframes dashedAnimation {
                0% {
                    border-style: dashed;
                    border-width: 1px;
                }

                50% {
                    border-style: solid;
                    border-width: 1px;
                }

                100% {
                    border-style: dashed;
                    border-width: 1px;
                }
            }
        }
    }

    .erro {
        margin-top: 5px;
        color: @f40;
        font-size: 12px;
    }

    .Info {
        position: relative;
        color: #ccc;
        position: relative;


        span {
            position: absolute;
            bottom: 0;
            right: 0;
            padding: 5px;
            font-size: 12px;
        }
    }

    .yonghuName {
        // position: absolute;
        max-width: 30%;
        // height: 40px;
        // background-color: aqua;
        margin-bottom: 10px;
    }

    .texts {
        // width: 100%;
        // height: 100%;
        // position: absolute;

        textarea {
            width: 100%;
            min-height: 100px;
            padding: 10px;

            &::-webkit-scrollbar {
                // display: none;
                -ms-overflow-style: none;
                /* 对 IE 进行兼容处理 */
                scrollbar-width: none;
                /* 对 Firefox 进行兼容处理 */
                // width: 6px;
                // height: 10%;
                // border-radius: 5px;
                // background-color: aquamarine;
            }
        }

        .texts-info {
            span {
                padding: 10px;
            }
        }
    }

    .tijiao {
        margin-top: 10px;

        button {
            width: 80px;
            height: 30px;
            border-radius: 5px;
            font-size: 11px;
            background-color: #458c9b;
            border: none;
            color: #fff;
            cursor: pointer;

            // &:focus {
            //     //鼠标聚焦时
            //     background-color: red;
            // }
            // &:hover {
            //     background-color: #458d9b71;
            // }

            &:disabled {
                cursor: not-allowed;
                background-color: #458d9b71;
            }
        }
    }
}
</style>