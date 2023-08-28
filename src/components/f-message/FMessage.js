import Message from "./FMessage.vue"
import { createApp } from "vue"
import { FMessageType } from "utils/enum.js"
import { generateFMessageId } from "utils/idUtils.js"
import { useFMessageStore } from "store/fMessage.js"
import pinia from "store";

const fMessageStore = useFMessageStore(pinia)

const maxCount = fMessageStore.maxCount
let arr0 = []

const FMessage = obj => {
  if (typeof obj === 'string') {
    func({
      type: FMessageType.DEFAULT,
      msg: obj
    })
  } else if (typeof obj === 'object') {
    func({
      type: Object.values(FMessageType).some(i => i === obj.type) ? obj.type : FMessageType.DEFAULT,
      msg: obj.msg
    })
  }
}
FMessage.message = msg => {
  func({
    type: FMessageType.MESSAGE,
    msg
  })
}
FMessage.success = msg => {
  func({
    type: FMessageType.SUCCESS,
    msg
  })
}
FMessage.warning = msg => {
  func({
    type: FMessageType.WARNING,
    msg
  })
}
FMessage.error = msg => {
  func({
    type: FMessageType.ERROR,
    msg
  })
}

const func = ({ type, msg }) => {
  // 具体逻辑
  const id = generateFMessageId()
  const div = document.createElement('teleport')
  div.setAttribute('to', 'body')
  div.setAttribute('data-id', id)
  document.body.appendChild(div)
  const app = createApp(Message, {
    id,
    type,
    msg
  })
  app.mount(div)
  if (arr0.length >= maxCount) {
    arr0[0].remove(0)
  }
  fMessageStore.pushArr0(id)
  arr0.push({
    id,
    remove: function (i) {
      clearTimeout(arr0[i].timer)
      app.unmount(div)
      div.remove()
      arr0.shift()
      fMessageStore.shiftArr0()
    },
    timer: setTimeout(() => {
      arr0[0].remove(0)
    }, fMessageStore.displayDuration)
  })
}

export default FMessage
