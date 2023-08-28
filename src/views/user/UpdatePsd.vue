<script setup>
import { reactive } from "vue"
import FButton from "comp/f-button/FButton.vue"
import { useRouter } from "vue-router"
import { updatePsd as apiUpdatePsd } from 'api/user.js'
import { useUserStore } from "store/user.js"
import FMessage from "comp/f-message/FMessage.js";

let state = reactive({
  p1: '',
  p2: '',
  p3: ''
})

const router = useRouter()
const userStore = useUserStore()

const submit = () => {
  if (state.p2 !== state.p3) return FMessage.warning('新密码不一致')
  apiUpdatePsd({
    username: userStore.state.userInfo.username,
    passwordOld: state.p1,
    passwordNew: state.p2,
    passwordNew2: state.p3
  }).then(res => {
    if (res.code === 200) {
      FMessage.success('修改成功')
      router.push('/user')
    } else {
      FMessage.error(res.msg)
    }
  }).catch(err => {
    FMessage.error(err)
  })
}
const cancel = () => {
  router.push('/user')
}
</script>

<template>
  <div class="update-psd-container">
    <div>
      <label>
        <span>请输入原密码</span>
        <input v-model.trim="state.p1" type="password"/>
      </label>
    </div>
    <div>
      <label>
        <span>请输入新密码</span>
        <input v-model.trim="state.p2" type="password"/>
      </label>
    </div>
    <div>
      <label>
        <span>请确认新密码</span>
        <input v-model.trim="state.p3" type="password"/>
      </label>
    </div>
    <br/>
    <div>
      <FButton @click="submit">保存修改</FButton>
      <FButton @click="cancel">取消</FButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.update-psd-container {
  > div {
    > label {
      > span {
      }

      > input {
        @include input-text-small-line;
      }
    }
  }
}
</style>