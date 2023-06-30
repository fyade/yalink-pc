<script setup>
import search from '@/assets/icon/search2.svg'
import docDetail from '@/assets/icon/doc-detail.svg'

let props = defineProps(['name'])

let iconList = {
  search,
  doc: docDetail
}
const useIcon = name => {
  return iconList[name]
}
</script>

<template>
  <div class="main">
    <img :src="useIcon(name)"/>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;

  > * {
    margin: auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>