<script setup>

</script>

<template>
  <div class="f-form">
    <slot/>
  </div>
</template>

<style scoped lang="scss">
.f-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>