import { defineStore } from "pinia"
import { nextTick, ref } from "vue"

export const useAppStore = defineStore('app', () => {
  let isRouterAlive = ref(true)

  const refresh = () => {
    isRouterAlive.value = false
    nextTick().then(() => {
      isRouterAlive.value = true
    })
  }

  return {
    isRouterAlive,
    refresh
  }
})
