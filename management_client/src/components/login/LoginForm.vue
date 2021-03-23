<template>
  <div class="login-form">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>登录</h2>
      <h4>
        你尚未拥有账户? 点击
        <span class="login-regist">注册</span>
        进行登录
      </h4>
    </header>

    <!-- 登录表单内容 -->
    <article>
      <el-form 
        :model="LoginFormData" 
        :rules="rules" 
        ref="LoginFormData" 
        label-width="100px" 
        class="login-form-body"
      >
        <el-form-item 
          v-for="item in LoginForm" 
          :key="item.title" 
          :label="item.title" 
          :prop="item.name"
          :class="item.name"
        >
          <el-input v-model="item.value" :maxlength="item.meta.max"></el-input>
        </el-form-item>
      </el-form>
      <el-checkbox 
        v-model="ready"
        class="login-ready"
        >我已阅读并同意
        <span>《相关协议》</span>
      </el-checkbox>
      <div class="login-button">
        <el-button round type="warning">找回</el-button>
        <el-button round type="primary">登录</el-button>
      </div>
    </article>

    <!-- 登录表单底部 -->
    <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" v-for="img in login_icons" :key="img" :src="img" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from "vue";
import weixin from '../../assets/images/login/weixin.png';
import qq from '../../assets/images/login/qq.png';
import weibo from '../../assets/images/login/weibo.png';

interface DataProps {
  phone: string;
  password: string;
}

export default defineComponent({
  name: 'LoginForm',
  components: {},
  setup() {
    const LoginFormData: DataProps = reactive({
      phone: "",
      password: ""
    });
    // const refFormData = toRefs(LoginFormData);

    const LoginForm = ref([
      {
        title: "手机号",
        name: "phone",
        value: "",
        meta: {
          max: 11
        }
      },
      {
        title: "登陆密码",
        name: "password",
        value: "",
        meta: {
          max: 30
        }
      }
    ])

    return { 
      LoginForm,
      LoginFormData,
    }
  },

  data() {
    return {
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 16, message: '长度在8到16个字符', trigger: 'blur'}
        ]
      },
      ready: false,
      login_icons: [weixin, weibo, qq],
    }
  }
})
</script>

<style lang="scss">
  .login-form {
    .login-title {
      h2 {
        font-size: 34px;
      }
      h4 {
        font-size: 14px;
        color: rgba($color: gray, $alpha: 0.7);
        letter-spacing: 1px;
        padding-top: 8px 0;
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
      .login-form-body {
        .phone,
        .password {
          width: 80%;
          padding: 16px;
        }
        .password {
          padding-top: 5px;
        }
      }
      .login-ready {
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
        padding: 20px 15% 0 0;
        padding-right: 15%;
        padding-top: 10px;
        button {
          width: 40%;
        }
      }
    }
    footer {
      position: absolute;
      bottom: 10%;
      width: 60%;
      h3 {
        color: rgba($color: gray, $alpha: 0.8);
        font-size: 14px;
        letter-spacing: 1px;
      }
      .login-other {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 80%;
        .login-icon {
          width: 3rem;
          height: 3rem;
          padding: 0 1rem;
        }
      }
    }
  }
</style>