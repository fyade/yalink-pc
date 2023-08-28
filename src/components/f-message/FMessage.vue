<script setup>
import { FMessageType } from "utils/enum.js"
import { computed, nextTick, ref, watch } from "vue"
import { useFMessageStore } from "store/fMessage.js"

const fMessageStore = useFMessageStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: FMessageType.DEFAULT,
    validator(value) {
      return Object.values(FMessageType).includes(value)
    }
  },
  msg: {
    type: String,
    required: true
  }
})

let topRef = ref(-50)
const classNames = computed(() => {
  let str = ''
  str += `${props.type}`
  return str
})

let index = computed(() => fMessageStore.getArr0().indexOf(props.id))
watch(index, () => {
  topRef.value = 50 * index.value + 10
})
</script>

<template>
  <div
      :data-id="id"
      class="f-message"
      :class="classNames"
      :style="{top:`${topRef}px`}"
      v-html="msg"
  >
  </div>
</template>

<style scoped lang="scss">
.f-message {
  position: fixed;
  left: 50%;
  padding: 0 24px;
  display: flex;
  align-items: center;
  transform: translateX(-50%);
  width: auto;
  height: 40px;
  border: 1px solid;
  border-radius: 4px;
  transition: top $transition-time;

  &.message {
    color: #a2a4aa;
    background-color: #f4f4f5;
    border-color: #a2a4aa;
  }

  &.success {
    color: #67c23a;
    background-color: #f0f9eb;
    border-color: #67c23a;
  }

  &.warning {
    color: #e6a23c;
    background-color: #fdf6ec;
    border-color: #e6a23c;
  }

  &.error {
    color: #f56c6c;
    background-color: #fef0f0;
    border-color: #f56c6c;
  }
}
</style>