<script setup>
import HeaderVue from 'comp/header/Index.vue'
import FooterVue from 'comp/footer/Index.vue'
import { useRoute, useRouter } from "vue-router"

const route = useRoute()
</script>

<template>
  <main>
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
  </main>
</template>

<style scoped lang="scss">
main {
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
    background-color: #efefef;
  }

  > footer {
  }
}
</style>