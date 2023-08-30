<script setup>
import { computed, nextTick, reactive, ref, watch } from "vue";
import { useUserStore } from "store/user.js";
import router from "@/router/index.js";
import FMessage from "comp/f-message/FMessage.js";
import { registWithUP } from "api/user.js";

let state = reactive({
  type: 'login',
  info: {
    username: '',
    password: '',
    password2: ''
  }
})
let usernameInput = ref(null)
let passwordInput = ref(null)
let password2Input = ref(null)
const isOk = ref(false)

watch(
    () => [state.type, state.info],
    () => {
      isOk.value = state.type === 'login' ? (!!state.info.username && !!state.info.password) : (!!state.info.username && !!state.info.password && !!state.info.password2)
    },
    {
      deep: true
    }
)

nextTick(() => {
  usernameInput.value.focus()
})

const submit = () => {
  if (!!!state.info.username) {
    usernameInput.value.focus()
    return FMessage.warning('请填写用户名')
  }
  if (!!!state.info.password) {
    passwordInput.value.focus()
    return FMessage.warning('请填写密码')
  }
  if (state.type === 'login') {
    loginUP()
  } else if (state.type === 'regist') {
    if (!!!state.info.password2) {
      password2Input.value.focus()
      return FMessage.warning('请确认密码')
    }
    registUP()
  }
}
const loginUP = () => {
  useUserStore().loginWithUP(state.info).then(res => {
    if (res.code === 200) {
      router.back()
    }
  })
}
const registUP = () => {
  registWithUP(state.info).then(res => {
    if (res.code === 200) {
      FMessage.success('注册成功')
      clear()
      updateType()
    }
  })
}
const updateType = () => {
  state.type = state.type === 'login' ? 'regist' : 'login'
}
const clear = () => {
  state.info.username = ''
  state.info.password = ''
  state.info.password2 = ''
}
</script>

<template>
  <div class="login-container">
    <div class="box">
      <div class="header">
        <div :class="state.type==='login'?'text-choosed':''" @click="updateType">登录</div>
        <div :class="state.type==='regist'?'text-choosed':''" @click="updateType">注册</div>
      </div>
      <div class="main">
        <label>
          <!--<span>用户名</span>-->
          <input type="text" ref="usernameInput" v-model="state.info.username" placeholder="请输入用户名"
                 @keyup.enter="submit"/>
        </label>
        <label>
          <!--<span>密码</span>-->
          <input type="password" ref="passwordInput" v-model="state.info.password" placeholder="请输入密码"
                 @keyup.enter="submit"/>
        </label>
        <label v-if="state.type!=='login'">
          <!--<span>密码</span>-->
          <input type="password" ref="password2Input" v-model="state.info.password2" placeholder="请确认密码"
                 @keyup.enter="submit"/>
        </label>
      </div>
      <div class="agreement">
        <!--  <label>-->
        <!--    <input type="checkbox"/>-->
        <!--    <span>已阅读并同意<a>《用户协议》</a></span>-->
        <!--  </label>-->
      </div>
      <div class="footer">
        <div :class="isOk?'':'disabled'" @click="submit">{{ state.type === 'login' ? '登录' : '注册' }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f0f0f1;

  > .box {
    margin: auto;
    padding: 75px;
    display: flex;
    flex-direction: column;
    gap: 30px;
    background-color: #fff;
    box-shadow: $box-shadow-common-ddd;
    //transform: translateX(40%);

    > .header {
      @include text-choose-box;
      @include text-unchoosed;

      > * {
        cursor: pointer;
      }

      > .text-choosed {
        @include text-choosed;
      }
    }

    > .main {
      display: flex;
      flex-direction: column;
      gap: $unit-3;

      > label {
        display: flex;
        align-items: center;

        > span {
          flex: auto;
          text-align: right;
        }

        > input {
          @include input-line;
          flex: none;
        }
      }
    }

    > .agreement {
      > label {
        display: flex;
        align-items: center;

        > input {
          @include input-checkbox;
        }

        > span {
          color: $font-c-gray-1;

          > a {
            color: #000;
          }
        }
      }
    }

    > .footer {
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 50px;
        background-color: #000;
        color: #fff;
        cursor: pointer;

        &.disabled {
          background-color: $color-gray;
        }
      }
    }
  }
}
</style>