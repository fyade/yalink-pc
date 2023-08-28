import { createPinia } from "pinia"
import { useAppStore } from "store/app.js"
import { useDictStore } from "store/dict.js";
import { useUserStore } from "store/user.js"
import { usePageStore } from "store/page.js"
import { useGlobalStore } from "store/global.js"
import { useFMessageStore } from "store/fMessage.js"

export function useStore() {
  return {
    app: useAppStore(),
    dict: useDictStore(),
    user: useUserStore(),
    page: usePageStore(),
    global: useGlobalStore(),
    fMessage: useFMessageStore()
  }
}

const pinia = createPinia();
export default pinia