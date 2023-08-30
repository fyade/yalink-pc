<script setup>
import { getSort } from 'api/sort.js'
import { computed, nextTick, onMounted, reactive } from "vue";
import FCascader from "comp/f-cascader/FCascader.vue";
import { addLinkApply, getLinkApplyList } from "api/link-apply.js";
import FMessage from "comp/f-message/FMessage.js";
import { flatObjectArray } from "utils/data-utils.js";
import { useDictStore } from "store/dict.js";

let state = reactive({
  sortList: [],
  sortFList: [],
  list: [],
  total: 0,
  form: {
    name: '',
    descr: '',
    url: '',
    ico: '',
    sortId: ''
  },
  labels: {
    name: '链接名',
    descr: '链接描述',
    url: '链接地址',
    ico: 'icon图标',
    sortId: '父分类'
  },
  queryParams: {
    pageNum: 1,
    pageSize: 10
  },
  submiting: false,
  applyStatus: []
})
const dictStore = useDictStore()

state.applyStatus = computed(() => dictStore.getDict('sys_link_apply_status'))

onMounted(() => {
  getSortInfo()
  getInfo()
})

const getInfo = () => {
  getLinkApplyList(state.queryParams).then(res => {
    if (state.queryParams.pageNum === 1) {
      state.list = res.data.list
    } else {
      state.list = [...state.list, ...res.data.list]
    }
    state.total = Number(res.data.total)
  })
}
const getSortInfo = () => {
  getSort().then(res => {
    state.sortList = res.data
    state.sortFList = flatObjectArray(state.sortList)
  })
}
const onSubmit = () => {
  if (!!!state.form.name) return FMessage.error('请填写链接名')
  if (!!!state.form.url) return FMessage.error('请填写链接地址')
  if (!!!state.form.sortId || state.sortFList.find(item => item.parentId === state.form.sortId)) return FMessage.error('请选择所属分类')
  state.submiting = true
  addLinkApply(state.form).then(res => {
    FMessage.success('提交成功')
    Object.keys(state.form).forEach(item => {
      state.form[item] = ''
    })
    nextTick().then(() => {
      state.submiting = false
    })
    getInfo()
  })
}
const loadmore = () => {
  state.queryParams.pageNum++
  getInfo()
}
const nodeClick = sort => {
  state.form.sortId = sort
}
</script>

<template>
  <div class="link-apply-container">
    <div class="listArea" v-if="state.total>0">
      <div class="title">
        <span>我共提交过{{ state.total }}次申请</span>
      </div>
      <div class="list">
        <div v-for="item in state.list" :key="item.id">
          <div>
            <img :src="item.ico"/>
            <p class="id">
              <span>id</span>
              <span :title="item.id">{{ item.id }}</span>
            </p>
            <p class="name">
              <span>链接名</span>
              <span :title="item.name">{{ item.name }}</span>
            </p>
            <p class="descr">
              <span>链接描述</span>
              <span :title="item.descr">{{ item.descr }}</span>
            </p>
            <p class="url">
              <span>链接地址</span>
              <span :title="item.url"><a :href="item.url" target="_blank">{{ item.url }}</a></span>
            </p>
            <!--<p class="sortId">-->
            <!--  <span>sortId</span>-->
            <!--  <span :title="item.sortId">{{ item.sortId }}</span>-->
            <!--</p>-->
            <p class="status">
              <span>状态</span>
              <span :title="item.status">{{ state.applyStatus.find(itm => itm.value === item.status).label }}</span>
            </p>
            <p v-if="item.status===2" class="msg">
              <span>msg</span>
              <span :title="item.msg">{{ item.msg }}</span>
            </p>
          </div>
        </div>
        <div style="cursor:pointer;" v-if="state.total>state.list.length" @click="loadmore">
          <div>加载更多</div>
        </div>
      </div>
    </div>
    <hr/>
    <div class="formArea">
      <form>
        <label>
          <span class="required">请输入链接名</span>
          <input v-model="state.form.name"/>
        </label>
        <label>
          <span>请输入链接描述</span>
          <input v-model="state.form.descr"/>
        </label>
        <label>
          <span class="required">请输入链接地址</span>
          <input v-model="state.form.url"/>
        </label>
        <label>
          <span>请输入icon链接</span>
          <input v-model="state.form.ico"/>
        </label>
        <label>
          <span class="required">请选择所属父分类</span>
          <FCascader v-if="!state.submiting" :data="state.sortList" :margin-left="16" @nodeClick="nodeClick"/>
        </label>
      </form>
      <FButton @click="onSubmit">提交</FButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
.link-apply-container {
  > .listArea {
    margin: 10px 0;
    width: 100%;
    overflow: auto;

    > .list {
      padding: 10px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 20px;

      > div {
        > div {
          position: relative;
          flex: none;
          padding: 10px;
          width: 240px;
          height: 200px;
          border-radius: 10px;
          box-shadow: $box-shadow-common-eee;
          overflow: hidden;

          > img {
            position: absolute;
            top: calc(100% - 100px + 10px);
            left: calc(-10px);
            width: 100px;
            aspect-ratio: 1;
            opacity: .1;
          }

          > p {
            @include text-overflow-ellipsis;
            line-height: 1.5;

            > span {
              &:nth-child(1) {
                color: $color-gray;

                &::after {
                  content: '：';
                }
              }

              &:nth-child(2) {
              }
            }
          }

          > .id {

          }

          > .name {
          }

          > .descr {
          }

          > .url {
          }

          > .ico {
          }

          > .sortId {
          }

          > .status {
          }

          > .msg {
          }
        }

        //&:first-child {
        //  padding-left: 20px;
        //}
        //
        //&:last-child {
        //  padding-right: 20px;
        //}
      }
    }
  }

  > .formArea {
    > form {
      display: flex;
      flex-direction: column;
      gap: $unit-5;

      label {
        display: flex;
        align-items: center;
        gap: 10px;

        > * {
          &:nth-child(1) {
            flex: none;
            width: 200px;
            text-align: right;

            &.required {
              &::after {
                content: "*";
                color: red;
              }
            }
          }

          &:nth-child(2) {
          }
        }

        > input {
          @include input-text-small-line;
        }
      }
    }
  }
}
</style>