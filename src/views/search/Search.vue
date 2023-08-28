<script setup>
import { reactive } from "vue"
import { getSearchEngine } from "api/search-engine.js"

let state = reactive({
  searchEngineList: [],
  currentSearchEngine: '',
  val: ''
})

getSearchEngine().then(res => {
  state.searchEngineList = res.data
  state.currentSearchEngine = state.searchEngineList[0].id
})

const changeEngine = id => {
  state.currentSearchEngine = id
}
const search = () => {
  let info = state.searchEngineList.find(item => item.id === state.currentSearchEngine)
  if (!!state.val) {
    openUrl(`${info.url}${info.secondLevelUrl}?${info.paramKey}=${state.val}`)
  } else {
    openUrl(info.url)
  }
  // state.val = ''
}
const openUrl = url => {
  window.open(url)
}
</script>

<template>
  <div class="search-container">
    <div class="containerArea">
      <div class="main">
        <div class="choose">
          <div :class="state.currentSearchEngine===item.id?'choosed':''" v-for="item in state.searchEngineList"
               :key="item.id"
               @click="changeEngine(item.id)">{{ item.name }}
          </div>
        </div>
        <div class="search">
          <input v-model.trim="state.val" @keydown.enter="search"/>
          <button @click="search">{{ !!state.val ? '搜索' : '官网' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "index";
</style>