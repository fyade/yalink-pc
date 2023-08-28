<script setup>

</script>

<template>
  <div class="footer-container">
    <div>
      <p>&copy; FeiYang 2023</p>
      <a href="https://beian.miit.gov.cn/" target="_blank">苏ICP备2022016512号-2</a>
    </div>
    <div>
      <p>QQ群983465320</p>
      <a href="https://gitee.com/fyade/yalink-pc/issues" target="_blank">Gitee反馈</a>
      <router-link to="/thanks">致谢</router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">
.footer-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 3rem;
  padding: 1rem 0;
  background-color: #fff;
  user-select: text;
  border-top: 1px solid #eee;

  > div {
    > * {
      display: block;
      line-height: 1.5;
    }
  }
}
</style>