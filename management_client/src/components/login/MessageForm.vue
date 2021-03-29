<template>
  <div class="message-box">
    <h4>短信验证码</h4>
    <p>短信已发送至您的手机,请输入短信验证码</p>
    <div class="message-body">
      <el-input maxlength="6" v-model="captcha" class="message-input" placeholder="请输入手机验证码"></el-input>
    </div>

    <div class="message-footer">
      <el-button type="success" @click="resend" class="el-bu">{{resendName}}</el-button>
      <el-button :disabled="resendDisabled" type="primary" @click="verify" class="el-bu">注册</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, reactive } from "vue";
import { ElMessage } from "element-plus";
import { IUse, useEvent } from "../../hooks/login/index";
import { _regist } from "../../api/auth/auth";


interface ICaptcha {
  captcha: string;
  resendName: any;
  resendDisabled: boolean;
}
export default defineComponent({
  name: "MessageForm",
  components: {},
  setup() {
    const data: ICaptcha = reactive({
      captcha: '',
      resendName: "重新发送",
      resendDisabled: false
    })

    const refData = toRefs(data)

    // 发送验证码
    function resend() {
      return new Promise((res, req) => {
        data.resendDisabled = true
        if (data.resendName !== "重新发送") {
          req()
        }
        data.captcha = ''
        ElMessage.warning({
          message: "短信已重新发送",
          type: "warning"
        })
        res()
      })
      .then(() => {
        data.resendName = 60
        const counter = setInterval(() => {
          data.resendName = data.resendName - 1
          if (data.resendName === 0) {
            data.resendName = "重新发送"
            data.resendDisabled = false
            clearInterval(counter)
          }
        }, 1000)
      })
    }

    const { setEvent }: IUse = useEvent()

    // 验证短信验证码
    function verify() {
      // return new Promise(res => {
      //   // 进行验证码校验。。。
      //   res()
      // })
      // .then(() => {
      //   next()
      // })
      next()
    }

    async function next() {
      const registForm = JSON.parse(sessionStorage.getItem('regist'))
      await _regist(registForm)
        .then((res) => {
          ElMessage.success({
            message: res.msg,
            type: "success"
          })
        })
        .then(() => {
          setEvent("login")
        })
    }

    return {
      ...refData,
      resend,
      verify,
    }
  }
})
</script>

<style lang="scss">
  .message-box {
    h4 {
      font-size: 1.5rem;
      padding-bottom: 2rem;
    }
    p {
        font-size: 1rem;
        padding-bottom: 2rem;
      }
    .message-body {
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      .message-input {
        width: 7rem;
      }
    }
    .message-footer {
      width: 100%;
      display: flex;
      justify-content: space-around;
      button {
        margin: 1rem;
      }
      .el-bu {
        width: 50%;
      }
    }
  }
</style>