import { defineStore } from "pinia"
import { ref } from "vue"

export const useGlobalStore = defineStore('global', () => {
  let popupSearchShow = ref(false)

  const openPopupSearch = () => {
    popupSearchShow.value = true
  }
  const closePopupSearch = () => {
    popupSearchShow.value = false
  }

  return {
    popupSearchShow,
    openPopupSearch,
    closePopupSearch
  }
})