<script setup>
defineProps({
  label: {
    type: String
  }
})
</script>

<template>
  <div class="f-form-item">
    <div class="left">{{ label }}</div>
    <div class="right">
      <slot/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.f-form-item {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 40px;

  > .left {
    width: 160px;
    text-align: right;
  }
}
</style>