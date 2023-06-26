<script setup>
import iconUser from '@/assets/icon/user.svg'
</script>

<template>
  <main>
    <div class="left">
      <p>雅链</p>
    </div>
    <div class="center"></div>
    <div class="right">
      <img class="icon" :src="iconUser" alt="user"/>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>