import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
  let tokenRef = ref('')

  return {
    tokenRef
  }
})