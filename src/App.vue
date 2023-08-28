<script setup>
import { useAppStore } from "store/app.js"
import { computed } from "vue";

let appStore = useAppStore()
const show = computed(() => appStore.isRouterAlive)
</script>

<template>
  <router-view v-if="show"/>
</template>

<style scoped lang="scss">
</style>
