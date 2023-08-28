<script setup>
import Icon from "comp/icon/Icon.vue"
import PopupSearch from 'comp/f-popup-search/FPopupSearch.vue'
import { reactive } from "vue"
import { getSort } from "api/sort.js"
import { getLinkOfRootSort } from "api/link.js"
import { useGlobalStore } from "store/global.js"

let state = reactive({
  sortList: [],
  currentSort: '',
  linkList: [],
  popupLink: {}
})

getSort().then(res => {
  state.sortList = res.data
  state.currentSort = state.sortList[0].id
  getLink()
})

const getLink = () => {
  getLinkOfRootSort(state.currentSort).then(res => {
    state.linkList = res.data
  })
}

const changeSort = id => {
  state.currentSort = id
  getLink()
}
const linkSearch = obj => {
  state.popupLink = obj
  useGlobalStore().openPopupSearch()
}
const openUrl = url => {
  window.open(url)
}
</script>

<template>
  <div class="link-container">
    <div class="linkArea">
      <div class="header">
        <div :class="state.currentSort===item.id?'choosed':''" v-for="item in state.sortList" :key="item.id"
             @click="changeSort(item.id)">
          {{ item.name }}
        </div>
      </div>
      <div class="list">
        <template v-if="state.sortList.length===0">
          <div>加载中...</div>
        </template>
        <template v-else>
          <div v-for="item in state.sortList.find(i=>i.id===state.currentSort)?.children" :key="item.id">
            <div class="title">{{ item.name }}</div>
            <template v-if="state.linkList.length===0">
              <div>加载中...</div>
            </template>
            <template v-else>
              <div class="linkList">
                <div class="linkBox" v-for="itm in state.linkList.find(i=>i.sortId===item.id)?.links" :key="itm.id"
                     @click="openUrl(itm.url)">
                  <div class="left">
                    <img v-lazy="itm.ico" alt=""/>
                  </div>
                  <div class="right">
                    <p class="title">{{ itm.name }}</p>
                    <p class="descr">{{ itm.descr }}</p>
                    <div class="func">
                      <Icon v-if="!!itm.docUrl" name="doc" @click.stop="openUrl(itm.docUrl)"/>
                      <!--<Icon v-if="!!itm.siteSearch" name="search" @click.stop="linkSearch(itm)"/>-->
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>

  <PopupSearch
      :name="state.popupLink.name"
      :url="state.popupLink.url"
      :site-search="state.popupLink.siteSearch"
  />
</template>

<style scoped lang="scss">
@import "index";
</style>