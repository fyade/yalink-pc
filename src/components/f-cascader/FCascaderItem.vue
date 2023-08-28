<script setup>
import { reactive, watch } from "vue";

const state = reactive({
  selectVal: ''
})

defineProps({
  data: {
    type: Array,
    required: true
  },
  parentId: {
    type: String,
    required: true
  },
  onNodeClick: {
    type: Function,
    required: true
  }
})
</script>

<template>
  <select
      v-if="data.find(itm => itm.id === parentId).children.length>0"
      v-model="state.selectVal"
      @change.stop="onNodeClick(state.selectVal)"
  >
    <option value="">--</option>
    <option v-for="item in data.find(itm=>itm.id===parentId).children" :key="item.id" :value="item.id">
      {{ item.name }}
    </option>
  </select>
  <FCascaderItem
      v-if="!!state.selectVal && data.find(itm => itm.id === parentId).children.length>0"
      :data="data.find(itm=>itm.id===parentId).children"
      :parent-id="state.selectVal"
      :on-node-click="onNodeClick"
  />
</template>

<style scoped lang="scss">
select {
  @include select-small;
}
</style>