<script setup>
defineProps({
  data: {
    type: Object,
    default: () => ({}),
    required: true
  },
  marginLeft: {
    type: Number,
    required: true
  },
  onNodeClick: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <div :style="{marginLeft:`${marginLeft}px`}" @click.stop="onNodeClick(data)">
    <span>{{ data.name }}</span>
    <div v-if="data.children.length>0">
      <FTreeItem
          v-for="item in data.children"
          :key="item.id"
          :data="item"
          :margin-left="marginLeft"
          :on-node-click="onNodeClick"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>