<template>
  <div class="maininfo">
    <div class="header">
      <span class="title">公开个人资料</span>
    </div>
    <div class="mainin">
      <div class="left">
        <el-form :model="userInfo" label-width="100px" class="infomation">
          <el-form-item class="nickname">
            <span>昵称</span>
            <el-input v-model="userInfo.nickname" placeholder="输入您的昵称(必填)" class="input"></el-input>
          </el-form-item>

          <el-form-item class="company">
            <span>公司</span>
            <el-input v-model="userInfo.company" placeholder="输入您的公司(必填)" class="input"></el-input>
          </el-form-item>

          <el-form-item class="area">
            <span>所在地区</span>
            <el-input v-model="userInfo.area" placeholder="输入您的所在地" class="input"></el-input>
          </el-form-item>

          <el-form-item class="sign">
            <span>个性签名</span>
            <el-input v-model="userInfo.sign" type="textarea" class="input"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="button" @click="updateInfo">更新信息</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">

        <!-- <div class="onclick">
          <div class="upload" ><i class="el-icon-edit"></i><span>Edit</span></div>
        </div> -->

        <div class="profile">
          <span>个人头像</span>
        </div>
          
        <div class="cropped-image">
          <el-upload
            class="avatar-uploader"
            accept="image/*"
            action="http://localhost:8000/photo/upload/15"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>


      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, toRefs } from "vue";
import { IUserinfo } from "../../typings";
import { _updateInfo, _profile } from "../../api/profile/profile";
import { ElMessage } from "element-plus";

export default defineComponent({
  name: "AddInfo",
  components: { },
  setup() {
    // 用户信息
    let userInfo: IUserinfo = reactive({
      nickname: '',
      company: '',
      area: '',
      sign: '',
      id: localStorage.getItem('userid')
    })

    // 头像
    const data = reactive({
      imgQuality: 0.5, // 压缩质量
      imageUrl: ''
    })

    const refData = toRefs(data)

    /**
     * @description: 更新用户信息
     * @param {*}
     * @return {*}
     */
    async function updateInfo() {
      await _updateInfo(userInfo)
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

    /**
     * @description: 获取用户信息
     * @param {*} userid
     * @return {*}
     */
    async function getuserInfo(userid: string) {
      await _profile(userid).then((res) => {
        if (res.msg === undefined) {
          return
        } else {
          userInfo.nickname = res.msg.nickname
          userInfo.company = res.msg.company
          userInfo.sign = res.msg.sign
          userInfo.area = res.msg.area
        }
      })
    }

    /**
     * @description: 服务器返回结果处理方法
     * @param {*} res
     * @param {*} file
     * @return {*}
     */
    function handleAvatarSuccess(res, file) {
      data.imageUrl = URL.createObjectURL(file.raw);
      console.log(res.msg)
    }

    /**
     * @description: base64转blob方法
     * @param {*} dataURI
     * @param {*} type
     * @return {*}
     */
    function dataURItoBlob(dataURI, type) {
      let binary = atob(dataURI.split(',')[1]);
      let array = [];
      for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: type});
    }

    /**
     * @description: 在上传之前进行处理
     * @param {*} file
     * @return {*}
     */
    function beforeAvatarUpload(file) {
      return new Promise(resolve => {
        const reader = new FileReader()
        const image = new Image()
        image.onload = (imageEvent) => {
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          const width = image.width * data.imgQuality
          const height = image.height * data.imgQuality
          canvas.width = width;
          canvas.height = height;
          context.clearRect(0, 0, width, height);
          context.drawImage(image, 0, 0, width, height);
          const dataUrl = canvas.toDataURL(file.type);
          const blobData = dataURItoBlob(dataUrl, file.type);
          resolve(blobData)
          console.log(blobData)
        }
        reader.onload = (e => { image.src = e.target.result; });
        reader.readAsDataURL(file);
      })
    }

    onMounted(() => {
      const id = localStorage.getItem('userid')
      getuserInfo(id)
    })

    return {
      userInfo,
      updateInfo,
      handleAvatarSuccess,
      beforeAvatarUpload,
      ...refData
    }
  }
})
</script>

<style lang="scss">
  .maininfo {
    width: 87%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    .header {
      width: 80%;
      height: 15%;
      margin-left: 6.2rem;
      margin-top: 2rem;
      padding-bottom: 2rem;
      border-bottom: 1px solid rgba(gray, $alpha: 0.5);
      .title {
        font-size: 2rem;
        font-weight: 500;
      }
    }
    .mainin {
      display: flex;
      justify-content: flex-start;
      height: 90%;
      .left {
        width: 65%;
        .infomation {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          padding-top: 1rem;
          .el-form-item__content {
            display: flex;
            margin-left: 0;
            flex-direction: column;
            justify-content: flex-start;
            span {
              font-size: 1rem;
              font-weight: 600;
            }
            .input {
              width: 80%;
            }
            .button {
              width: 30%;
            }
          }
        }
      }
      .right {
        width: 35%;
        .profile {
          margin-top: 1.5rem;
          span {
            font-size: 1rem;
            font-weight: 600;
          }
        }
        .avatar-uploader .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar-uploader .el-upload:hover {
          border-color: #409EFF;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }

        .cropped-image {
          width: 13rem;
          height: 13rem;
          margin-top: 1rem;
          border-radius: 50%;
        }

        .crop-placeholder {
          width: 13rem;
          height: 13rem;
          border-radius: 50%;
          background: #ccc;
        }
      }
    }
  }
</style>