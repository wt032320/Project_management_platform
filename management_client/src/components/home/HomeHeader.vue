<template>
  <header class="project-header">
    <div class="header-logo header">
      <img src="../../assets/logo.png" >
      <span>xxx项目管理平台</span>
    </div>
    <div class="header-messages header">
      <div class="head-message" v-for="(item, index) in messages" :key="index">
        <span>{{item}}</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'HomeHeader',
  components: {},
  setup() {
    const messages = ref(["我的", "消息", "设置"])

    return {
      messages
    }
  }
})
</script>

<style lang="scss" >
  .project-header {
    display: flex;
    justify-content: space-between; // 两端对齐，项目之间的间隔都相等
    align-items: center;
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
        font-size: 0.9rem;
      }
    }
    .header-messages {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 5%;
      .head-message {
        padding-right: 0.5rem;
        font-size: 0.8rem;
        text-shadow: 0 1px 1px rgba($color: gray, $alpha: 0.5);
      }
    }

    .header {
      animation: init2 0.5s;
    }
  }

  @keyframes init2 {
    from {
      position: relative;
      bottom: 5rem;
    }
    to {
      position: relative;
      bottom: 0rem;
    }
  }
</style>
