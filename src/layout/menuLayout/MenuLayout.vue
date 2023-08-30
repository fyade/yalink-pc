<script setup>
import { useRoute } from "vue-router"

defineProps({
  /**
   * 格式：
   * [
   *   { to: '', label: '' },
   *   ...
   * ]
   */
  menus: {
    type: Array,
    required: true
  }
})
const route = useRoute()
</script>

<template>
  <div class="menu-layout-container">
    <aside>
      <router-link v-for="item in menus" :key="item.to" :class="route.path===item.to?'choosed':''" :to="item.to">
        {{ item.label }}
      </router-link>
    </aside>
    <article>
      <slot/>
    </article>
  </div>
</template>

<style scoped lang="scss">
.menu-layout-container {
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
      @include box-unchoosed-1;
      width: 100%;
      height: $unit-8;
      line-height: $unit-8;
      text-align: center;
    }

    > .choosed {
      @include box-choosed-1;
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