import MessageBox from "./FMessageBox.vue"
import { createApp } from "vue"

const FMessageBox = {
  confirm: obj => {
    let msg, title, config
    if (typeof obj === 'string') {
      msg = obj
    } else if (typeof obj === 'object') {
      ({ msg, title, config } = obj)
    }
    return new Promise((resolve, reject) => {
      const div = document.createElement('teleport')
      div.setAttribute('to', 'body')
      document.body.appendChild(div)
      const app = createApp(MessageBox, {
        msg,
        title,
        config,
        onConfirm() {
          app.unmount(div)
          div.remove()
          resolve('confirm')
        },
        onCancel() {
          app.unmount(div)
          div.remove()
          reject('cancel')
        }
      })
      app.mount(div)
    })
  }
}

export default FMessageBox
