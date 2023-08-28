<script setup>
import HeaderVue from '@/layout/header/Header.vue'
import FooterVue from '@/layout/footer/Footer.vue'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
</script>

<template>
  <div class="layout-container">
    <header>
      <div>
        <HeaderVue/>
      </div>
    </header>
    <div class="main">
      <router-view name="search"/>
      <router-view/>
    </div>
    <footer>
      <FooterVue/>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100%;

  > header {
    display: flex;
    height: 50px;
    box-shadow: 0 0 10px 3px #eee;
    border-bottom: 1px solid #eee;

    > div {
      @include max-width;
      margin: auto;
    }
  }

  > .main {
  }

  > footer {
  }
}
</style>