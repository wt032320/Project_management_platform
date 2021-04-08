<template>
  <div class="side">
    <div class="side-items">
      <div class="side-item" v-for="(item, index) in items" :key="index" @click="router.push(item.route)">
        <span :class="`${item.icon}`" class="iconfont"></span>
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from '../../router/index';

export default defineComponent({
  name: 'HometSide',
  components: {},
  setup() {
    const items = ref([
      {
        title: '项目',
        icon: 'icon-jia',
        route: '/project'
      },
      {
        title: '好友',
        icon: 'icon-haoyou',
        route: '/project/friend'
      },
      {
        title: '社区',
        icon: 'icon-shequ',
        route: '/project/community'
      },
      {
        title: '个人',
        icon: 'icon-geren',
        route: '/project/profile'
      },
      {
        title: '系统',
        icon: 'icon-xitong',
        route: '/project/system'
      }
    ])

    return {
      items,
      router
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
      animation: init1 0.5s;
      .side-item {
        width: 85%;
        padding: 1rem 1rem 1rem 2rem;
        font-size: 1rem;
        letter-spacing: 0.1rem;
        text-shadow: 0 1px 1px rgba($color: gray, $alpha: 0.5);
      }
      .side-item:hover {
        background-color: rgba($color: gray, $alpha: 0.2);
      }
      .side-item:first-child {
        margin-top: 1rem;
      }
    }
  }

  // css3动画
  @keyframes init1 {
    from {
      margin-top: 5rem;
    }
    to {
      margin-top: 0;
    }
  }

</style>
