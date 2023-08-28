<script setup>
let props = defineProps({
  hasList: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="f-hover-drop-down-menu">
    <div class="header">
      <slot name="header">
        <!--<div>header</div>-->
      </slot>
    </div>
    <div v-if="props.hasList" class="listArea">
      <div class="list">
        <slot name="list">
          <!--<div>list</div>-->
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.f-hover-drop-down-menu {
  position: relative;

  &:hover {
    > .listArea {
      padding-top: 0;
      visibility: visible;
      pointer-events: auto;

      &::before {
        opacity: 1;
        border-bottom-color: rgba(255, 255, 255, 1);
      }

      > .list {
        opacity: 1;
      }
    }
  }

  > .header {
    height: 100%;
    cursor: pointer;
  }

  > .listArea {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    padding-top: 30px;
    visibility: hidden;
    pointer-events: none;
    transition: all $transition-time ease-out;

    &::before {
      content: "";
      display: block;
      box-sizing: border-box;
      margin-left: 20px;
      width: 10px;
      height: 5px;
      border: 5px solid;
      border-color: transparent;
      border-top: none;
      opacity: 0;
      transition: all $transition-time ease-out;
    }

    > .list {
      padding: $unit-2;
      background-color: #fff;
      border-radius: $unit-2;
      opacity: 0;
      box-shadow: $box-shadow-common-eee;
      transition: all $transition-time ease-out;

      &:slotted(>div) {
        line-height: 1.5;
        min-width: 80px;
        max-width: 160px;
        font-size: $font-fs-14;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        &:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>