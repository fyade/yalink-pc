<script setup>
import { reactive } from "vue"
import { useGlobalStore } from "store/global.js"

let props = defineProps({
  name: {
    type: String,
    // required: true
  },
  url: {
    type: String,
    // required: true
  },
  siteSearch: {
    type: String,
    // required: true
  }
})

let state = reactive({
  val: ''
})

const search = () => {
  if (!!state.val) {
    window.open(`${props.siteSearch}${state.val}`)
  } else {
    window.open(props.url)
  }
  // state.val = ''
}

const close = () => {
  useGlobalStore().closePopupSearch()
}
</script>

<template>
  <teleport v-if="useGlobalStore().popupSearchShow" to="body">
    <div class="f-popup-search" @click="close">
      <div class="search-box" @click.stop>
        <div class="title">{{ props.name }}</div>
        <div class="search">
          <input v-model.trim="state.val" @keydown.enter="search"/>
          <button @click="search">{{ !!state.val ? '搜索' : '官网' }}</button>
        </div>
        <div class="descr">输入内容后回车，可跳转至站内搜索。</div>
      </div>
    </div>
  </teleport>
</template>

<style scoped lang="scss">
.f-popup-search {
  display: flex;
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .1);

  > .search-box {
    margin: auto;
    padding: $unit-12;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $unit-2;
    width: 600px;
    height: 200px;
    background-color: #fff;
    border-radius: $unit-2;

    > .title {
    }

    > .search {
      display: flex;
      width: 100%;
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

    > .descr {
      color: #999;
    }
  }
}
</style>