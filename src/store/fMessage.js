import { defineStore } from "pinia"
import { ref } from "vue"

export const useFMessageStore = defineStore('fMessage', () => {
  /**
   * 最大数量
   * @type {number}
   */
  const maxCount = 3
  /**
   * 显示时长
   * @type {number}
   */
  const displayDuration = 3000
  let arr0 = ref([])

  const getArr0 = () => {
    return arr0.value
  }
  const pushArr0 = id => {
    arr0.value.push(id)
  }
  const shiftArr0 = () => {
    arr0.value.shift()
  }

  return {
    maxCount,
    displayDuration,
    getArr0,
    pushArr0,
    shiftArr0
  }
})