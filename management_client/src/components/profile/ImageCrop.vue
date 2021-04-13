<template>
  <div style="width:100%;height:500px" >
    <el-dialog v-model="dialogVisible" :before-close="cancelDialog">
      <input
        ref="input"
        type="file"
        name="image"
        accept="image/*"
        @change="setImage"
      />

      <div class="content">
        <section class="cropper-area">
          <div class="img-cropper">
            <vue-cropper
              ref="cropper"
              :aspect-ratio="9 / 9"
              :src="imgSrc"
              preview=".preview"
            />
          </div>
        </section>
        <section class="preview-area">
          <p>Preview</p>
          <div class="preview" />

        </section>
      </div>
      <el-button @click="showFileChooser" block  style="margin:10px 0" type="primary">重选头像</el-button>
      <el-button @click="cropImage" block  style="margin:10px 0" type="primary">设置为新头像</el-button>
    </el-dialog>
  </div>
</template>

<script lang = "ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue"
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';

export default defineComponent({
  name: 'ImageCrop',
  components: { VueCropper },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  setup() {

    const data = reactive({
      imgSrc: '',
      cropImg: '',
      data: null,
    })

    const refData = toRefs(data)

    // 获取当前组件的实例(相当于this)
    const internalInstance = getCurrentInstance()

    // 设置图片
    function setImage(e) {
      const file = e.target.files[0];

      if (file.type.indexOf('image/') === -1) {
        alert('Please select an image file');
        return;
      }

      if (typeof FileReader === 'function') {
        const reader = new FileReader();

        reader.onload = (event) => {
          data.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          internalInstance.ctx.$refs.cropper.replace(event.target.result);
        };

        reader.readAsDataURL(file);
      } else {
        alert('Sorry, FileReader API not supported');
      }
    }

    // 重选图片
    function showFileChooser() {
      internalInstance.ctx.$refs.input.click();
    }

    // 裁剪
    function cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      data.cropImg = internalInstance.ctx.$refs.cropper.getCroppedCanvas().toDataURL();
    }

    // 修改父组件弹窗的状态
    function cancelDialog() {
      $emit('update:dialogVisible', false)
    }

    return {
      showFileChooser,
      ...refData,
      setImage,
      cropImage,
      cancelDialog
    }
  }
})
</script>

<style lang='scss' scoped>
  .content {
    display: flex;
    justify-content: space-between;
  }

  .cropper-area {
    width: 614px;
  }
  .preview-area {
    width: 307px;
  }

  .preview-area p {
    font-size: 1.25rem;
    margin: 0;
    margin-bottom: 1rem;
  }

  .preview-area p:last-of-type {
    margin-top: 1rem;
  }

  .preview {
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    overflow: hidden;
  }

  .cropped-image img {
    max-width: 100%;
  }
</style>