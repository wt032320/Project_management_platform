<template>
  <div class="maincontent">
    <div class="head">
      <div class="head-portrait">
      </div>
      <div class="infomation">
        <span class="nickname">李小耿</span>
        <span class="sign">暂未填写</span>
        <span class="area">未知地区</span>
        <span class="footprint">该用户很神秘, 什么也没有留下</span>
      </div>
      <div class="about">
        <el-button type="warning" class="focus" size="small">关注</el-button>
        <el-button type="success" class="message" size="small">消息</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Profile',
  components: {}
})
</script>

<style lang="scss" scoped>
  .maincontent {
    width: 87%;
    height: 100%;
    background-color: pink;
    .head {
      width: 90%;
      height: 28%;
      background-color: #fff;
      margin: 2rem auto 1rem;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .head-portrait {
        width: 8rem;
        height: 8rem;
        margin-left: 1.5rem;
        border-radius: 50%;
        background-color: blue;
      }
      .infomation {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: -28rem;
        font-weight: 700;
        .nickname {
          font-size: 1.5rem;
          margin-bottom: 0.4rem;
        }
        .sign {
          color: blueviolet;
          font-size: 0.9rem;
          margin-bottom: 0.3rem;
        }
        .area {
          font-size: 0.8rem;
          color: gray;
          margin-bottom: 0.3rem;
        }
        .footprint {
          font-size: 0.8rem;
          color: gray;
        }
      }
      .about {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-right: 2rem;
        .focus {
          margin-bottom: 0.5rem;
          width: 9rem;
        }
        .message {
          margin-left: 0rem;
          width: 9rem;
        }
      }
    }
  }
</style>
