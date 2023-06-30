<script setup>
import { reactive } from "vue";
import { getSearchEngine } from "api/search-engine.js";

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
</template>

<style scoped lang="scss">
.containerArea {
  @include max-width;
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
      align-items: flex-end;

      > div {
        @include text-unchoosed;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 30px;
        cursor: pointer;
      }

      > .choosed {
        @include text-choosed;
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
</style>