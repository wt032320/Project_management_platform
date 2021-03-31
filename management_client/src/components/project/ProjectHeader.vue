<template>
  <header>
    <div class="header-logo">
      <img src="../../assets/logo.png" >
      <span>校园智慧化管理管理平台</span>
    </div>
    <div class="header-messages">
      <div class="head-message" v-for="(item, index) in messages" :key="index">
        <span>{{item}}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'ProjectHeader',
  components: {},
  setup() {
    const messages = ref(["我的", "消息", "设置"])

    return {
      messages
    }
  }
})
</script>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between; // 两端对齐，项目之间的间隔都相等
    width: 110%;
    position: relative;
    right: 5%;
    box-shadow: 0 0.4rem 0.35rem -0.35rem rgba($color: gray, $alpha: 0.8);
    .header-logo {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5%;
      img {
        zoom: 0.15; // zoom(设置或检索对象的缩放比例)：normal(使用对象的实际尺寸) | <number>(用浮点数来定义缩放比例。不允许负值) | <percentage> (用百分比来定义缩放比例。不允许负值)
      }
      span {
        margin-left: 1rem;
        font-size: 14px;
      }
    }
    .header-messages {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5%;
      .head-message {
        padding-right: 0.5rem;
      }
    }
  }
</style>
