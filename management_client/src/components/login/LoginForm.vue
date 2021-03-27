<template>
  <div class="login-form">
    <!-- 登录表单头部 -->
    <header class="login-title">
      <h2>登录</h2>
      <h4>
        你尚未拥有账户? 点击
        <span class="login-regist" @click="setEvent('regist')">注册</span>
        进行登录
      </h4>
    </header>

    <!-- 登录表单内容 -->
    <article>
      <el-form 
        :model="userData" 
        :rules="rules" 
        ref="login-form"
        class="login-form-body"
      >
        <el-form-item 
          label="手机号" 
          prop="phone"
          class="phone"
          label-width="100px"
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
          label-width="100px"
        >
          <el-input 
            v-model="userData.password" 
            maxlength="16"
            type="password"
          ></el-input>
        </el-form-item>
        <div class="login-button">
          <el-button round type="warning" @click="setEvent('alter')">找回</el-button>
          <el-button round type="primary" @click="login">登录</el-button>
        </div>
        <el-form-item prop="isAgree" class="login-ready" >
          <el-checkbox 
            v-model="userData.isAgree"
            label-width="100px"
            >我已阅读并同意
            <span @click="dialogTableVisible = true">《相关协议》</span>
            <el-dialog title="用户协议" v-model="dialogTableVisible">
              <div class="">
                <h1>hello</h1>
              </div>
            </el-dialog>
          </el-checkbox>
        </el-form-item>
      </el-form>
    </article>

    <!-- 登录表单底部 -->
    <footer>
      <h3>其他社交方式登录</h3>
      <div class="login-other">
        <img class="login-icon" src="../../assets/images/auth/weixin.png" />
        <img class="login-icon" src="../../assets/images/auth/qq.png" />
        <img class="login-icon" src="../../assets/images/auth/weibo.png" />
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import { _login } from '../../api/auth/auth';
import { IUser, IEvent } from "../../typings";

import  { useEvent, IUse }  from '../../hooks/login/index'

export default defineComponent({
  name: 'LoginForm',
  components: {},
  setup() {
    const userData: IUser = reactive({
      phone: "15291083796",
      password: "11111111",
      isAgree: false, // 是否同意协议
    })

    // 自定义校验规则
    // 验证通过： callback()
    // 验证失败： callback(new Error('错误消息'))
    const validateAgree = (rule: any, value: any, callback: any) => {
      if (value) {
        callback()
      } else {
        callback(new Error('请勾选用户协议'))
      }
    }

    // 校验规则
    const rules = ref({
      phone: [
        { required: true, message: '请输入手机号', trigger: 'blur' },
        { pattern: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/, message: '请输入正确的手机号', trigger: 'blur' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 16, message: '长度在8到16个字符', trigger: 'blur'}
      ],
      isAgree: [
        {
          validator: validateAgree,
          trigger: 'change'
        }
      ]
    })

    // 用户协议
    const dialogTableVisible = ref(false)

    const { ctx } = getCurrentInstance()
    // 登录方法
    function login() {
      ctx.$refs['login-form'].validate(async(value) => {
        if (value) {
          const result:any = await _login({
            phone: userData.phone,
            password: userData.password
          })
          console.log(result)
          if(result.token) {
            localStorage.setItem('token', result.token)
          }
        } else {
          return false
        }
      })
    }

    const { setEvent }: IUse = useEvent()

    return {
      userData,
      rules,
      dialogTableVisible,
      login,
      setEvent,
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
        margin-bottom: 0;
      }
      .password {
        padding-top: 0%;
        margin-bottom: 0;
      }
    }
    .login-ready {
      height: 12%;
      padding-top: 0.45rem;
      margin-bottom: 0;
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
      padding: 0.4rem 15%  0;
      button {
        width: 35%;
      }
    }
  }
  footer {
    position: absolute;
    width: 60%;
    height: 25%;
    padding: 0;
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