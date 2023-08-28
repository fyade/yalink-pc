<script setup>
import { useRoute } from "vue-router"

const route = useRoute()
</script>

<template>
  <div class="user-container">
    <aside>
      <router-link :class="route.path==='/user'?'choosed':''" to="/user">我的信息</router-link>
      <router-link :class="route.path==='/user/update-info'?'choosed':''" to="/user/update-info">修改资料</router-link>
      <router-link :class="route.path==='/user/update-psd'?'choosed':''" to="/user/update-psd">修改密码</router-link>
    </aside>
    <article>
      <router-view/>
    </article>
  </div>
</template>

<style scoped lang="scss">
.user-container {
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