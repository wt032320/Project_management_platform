<template>
  <div style="width:100%;height:500px">
    <vue-cropper autoCrop img="../../assets/aa.jpg" ref="cropper" centerBox/>
    <el-button @click="getCropData()" block ref="cropper" style="margin:10px 0" type="primary">获取截图后的图片</el-button>
  </div>
</template>

<script lang = "ts">
import { defineComponent, getCurrentInstance } from "vue"
import { VueCropper } from 'vue-cropper';

// 获取当前组件的实例(相当于this)
const internalInstance = getCurrentInstance()

export default defineComponent({
  name: 'Community',
  components: { VueCropper },
  setup() {
    
    function getCropData() {
      internalInstance.ctx.$refs.cropper.getCropData(data => {
        console.log(data)
      })
    }

    return {
      getCropData
    }
  }
})
</script>

<style>

</style>