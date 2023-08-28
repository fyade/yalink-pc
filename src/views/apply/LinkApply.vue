<script setup>
import { getSort } from 'api/sort.js'
import { nextTick, onMounted, reactive } from "vue";
import FCascader from "comp/f-cascader/FCascader.vue";
import { addLinkApply, getLinkApplyList } from "api/link-apply.js";
import FMessage from "comp/f-message/FMessage.js";
import { flatObjectArray } from "utils/data-utils.js";

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
  submiting: false
})

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
    <div class="listArea">
      <div class="title">
        <span>我共提交过{{ state.total }}次申请</span>
      </div>
      <div class="list">
        <div v-for="item in state.list" :key="item.id">
          <div>
            <p>{{ item.id }}</p>
            <p>{{ item.name }}</p>
            <p>{{ item.descr }}</p>
            <p>{{ item.url }}</p>
            <p>{{ item.ico }}</p>
            <p>{{ item.sortId }}</p>
            <p>{{ item.status }}</p>
            <p>{{ item.msg }}</p>
          </div>
        </div>
        <div style="cursor:pointer;" v-if="state.total>state.list.length" @click="loadmore">
          <div>加载更多</div>
        </div>
      </div>
    </div>
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
          flex: none;
          padding: 10px;
          width: 240px;
          height: 200px;
          border-radius: 10px;
          box-shadow: $box-shadow-common-eee;
          overflow: auto;
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
          @include input-text-small;
        }
      }
    }
  }
}
</style>