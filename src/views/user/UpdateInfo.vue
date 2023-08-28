<script setup>
import { useUserStore } from "store/user.js"
import { computed, nextTick, reactive, ref, watch } from "vue"
import { getFileBaseUrl } from "utils/env.js"
import { uploadAvatar as apiUploadAvatar } from 'api/common.js'
import { updateUser as apiUpdateUser } from 'api/user.js'
import { useRouter } from "vue-router"
import { deepClone } from "utils/objectUtils.js"
import FButton from "comp/f-button/FButton.vue"
import FMessage from "comp/f-message/FMessage.js"
import { useDictStore } from "store/dict.js";

let state = reactive({
  userInfo: {},
  uploading: false,
  sexs: []
})

const router = useRouter()
const userStore = useUserStore()
let dictStore = useDictStore();
let fileipt = ref(null)

state.sexs = computed(() => dictStore.getDict('user_sex'))

watch(() => userStore.state.userInfo, newVal => {
  state.userInfo = deepClone(newVal)
}, {
  immediate: true
})

const updateAvatar = e => {
  if (state.uploading) {
    return
  }
  state.uploading = true
  let file = e.target.files[0]
  if (file.size > 1000000) {
    return FMessage.error('文件过大')
  }
  let fd = new FormData()
  fd.append('file', file)
  apiUploadAvatar(fd).then(res => {
    if (res.code === 200) {
      state.userInfo.avatar = res.data
    }
  }).finally(() => {
    fd = null
    state.uploading = false
  })
}
const submit = () => {
  apiUpdateUser(state.userInfo).then(res => {
    if (res.code === 200) {
      userStore.getData(() => {
        router.push('/user')
      })
    }
  })
}
const cancel = () => {
  router.push('/user')
}
</script>

<template>
  <div class="update-info-container">
    <div class="container" v-if="Object.keys(state.userInfo).length>0">
      <div class="left">
        <img class="avatar" :src="getFileBaseUrl()+state.userInfo.avatar" alt="图片加载失败" @click="fileipt.click()"/>
        <input v-show="false" ref="fileipt" type="file" accept="image/*" @change="updateAvatar">
      </div>
      <div class="right">
        <div class="tr">
          <div class="td">用户id：</div>
          <div class="td">{{ state.userInfo.id }}</div>
        </div>
        <div class="tr">
          <div class="td">用户名：</div>
          <div class="td">{{ state.userInfo.username }}</div>
        </div>
        <div class="tr">
          <div class="td">昵称：</div>
          <div class="td"><input class="text" v-model.trim="state.userInfo.nickname"></div>
        </div>
        <!--<div class="tr">-->
        <!--  <div class="td">真实姓名：</div>-->
        <!--  <div class="td">{{ state.userInfo.realname }}</div>-->
        <!--</div>-->
        <div class="tr">
          <div class="td">电话：</div>
          <div class="td"><input class="text" v-model.trim="state.userInfo.tel"></div>
        </div>
        <div class="tr">
          <div class="td">邮箱：</div>
          <div class="td"><input class="text" v-model.trim="state.userInfo.email"></div>
        </div>
        <div class="tr">
          <div class="td">性别：</div>
          <div class="td">
            <label v-for="item in state.sexs" :key="item.id">
              <input type="radio" :value="item.value" v-model="state.userInfo.sex">
              <span>{{ item.label }}</span>
            </label>
          </div>
        </div>
        <div class="tr">
          <div class="td">生日：</div>
          <div class="td"><input type="date" v-model="state.userInfo.birth"></div>
        </div>
        <br/>
        <br/>
        <br/>
        <div>
          <FButton @click="submit">保存修改</FButton>
          <FButton @click="cancel">取消</FButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.update-info-container {
  > .container {
    display: flex;
    gap: $unit-8;

    > .left {
      .avatar {
        width: 240px;
        height: 240px;
        object-fit: contain;
        border-radius: 50%;
        box-shadow: $box-shadow-common-ddd;
        cursor: pointer;
      }
    }

    > .right {
      .tr {
        display: flex;
        align-items: center;
        gap: $unit-2;

        > .td {
          font-size: $font-fs;
          line-height: 2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:nth-child(1) {
            flex: none;
            width: 100px;
            text-align: right;
          }

          &:nth-child(2) {
            flex: auto;

            > input {
              &.text {
                @include input-text-small-line;
              }
            }
          }
        }
      }
    }
  }
}
</style>