<template>
  <div class="side">
    <div class="side-items">
      <div class="side-item" v-for="(item, index) in items" :key="index">
      {{item}}
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
    const items = ref(["项目", "好友", "社区", "个人", "系统"])

    return {
      items
    }
  }
})
</script>

<style lang="scss">
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
