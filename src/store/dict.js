import { defineStore } from "pinia";
import { computed, nextTick, reactive } from "vue";
import { getAllDictData, getDictData } from "api/common.js";

export const useDictStore = defineStore('dict', () => {
  let state = reactive({
    dicts: {}
  })

  getAllDictData().then(res => {
    const data = res.data
    if (data.length > 0) {
      let types = []
      data.forEach(item => {
        if (types.indexOf(item.type) === -1) types.push(item.type)
      })
      types.forEach(item => {
        state.dicts[item] = data.filter(itm => itm.type === item)
      })
    }
  })

  const getDict = computed(() => (type) => {
    return state.dicts[type]
  })

  return {
    getDict
  }
})
