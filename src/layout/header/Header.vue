<script setup>
import FHoverDropDownMenu from 'comp/f-hover-drop-down-menu/FHoverDropDownMenu.vue'
import iconUser from '@/assets/icon/user.svg'
import { useUserStore } from "store/user.js"
import { useRouter } from "vue-router"

const router = useRouter()
const userStore = useUserStore()
let isLogin = userStore.isLogin
const logout = userStore.logout
</script>

<template>
  <div class="header-container">
    <div class="left">
      <FHoverDropDownMenu :has-list="false">
        <template #header>
          <div @click="router.push('/')">雅链</div>
        </template>
      </FHoverDropDownMenu>
      <FHoverDropDownMenu>
        <template #header>
          <div>收录申请</div>
        </template>
        <template #list>
          <!--<div @click="router.push('/apply/sort')">分类收录</div>-->
          <div @click="router.push('/apply/link')">链接收录</div>
        </template>
      </FHoverDropDownMenu>
    </div>
    <div class="center"></div>
    <div class="right">
      <FHoverDropDownMenu>
        <template #header>
          <img class="icon" :src="iconUser" alt="user"/>
        </template>
        <template #list>
          <div v-if="!isLogin" @click="router.push('/login')">登录</div>
          <template v-if="isLogin">
            <div @click="router.push('/user')">个人中心</div>
            <div @click="logout">退出</div>
          </template>
        </template>
      </FHoverDropDownMenu>
    </div>
  </div>
</template>

<style scoped lang="scss">
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    gap: $unit-2;
  }
}
</style>