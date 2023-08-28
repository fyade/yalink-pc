<script setup>
import { useUserStore } from "store/user.js"
import { computed, reactive, watch } from "vue"
import { getFileBaseUrl } from "utils/env.js"
import { deepClone } from "utils/objectUtils.js"
import { useDictStore } from "store/dict.js";

let state = reactive({
  userInfo: {},
  sexs: []
})

const userStore = useUserStore()
let dictStore = useDictStore();

state.sexs = computed(() => dictStore.getDict('user_sex'))

watch(() => userStore.state.userInfo, newVal => {
  state.userInfo = deepClone(newVal)
}, {
  immediate: true
})
</script>

<template>
  <div class="info-container">
    <div v-if="Object.keys(state.userInfo).length>0">
      <div class="left">
        <img class="avatar" :src="getFileBaseUrl()+state.userInfo.avatar" alt="图片加载失败"/>
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
          <div class="td">{{ state.userInfo.nickname }}</div>
        </div>
        <!--<div class="tr">-->
        <!--  <div class="td">真实姓名：</div>-->
        <!--  <div class="td">{{ state.userInfo.realname }}</div>-->
        <!--</div>-->
        <div class="tr">
          <div class="td">电话：</div>
          <div class="td">{{ state.userInfo.tel }}</div>
        </div>
        <div class="tr">
          <div class="td">邮箱：</div>
          <div class="td">{{ state.userInfo.email }}</div>
        </div>
        <div class="tr">
          <div class="td">性别：</div>
          <div class="td">{{ state.sexs?.find(item => item.value === state.userInfo.sex)?.label }}</div>
        </div>
        <div class="tr">
          <div class="td">生日：</div>
          <div class="td">{{ state.userInfo.birth }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.info-container {
  > div {
    display: flex;
    gap: $unit-8;

    > .left {
      .avatar {
        width: 240px;
        height: 240px;
        object-fit: contain;
        border-radius: 50%;
        box-shadow: $box-shadow-common-ddd;
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
          }
        }
      }
    }
  }
}
</style>