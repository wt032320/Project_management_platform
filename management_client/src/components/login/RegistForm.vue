<template>
  <div class="regist-form">
    <!-- 注册表单头部 -->
    <header class="regist-title">
      <h2>注册</h2>
      <h4>
        已有用户? 点击
        <span class="regist-regist" @click="setEvent('login')">登录</span>
        进行登录
      </h4>
    </header>

    <!-- 注册表单内容 -->
    <article>
      <el-form 
        :model="registFromData" 
        :rules="rules" 
        ref="registForm"
        class="regist-form-body"
      >
        <!-- 1.<el-form-item中的prop必须等于<el-input中v-model="registFormData.value"
            2.rules中的规则名称也需要和registFormData中属性定义的名称相同 -->
        <el-form-item 
          label="手机号" 
          prop="phone"
          class="phone"
          label-width="100px" 
        >
          <el-input 
            v-model="registFromData.phone" 
            maxlength="11"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item 
          label="密码"
          prop="password"
          class="password"
          label-width="100px" 
        >
          <el-input 
            v-model="registFromData.password" 
            maxlength="16"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item 
          label="确认密码"
          prop="repassword"
          class="repassword"
          label-width="100px" 
        >
          <el-input 
            v-model="registFromData.repassword" 
            maxlength="16"
            type="password"
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="isAgree" class="regist-ready" >
          <el-checkbox
            label-width="120px"
            v-model="registFromData.isAgree"
          >我已阅读并同意
            <span @click="dialogTableVisible = true">《相关协议》</span>
            <el-dialog title="用户协议" v-model="dialogTableVisible">
              <div class="content">
                <h1>hello</h1>
              </div>
            </el-dialog>
          </el-checkbox>
        </el-form-item>
      
        <el-form-item class="regist-button" >
          <el-button round type="primary" @click="regist">注册</el-button>
        </el-form-item>
      </el-form>
    </article>

    <!-- 验证码 -->
    <footer></footer>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref, reactive, getCurrentInstance } from "vue";
import { _regist } from '../../api/auth/auth';
import { IEvent, INuser } from "../../typings";

import  { useEvent, IUse }  from '../../hooks/login/index'
import { ElMessage } from "element-plus";

export default defineComponent({
  name: 'registForm',
  components: {},
  setup() {
    const { ctx }  = getCurrentInstance()
    const { setEvent }: IUse = useEvent()

    const registFromData: INuser = reactive({
      phone: "",
      password: "",
      repassword: "",
      isAgree: true, // 是否同意协议
      captcha: "" // 验证码
    })

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
      repassword: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 8, max: 16, message: '长度在8到16个字符', trigger: 'blur'}
      ],
      isAgree: [
        {
          // 自定义校验规则
          // 验证通过： callback()
          // 验证失败： callback(new Error('错误消息'))
          validator: validateAgree,
          trigger: 'change'
        }
      ]
    })

    const dialogTableVisible: string = ref(false)

    async function sedRegist() {
      if (registFromData.password !== registFromData.repassword) {
        ElMessage.warning({
          message: '两次密码输入不相同',
          type: 'warning'
        })
      }
      const result = await _regist({
        phone: registFromData.phone,
        password: registFromData.password
      })
      if (result.length === 6) {
        ElMessage.success({
          message: result,
          type: 'success',
        })
        setEvent('login')
      }
      
    }

    // 注册方法
    function regist() {
      ctx.$refs['registForm'].validate((valid) => {
          if (valid) {
            sedRegist()
          } else {
            return false;
          }
        });
    
    }

    return {
      registFromData,
      rules,
      dialogTableVisible,
      regist,
      setEvent,
    }
  },
})
</script>


<style lang="scss" scoped>
.regist-form {
  .regist-title {
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
      .regist-regist {
        color: #426ab3;
      }
      .regist-regist:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }
  }
  article {
    width: 100%;
    height: 60%;
    .regist-form-body {
      .phone,
      .password,
      .repassword {
        width: 80%;
      }
    }

    .regist-ready {
      height: 25%;
      margin-bottom: 0;
      text-align: left;
      span {
        color: #426ab3;
      }
      span:hover {
        color: #6a6da9;
        cursor: pointer;
      }
    }

    .regist-button {
      text-align: center;
      height: 20%;
      button {
        width: 40%;
      }
    }
  }

}
</style>