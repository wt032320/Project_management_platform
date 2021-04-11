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
            <el-input v-model="userInfo.nickname" placeholder="输入您的昵称" class="input"></el-input>
          </el-form-item>

          <el-form-item class="company">
            <span>公司</span>
            <el-input v-model="userInfo.company" placeholder="输入您的公司" class="input"></el-input>
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
            <el-button type="primary" class="button">更新信息</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right">
        <div class="profile">
          <span>个人头像</span>
        </div>

        <div class="picture">
          <img src="" alt="">
        </div>

        <div class="onclick">
          <span class="el-dropdown-link">
            <i class="el-icon-edit"></i><span>Edit</span>
          </span>
        </div>

        <div class="upload">
          <i class="el-icon-edit"></i>
          <input type="file" placeholder="编辑" class="form-input">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { IUserinfo } from "../../typings";

export default defineComponent({
  name: "AddInfo",
  components: {},
  setup() {
    let userInfo: IUserinfo = reactive({
      nickname: '',
      company: '',
      area: '',
      sign: '',
    })

    return {
      userInfo
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
        .picture {
          width: 13rem;
          height: 13rem;
          margin-top: 1rem;
          background-color: pink;
          border-radius: 50%;
        }
        .onclick {
          position: relative;
          top: -3rem;
          width: 4rem;
          height: 2rem;
          border: 1px solid rgba(gray, $alpha: 0.5);
          border-radius: 0.6rem;
          background-color: #fff;
          .el-dropdown-link {
            i {
              margin: 0.5rem 0.3rem 0.5rem 0.35rem;
            }
            span {
              font-weight: 500;
            }
          }
        }

        .upload {
          .form-input {
            -webkit-appearance:none;
            -moz-appearance: none;
            border: none;
          }
        }
      }
    }
  }
</style>