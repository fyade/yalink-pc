<script setup>
import { reactive } from "vue";
import FCascaderItem from "comp/f-cascader/FCascaderItem.vue";

const state = reactive({
  selectVal: ''
})

defineProps({
  data: {
    type: Array,
    required: true
  },
  marginLeft: {
    type: Number,
    default: 16
  }
})

const emits = defineEmits(['nodeClick'])

const onNodeClick = arg => {
  emits('nodeClick', arg)
}
</script>

<template>
  <div class="f-cascader">
    <select v-model="state.selectVal" @change.stop="onNodeClick(state.selectVal)">
      <option value="">--</option>
      <option v-for="item in data" :key="item.id" :value="item.id">{{ item.name }}</option>
    </select>
    <FCascaderItem
        v-if="!!state.selectVal"
        :data="data"
        :parent-id="state.selectVal"
        :on-node-click="onNodeClick"
    />
  </div>
</template>

<style scoped lang="scss">
.f-cascader {
  select {
    @include select-small;
  }

  > * {
    display: inline-block;
  }
}
</style>