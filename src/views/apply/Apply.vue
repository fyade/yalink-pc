<script setup>
import { reactive } from "vue";
import MenuLayout from "@/layout/menuLayout/MenuLayout.vue";

const state = reactive({
  menus: [
    // { to: '/apply/sort', label: '分类收录' },
    { to: '/apply/link', label: '链接收录' }
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