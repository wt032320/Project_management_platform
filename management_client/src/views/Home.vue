<template>
  <div class="home">
    <home-header class="header"></home-header>
    <div class="home-area">
      <home-side></home-side>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HomeHeader from "../components/home/HomeHeader.vue"
import HomeSide from "../components/home/HomeSide.vue"

export default defineComponent({
  name: 'Home',
  components: {
    HomeHeader,
    HomeSide,
  },
  setup() {

  }
})
</script>

<style lang="scss">
.home {
  position: absolute;
  width: 100%;
  height: 100%;
  .header {
    height: 5%;
  }
  .home-area {
    height: 95%;
    background-color: rgba(241, 242, 243, $alpha: 1);
    display: flex;
  }
}

</style>