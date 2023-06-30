import { useUserStore } from "store/user.js"
import { useGlobalStore } from "store/global.js"

export default function useStore() {
  return {
    user: useUserStore(),
    global: useGlobalStore()
  }
}