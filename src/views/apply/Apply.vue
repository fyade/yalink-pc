<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <div class="apply-container">
    <aside>
      <!--<router-link :class="route.path==='/apply/sort'?'choosed':''" to="/apply/sort">分类收录</router-link>-->
      <router-link :class="route.path==='/apply/link'?'choosed':''" to="/apply/link">链接收录</router-link>
    </aside>
    <article>
      <router-view/>
    </article>
  </div>
</template>

<style scoped lang="scss">
.apply-container {
  @include max-width;
  display: flex;
  height: 100%;

  > aside {
    flex: none;
    display: flex;
    flex-direction: column;
    width: 120px;
    height: 100%;
    overflow: auto;

    > * {
      @include text-unchoosed;
      width: 100%;
      height: $unit-8;
      line-height: $unit-8;
      text-align: center;
    }

    > .choosed {
      @include text-choosed;
    }
  }

  > article {
    padding: $unit-2;
    flex: auto;
    height: 100%;
    overflow: auto;
  }
}
</style>