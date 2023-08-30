<script setup>
import MenuLayout from "@/layout/menuLayout/MenuLayout.vue";
import { reactive } from "vue";

const state = reactive({
  menus: [
    { to: '/user', label: '我的信息' },
    { to: '/user/update-info', label: '修改资料' },
    { to: '/user/update-psd', label: '修改密码' }
  ]
})
</script>

<template>
  <MenuLayout :menus="state.menus">
    <router-view/>
  </MenuLayout>
</template>

<style scoped lang="scss">
</style>