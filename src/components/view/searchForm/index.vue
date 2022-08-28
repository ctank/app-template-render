<template>
  <el-form
    class="atp-search-form"
    ref="searchForm"
    label-position="left"
    label-width="100px"
    :model="value"
    inline
  >
    <form-render
      :formData="value"
      :layouts="extras.layouts"
      :components="extras.components"
      @getValue="handleValueGet"
    />

    <div class="atp-search-form__action">
      <el-button
        @click="handleSearchBtnClick"
        class="search_btn"
        data-mark="筛选条件搜索按钮"
        type="primary"
        >搜索</el-button
      >
      <el-button @click="handleFormReset">重置</el-button>
    </div>
  </el-form>
</template>

<script>
import { defineComponent } from 'vue'
import FormRender from './render.vue'
import base from '../base.vue'
import { cloneDeep } from '../../../utils/common'

export default defineComponent({
  name: 'SearchForm',
  components: { FormRender },
  extends: base,
  data() {
    return {
      dataCache: {}
    }
  },
  created() {
    this.dataCache = cloneDeep(this.value)
  },
  methods: {
    handleValueGet(data, cb) {
      this.$emit('getValue', data, cb)
    },
    handleEvent(event, data, cb) {
      this.$emit(event, data, cb)
    },

    async handleSearchBtnClick() {
      if (this.extras.searchEvent) {
        this.onEvent(this.extras.searchEvent, this.value)
      } else {
        console.log(this.id, '未定义查询事件')
      }
    },

    handleFormReset() {
      const formEl = this.$refs.searchForm
      if (!formEl) return
      formEl.resetFields()
      // TODO: ElementPlus对部分组件重置有问题,临时手动赋值
      for (const key in this.dataCache) {
        this.value[key] = this.dataCache[key]
      }
    }
  }
})
</script>

<style lang="scss">
.atp-search-form {
  display: flex;
  align-items: flex-start;
  margin: 0 -8px;
  .search-component-render {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    flex-basis: auto;
    .el-form-item {
      width: 30%;
      min-width: 200px;
      margin: 0 8px 20px;
    }
  }
  .atp-search-form__action {
    padding-left: 12px;
    margin-left: 12px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    position: relative;
    &:before {
      content: '';
      display: block;
      border-left: 1px solid #e5e6eb;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 20px;
    }
    .el-button {
      margin: 0 8px 20px;
      + .el-button {
        margin-left: 8px;
      }
    }
  }
  + .atp-listview {
    border-top: 1px solid #e5e6eb;
    padding-top: 20px;
  }
}
</style>
