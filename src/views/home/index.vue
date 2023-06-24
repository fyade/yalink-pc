<script setup>
import { getSearchEngine } from 'api/search-engine.js'
import { getSort } from 'api/sort.js'
import { getLinkByGroup, getLinkOfRootSort } from 'api/link.js'
import { reactive } from "vue";

let state = reactive({
  searchEngineList: [],
  currentSearchEngine: '',
  val: '',
  sortList: [],
  currentSort: '',
  linkList: []
})

getSearchEngine().then(res => {
  state.searchEngineList = res.data
  state.currentSearchEngine = state.searchEngineList[0].id
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

const changeSort = id => {
  state.currentSort = id
  getLink()
}
</script>

<template>
  <div class="searchArea">
    <div class="containerArea">
      <main>
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
      </main>
    </div>
  </div>
  <div class="linkArea containerArea">
    <main>
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
            <div v-for="itm in state.linkList.find(i=>i.sortId===item.id)?.links" :key="itm.id"
                 @click="openUrl(itm.url)">
              <div class="left"></div>
              <div class="right">
                <p>{{ itm.name }}</p>
                <p>{{ itm.descr }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped lang="scss">
.containerArea {
  @include maxWidth;
}

.searchArea {
  background-color: #fff;

  main {
    padding: 1rem 0;
    //background-image: url('@/assets/images/IMG_20210920_180519.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;

    > * {
      margin: 0 auto;
      width: 60%;
    }

    > .choose {
      display: flex;

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 30px;
        color: #aaa;
        cursor: pointer;
      }

      > .choosed {
        color: #000;
        text-decoration: underline;
      }
    }

    > .search {
      display: flex;
      height: 48px;
      border: 1px solid #eee;
      border-radius: 24px;
      overflow: hidden;

      > * {
        border: 0;
        outline: none;
      }

      > input {
        flex: auto;
        padding: 0 16px;
      }

      > button {
        flex: none;
        width: 80px;
        cursor: pointer;
      }
    }
  }
}

.linkArea {
  padding: 1rem 0;

  main {
    > .header {
      display: flex;

      > div {
        padding: 4px;
        cursor: pointer;

        &.choosed {
          color: red;
        }
      }
    }

    > .list {
      > div {
        margin-top: 1rem;

        > .title {
          line-height: 2;
        }

        > .linkList {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;

          > div {
            display: inline-block;
            width: 240px;
            height: 80px;
            background-color: #fff;
            border: 1px solid #eee;
            cursor: pointer;
            transition: all .2s;

            &:hover {
              box-shadow: 0 0 10px 3px #ddd;
              transform: translateY(-8px);
            }
          }
        }
      }
    }
  }
}
</style>