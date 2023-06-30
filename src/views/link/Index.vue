<script setup>
import Icon from "comp/icon/Index.vue";
import PopupSearch from 'comp/popup-search/Index.vue'
import { reactive } from "vue";
import { getSort } from "api/sort.js";
import { getLinkOfRootSort } from "api/link.js";
import { useGlobalStore } from "store/global.js";

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
  <div class="linkArea containerArea">
    <div class="header">
      <div :class="state.currentSort===item.id?'choosed':''" v-for="item in state.sortList" :key="item.id"
           @click="changeSort(item.id)">
        {{ item.name }}
      </div>
    </div>
    <div class="list">
      <div v-for="item in state.sortList.find(i=>i.id===state.currentSort)?.children" :key="item.id">
        <div class="title">{{ item.name }}</div>
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
                <Icon v-if="!!itm.siteSearch" name="search" @click.stop="linkSearch(itm)"/>
              </div>
            </div>
          </div>
        </div>
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
.containerArea {
  @include max-width;
}

.linkBox {
  display: inline-flex;
  gap: $unit-3;
  padding: $unit-2;
  width: 240px;
  height: 100px;
  background-color: $color-white-deepmost;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    box-shadow: 0 2px 10px 3px #ddd;
  }

  > .left {
    flex: none;
    width: $unit-8;
    height: $unit-8;

    > img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  > .right {
    flex: 1;
    width: 0;

    > .title {
      height: $unit-6;
      line-height: $unit-6;
      font-size: $font-fs;
      @include text-overflow-ellipsis;
    }

    > .descr {
      margin-top: $unit-3;
      height: $unit-4;
      color: $font-c-gray;
      line-height: $unit-4;
      font-size: $font-fs-small;
      @include text-overflow-ellipsis;
    }

    > div {
      display: flex;
      justify-content: flex-end;
      gap: $unit-3;
      margin-top: $unit-3;

      > * {
        width: $unit-4;
        height: $unit-4;
      }
    }
  }
}


.linkArea {
  padding: 1rem 0;

  > .header {
    display: flex;
    align-items: flex-end;

    > div {
      @include text-unchoosed;
      padding: 4px;
      cursor: pointer;

      &.choosed {
        @include text-choosed;
      }
    }
  }

  > .list {
    margin-top: $unit-4;
    display: grid;
    gap: $unit-4;

    > div {
      > .title {
        line-height: 2;
      }

      > .linkList {
        display: flex;
        flex-wrap: wrap;
        gap: $unit-6;

        > div {
        }
      }
    }
  }
}
</style>