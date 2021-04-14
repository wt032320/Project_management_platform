<template>
  <div style="width:100%;height:500px" >
    <el-dialog v-model="dialogVisible" :before-close="cropImage">
      <div class="input">
        <input
          ref="input"
          type="file"
          name="umage"
          accept="image/*"
          @change="setImage"
        />
      </div>

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
      <el-button @click="showFileChooser" block  style="margin: 10px" type="primary">选择头像</el-button>
      <el-button @click="cropImage" block  style="margin: 10px" type="primary">设置头像</el-button>
    </el-dialog>
  </div>
</template>

<script lang = "ts">
import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue"
import VueCropper from 'vue-cropperjs';
import 'cropperjs/dist/cropper.css';
import { _photo } from '../../api/head_portrait/head_portrait'
import { ElMessage } from 'element-plus';

export default defineComponent({
  name: 'ImageCrop',
  components: { VueCropper },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {

    const data = reactive({
      imgSrc: '',
      cropImg: '',
      data: null,
      dialogVisible: ''
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
      uploadImage(data.cropImg) // 上传图片
      cancelDialog() // 关闭弹窗
    }

    /**
     * base64 转 Blob 格式 和 file 格式
     */
    function bas64UrlToBlob (urlData) {
      let arr = urlData.split(',')
      let mime = arr[0].match(/:(.*?);/)[1] // 去掉url的头, 并转化为byte, match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
      let bstr = atob(arr[1]) // 处理异常, 将Ascil码小于0的转化为大于零
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while(n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }

      let filename = Date.parse(new Date()) + '.jpg'
      return new File([u8arr], filename, { type: mime })
    }

    /**
     * 上传图片
     */
    async function uploadImage (base64Codes) {
      const uploaData = {
        id: localStorage.getItem('userid'),
        photo: bas64UrlToBlob(base64Codes)
      }
      
      console.log(uploaData)
      // 调用上传接口
      await _photo(uploaData)
        .then(res => {
          if (res.code === 0) {
            ElMessage.success({
              message: res.msg,
              type: 'success'
            })
          } else {
            ElMessage.warning({
              message: res.msg,
              type: 'warning'
            })
          }
        })
    }

    // 修改弹窗的状态
    function cancelDialog() {
      data.dialogVisible = false
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
  .input {
    visibility: hidden;
  }
  .content {
    display: flex;
    justify-content: space-between;
  }

  .cropper-area {
    width: 35rem;
    height: 100%;
    border: 2px solid rgba($color: #000000, $alpha: 0.5);
  }
  .preview-area {
    width: 20rem;
    margin-left: 1.5rem;
  }

  .preview-area p {
    font-size: 1.25rem;
    margin: 1rem;
    margin-bottom: 1rem;
  }

  .preview-area p:last-of-type {
    margin-top: 1rem;
  }

  .preview {
    width: 13rem;
    height: 13rem;
    border-radius: 50%;
    background-color: rgba($color: hsl(0, 3%, 43%), $alpha: 0.1);
    border: 2px solid rgba($color: #000000, $alpha: 0.5);
    overflow: hidden;
  }

  .cropped-image img {
    max-width: 100%;
  }
</style>