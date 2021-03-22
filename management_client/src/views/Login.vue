<template>
  <div class="">
    <el-button>1</el-button>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";
import store from '../store/index';
import { getHello } from '../api/user/index';

export default defineComponent({
  created() {
    console.log(this.$store.state.count, '0')
    this.$store.commit('increment')
    console.log(this.$store.state.count, '1')
    getHello().then((res) => {
      console.log(res);
    })
  }
})
</script>

<style>

</style>