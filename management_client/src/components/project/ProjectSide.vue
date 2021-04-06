<template>
  <div class="side">
    <div class="side-items">
      <div class="side-item" v-for="(item, index) in items" :key="index">
        <span :class="`${item.icon}`" class="iconfont"></span>
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'ProjectSide',
  components: {},
  setup() {
    const items = ref([
      {
        title: '项目',
        icon: 'icon-jia'
      },
      {
        title: '好友',
        icon: 'icon-haoyou'
      },
      {
        title: '社区',
        icon: 'icon-shequ'
      },
      {
        title: '个人',
        icon: 'icon-geren'
      },
      {
        title: '系统',
        icon: 'icon-xitong'
      }
    ])

    return {
      items
    }
  }
})
</script>

<style lang="scss" scoped>
  .side {
    width: 13%;
    height: 100%;
    .side-items {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      .side-item {
        margin-left: 2rem;
        padding: 1rem;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        text-shadow: 0 1px 1px rgba($color: gray, $alpha: 0.5);
      }
      .side-item:first-child {
        margin-top: 1rem;
      }
    }
  }
</style>
