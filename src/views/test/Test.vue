<script setup>
import FMessageBox from "comp/f-message-box/FMessageBox.js"
import FMessage from "comp/f-message/FMessage.js"

const testa = () => {
  FMessageBox.confirm('dialog测试').then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
}
const testb1 = () => {
  FMessage('message提示测试message')
}
const testb2 = () => {
  FMessage.message('message提示测试message')
}
const testb3 = () => {
  FMessage.success('message提示测试success')
}
const testb4 = () => {
  FMessage.warning('message提示测试warning')
}
const testb5 = () => {
  FMessage.error('message提示测试error')
}
const testb6 = () => {
  FMessage({ msg: 'message提示测试message' })
}
</script>

<template>
  <br/>
  <div style="display: flex;gap: 1rem;">
    <FButton @click="testa">default</FButton>
    <FButton type="primary">primary</FButton>
    <FButton type="success">success</FButton>
    <FButton type="info">info</FButton>
    <FButton type="warning">warning</FButton>
    <FButton type="danger">danger</FButton>
  </div>
  <br/>
  <div style="display: flex;gap: 1rem;">
    <FButton plain @click="testb1">普通</FButton>
    <FButton type="primary" plain @click="testb2">确认</FButton>
    <FButton type="success" plain @click="testb3">成功</FButton>
    <FButton type="info" plain @click="testb4">信息</FButton>
    <FButton type="warning" plain @click="testb5">警告</FButton>
    <FButton type="danger" plain @click="testb6">危险</FButton>
  </div>
  <br/>
  <div style="display: flex;gap: 1rem;">
    <FButton size="small">普通</FButton>
    <FButton size="small" type="primary">确认</FButton>
    <FButton size="small" type="success">成功</FButton>
    <FButton size="small" type="info">信息</FButton>
    <FButton size="small" type="warning">警告</FButton>
    <FButton size="small" type="danger">危险</FButton>
  </div>
  <br/>
  <div style="display: flex;gap: 1rem;">
    <FButton size="large" plain>普通</FButton>
    <FButton size="large" type="primary" plain>确认</FButton>
    <FButton size="large" type="success" plain>成功</FButton>
    <FButton size="large" type="info" plain>信息</FButton>
    <FButton size="large" type="warning" plain>警告</FButton>
    <FButton size="large" type="danger" plain>危险</FButton>
  </div>
  <br/>
  <div>
    <input>
  </div>
</template>

<style scoped lang="scss">
</style>
