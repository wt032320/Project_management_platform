<template>
  <div class="login">

    <!-- 背景图片 -->
    <div class="login-img">
      <div class="login-img-mask"></div>
    </div>

    <!-- 登录表 -->
    <div class="login-card">
      <div class="login-bg"></div>
      <login-form class="login-form"></login-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "../components/login/LoginForm.vue";
import login_background from '../assets/images/login/login_background.jpg';

export default defineComponent({
  name: 'Login',
  components: {
    LoginForm
  },
  setup() {},
  data() {
    return {
      login_background,
    }
  }
})
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/images/login/login_background.jpg') no-repeat;
    background-size: cover;
    .login-img-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
    .login-card {
      width: 50%;
      height: 60%;
      position: absolute;
      border-radius: 10px;
      display: flex;
      .login-bg {
        width: 45%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.4);
        border-radius: 10px 0px 0px 10px;
      }
      .login-form {
        width: 55%;
        background-color: #fff;
        padding: 3rem 0.5rem 0 2.5rem;
        border-radius: 0 10px 10px 0;
      }
    }
  }
</style>