<template>
    <div class="datalist-container">
        <div v-pingHua class="datalist-pinglun" v-for="item in list" :key="item.id">
            <div class="datalist-pinglun-img">
                <touxiang :size="45" :touUrl="item.avatar" />
            </div>
            <div class="datalist-pinglun-texts">
                <div class="datalist-pinglun-textsName">
                    {{ item.nickname }}
                </div>
                <div class="datalist-pinglun-textsRiqi"> {{ zhuanhuanTime(item.createDate, true) }} </div>
                <div class="datalist-pinglun-textsText">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <!-- <span class="spanDibu" v-if="isLoading">别刷了到底了~</span> -->
    </div>
</template>

<script>
import tx from '@/images/tx.png'
import { zhuanhuanTime } from '@/zhuanhuanTime/zhuanhuanTime.js'
import touxiang from '@/components/Touxiang'
export default {
    props: {
        list: {
            type: Array,
            default: () => []
        }
    },
    mounted() {
        // console.log(this.list, '000000000000000000');
    },
    data() {
        return {
            url: tx
        }
    },
    components: {
        touxiang,
    },
    methods: {
        zhuanhuanTime,
    },
}
</script>

<style scoped lang="less">
@import '~@/style/all.less';

.datalist-container {
    position: relative;
    // background-color: orange;

    .datalist-pinglun {
        position: relative;
        margin-bottom: 10px;
        display: flex;
        padding-bottom: 10px;
        border-bottom: 1.5px solid #eaebec;



        .datalist-pinglun-texts {
            // width: 100%;
            flex: 1 1 auto;
            margin-left: 10px;
            // background-color: rgba(0, 255, 255, 0.45);

            .datalist-pinglun-textsName {
                font-weight: bold;
                font-size: 18px;
                color: #458c9b;
            }

            .datalist-pinglun-textsRiqi {
                width: 100%;
                text-align: right;
                font-size: 12px;
                margin: 5px 0;
                color: #bbbfc3;
                // background-color: rgba(255, 0, 0, 0.326);
            }

            .datalist-pinglun-textsText {
                font-size: 15px;
                // margin-top: 10px;
                letter-spacing: 2px;
            }
        }
    }

    .datalist-pinglun::last-child {
        margin-bottom: 0px;
        // background-color: red;
    }

    .spanDibu {
        position: relative;
        // background-color: red;
        padding: 30px;
        width: 100%;
        text-align: center;
        display: inline-block;
        font-size: 12px;
        margin-bottom: 10px;
        color: #ccc;
    }
}
</style>