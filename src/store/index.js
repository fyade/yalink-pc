import { useUserStore } from "store/user.js";

export default function useStore() {
  return {
    user: useUserStore()
  }
}