<template>
  <ul class="Contact-container">
    <li>
      <a target="_blank" :href="data.github">
        <div class="icon">
          <Icon type="github" />
        </div>
        <!-- github昵称 -->
        <span class="wenben" :title=data.githubName>{{ data.githubName }}</span>
      </a>
    </li>
    <li>
      <a :href="`mailto:${data.mail}`">
        <div class="icon">
          <Icon type="youxiang" />
        </div>
        <span class="youxaing wenben" :title=data.mail> {{ data.mail }}</span>
      </a>
    </li>
    <li>
      <a target="_blank"
        :href="`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`">
        <div class="icon">
          <Icon type="qq" />
        </div>
        <span class="wenben" :title=data.qq>{{ data.qq }}</span>
      </a>
      <div class="show">
        <img :src=data.qqQrCode alt="" />
      </div>
    </li>
    <li>
      <a>
        <div class="icon">
          <Icon type="weixin" />
        </div>
        <span class="wenben" :title=data.weixin>{{ data.weixin }}</span>
      </a>
      <div class="show">
        <img :src=data.weixinQrCode alt="" />
      </div>
    </li>
  </ul>
</template>

<script>
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  components: {
    Icon,
  },
  computed: {
    ...mapState("setGudingData", ["data"])
  }
};
</script>

<style scoped lang="less">
@import "~@/style/all.less";

.Contact-container {
  width: 100%;
  height: 100%;
  // background-color: @dark;
  padding: 20px 5px 20px 20px;
  @itemHeight: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  li {
    color: @gray;
    height: @itemHeight;
    line-height: 30px;
    // font-size: px;
    position: relative;
    margin: 7px 0px;
    padding: 0px 10px;

    // background-color: red;
    &:hover {
      .show {
        transform: scale(1);
      }
    }
  }

  a {
    // margin-right: 30px;
    // background-color: #fff;
    cursor: pointer;
    display: flex;

    .icon {
      width: 30px;
      font-size: 23px;
      // background-color: pink;
    }
  }

  .show {
    position: absolute;
    bottom: @itemHeight+10;
    background-color: #fff;
    padding: 10px;
    .df();
    transition: 0.3s;
    border-radius: 10px;
    transform: scaleY(0);
    transform-origin: center bottom;

    &::after {
      content: "";
      width: 10px;
      height: 10px;
      background-color: rgb(255, 255, 255);
      position: absolute;
      bottom: -5px;
      transform: rotate(45deg);
    }
  }

  img {
    width: 150px;
    height: 150px;
  }

  .youxiang {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wenben {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>