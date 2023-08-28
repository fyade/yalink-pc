<script setup>
import { FButtonSize, FButtonType } from "utils/enum.js"
import { computed } from "vue"

let props = defineProps({
  type: {
    type: String,
    default: 'defaultType',
    validator(value) {
      return Object.values(FButtonType).includes(value)
    }
  },
  plain: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'defaultSize',
    validator(value) {
      return Object.values(FButtonSize).includes(value)
    }
  }
})

const classNames = computed(() => {
  let str = ''
  if (!!props.type) str += props.type
  if (!!props.plain) str += ` plain`
  if (!!props.size) str += ` ${props.size}`
  return str
})
</script>

<template>
  <div class="f-button" :class="classNames">
    <slot>Button</slot>
  </div>
</template>

<style scoped lang="scss">
@import "FButton";
</style>