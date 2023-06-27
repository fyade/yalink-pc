<script setup>

</script>

<template>
  <main>
    <div>
      <p>&copy; FeiYang 2023</p>
      <a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2022016512号-2</a>
    </div>
    <div>
      <p>QQ群983465320</p>
      <a href="https://gitee.com/fyade/yalink-pc/issues" target="_blank">Gitee反馈</a>
    </div>
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  padding: 1rem 0;
  background-color: #fff;
  user-select: text;

  > div {
    > p, a {
      line-height: 1.5;
    }
  }
}
</style>