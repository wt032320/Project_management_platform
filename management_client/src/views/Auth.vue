<template>
  <div class="auth">

    <!-- 背景图片 -->
    <div class="auth-img">
      <div class="auth-img-mask"></div>
    </div>

    <!-- 表单 -->
    <div class="auth-card" v-if="event === 'login'">
      <div class="auth-bg"></div>
      <login-form class="auth-form"></login-form>
    </div>

    <div class="auth-card" v-else-if="event === 'regist'">
      <div class="auth-bg"></div>
      <regist-form class="auth-form"></regist-form>
    </div>

    <div class="auth-card" v-else-if="event = 'alter'">
      <div class="auth-bg"></div>
      <alter-form class="auth-form"></alter-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import LoginForm from "../components/login/LoginForm.vue";
import RegistForm from "../components/login/RegistForm.vue";
import AlterForm from "../components/login/AlterForm.vue";
import { watch } from "vue";
import { Store, useStore } from 'vuex';

export default defineComponent({
  name: 'Auth',
  components: {
    LoginForm,
    RegistForm,
    AlterForm,
  },
  setup() {
    const data = reactive({
      event: 'regist'
    })
    const refData = toRefs(data)

    const store: Store<any> = useStore()
    const events = computed(() => {
      return store.state.list
    })

    watch(events, (newEvent) => {
      data.event = newEvent[0].event
    })

    return {
      ...refData
    }
  }
})
</script>

<style lang="scss" scoped>
  .auth {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url('../assets/images/auth/auth_background.jpg') no-repeat;
    background-size: cover;
    .auth-img-mask {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba($color: #000000, $alpha: 0.05);
    }
    .auth-card {
      width: 50%;
      height: 60%;
      position: absolute;
      border-radius: 10px;
      display: flex;
      .auth-bg {
        width: 45%;
        height: 100%;
        background-color: rgba($color: #fff, $alpha: 0.4);
        border-radius: 10px 0px 0px 10px;
      }
      .auth-form {
        width: 55%;
        background-color: #fff;
        padding: 3rem 0.5rem 0 2.5rem;
        border-radius: 0 10px 10px 0;
      }

    }
  }
</style>
