<script setup>
import FTreeItem from "comp/f-tree/FTreeItem.vue";

defineProps({
  data: {
    type: Array,
    default: [],
    required: true
  },
  marginLeft: {
    type: Number,
    default: 10
  }
})

const emits = defineEmits(['nodeClick'])

const onNodeClick = arg => {
  emits('nodeClick', arg)
}
</script>

<template>
  <div class="f-tree" v-for="item in data" :key="item.id">
    <FTreeItem
        :data="item"
        :margin-left="marginLeft"
        :on-node-click="onNodeClick"
    />
  </div>
</template>

<style scoped lang="scss">
</style>