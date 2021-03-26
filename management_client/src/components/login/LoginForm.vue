<template>
  <div class="login-form">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>登录</h2>
      <h4>
        你尚未拥有账户? 点击
        <span class="login-regist" @click="regist('regist')">注册</span>
        进行登录
      </h4>
    </header>

    <!-- 登录表单内容 -->
    <article>
      <el-form 
        :model="userData" 
        :rules="rules" 
        label-width="100px" 
        class="login-form-body"
      >
        <el-form-item 
          label="手机号" 
          prop="phone"
          class="phone"
        >
          <el-input 
            v-model="userData.phone" 
            maxlength="11"
          ></el-input>
        </el-form-item>
        <el-form-item 
          label="登录密码"
          prop="password"
          class="password"
        >
          <el-input 
            v-model="userData.password" 
            maxlength="16"
            type="password"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox 
        v-model="isReady.ready"
        class="login-ready"
        >我已阅读并同意
        <span>《相关协议》</span>
      </el-checkbox>
      <div class="login-button">
        <el-button round type="warning" @click="setEvent('alter')">找回</el-button>
        <el-button round type="primary" @click="login">登录</el-button>
      </div>
    </article>

    <!-- 登录表单底部 -->
    <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" src="../../assets/images/login/weixin.png" />
        <img class="login-icon" src="../../assets/images/login/qq.png" />
        <img class="login-icon" src="../../assets/images/login/weibo.png" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import { _login } from '../../api/auth/auth';
import { IUser } from "../../typings";

import  setEvent  from '../../hooks/login/index'

export default defineComponent({
  name: 'LoginForm',
  components: {},
  setup() {
    const userData: IUser = reactive({
      phone: "15291083796",
      password: "11111111",
    })

    // 校验规则
    const rules = ref({
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 16, message: '长度在8到16个字符', trigger: 'blur'}
      ]
    })

    // 勾选协议
    const isReady = ref({
      ready: false
    })

    // 登录方法
    async function login() {
      const result = await _login(userData)
      console.log(result)
      if(result.token) {
        localStorage.setItem('token', result.token)
      }
    }


    return {
      userData,
      rules,
      isReady,
      login,
      setEvent
    }
  },
})
</script>

<style lang="scss" scoped>
.login-form {
  .login-title {
    width: 80%;
    height: 15%;
    h2 {
      font-size: 1.2rem;
    }
    h4 {
      font-size: 0.6rem;
      color: rgba($color: gray, $alpha: 0.7);
      letter-spacing: 0.1rem;
      padding: 0.2rem 0%;
      .login-regist {
        color: #426ab3;
      }
      .login-regist:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
  }
  article {
    width: 100%;
    height: 60%;
    .login-form-body {
      height: 60%;
      .phone,
      .password {
        width: 80%;
        padding:  0.4rem;
      }
      .password {
        padding-top: 0%;
      }
    }
    .login-ready {
      height: 12%;
      padding-top: 0.45rem;
      span {
        color: #426ab3;
      }
      span:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
    .login-button {
      text-align: right;
      height: 28%;
      padding: 0.4rem 15% 0 0;
      button {
        width: 35%;
      }
    }
  }
  footer {
    position: absolute;
    width: 60%;
    height: 25%;
    padding: 0.6rem 0;
    h3 {
      color: rgba($color: gray, $alpha: 0.8);
      font-size: 0.6rem;
      letter-spacing: 0.1rem;
    }
    .login-other {
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 0.4rem;
      width: 80%;
      .login-icon {
        max-width: 2rem;
        padding: 0 1rem;
      }
    }
  }
}
</style>