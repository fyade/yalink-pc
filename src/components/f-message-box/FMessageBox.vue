<script setup>
import { nextTick, ref } from "vue"
import FButton from "comp/f-button/FButton.vue"

const props = defineProps({
  msg: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: 'Warning'
  },
  config: {
    type: Object,
    default: {
      closeOnClickModal: true
    }
  }
})
const emit = defineEmits(['confirm', 'cancel'])
let dialog = ref(null)
nextTick(() => {
  dialog.value?.showModal()
})

const clickBackdrop = () => {
  if (props.config.closeOnClickModal) {
    can()
  }
}
const con = () => {
  dialog.value?.close()
  emit('confirm')
}
const can = () => {
  dialog.value?.close()
  emit('cancel')
}
</script>

<template>
  <dialog ref="dialog" class="f-dialog-message-box" @click="clickBackdrop">
    <div class="f-message-box" @click.stop>
      <div class="header">
        <p>{{ title }}</p>
      </div>
      <div class="content">
        <div>{{ msg }}</div>
      </div>
      <div class="footer">
        <FButton @click="con">确认</FButton>
        <FButton @click="can">取消</FButton>
      </div>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.f-dialog-message-box {
  margin: auto;
  padding: $unit-2;
  width: 500px;
  border: none;
  outline: none;

  .f-message-box {
    > .header {
    }

    > .content {
    }

    > .footer {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
