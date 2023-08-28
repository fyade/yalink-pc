<script setup>
import { useRoute } from "vue-router";

const route = useRoute()
const from = route.redirectedFrom?.path
const msg = `${from}不存在`
</script>

<template>
  <div class="404-container">
    <div>404</div>
    <div v-if="!!from">{{ msg }}</div>
  </div>
</template>

<style scoped lang="scss">

</style>