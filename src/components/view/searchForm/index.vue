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
      @change="handleValueChange"
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
import FormRender from './render.vue'
import base from '../base.vue'
import { cloneDeep } from '../../../utils/common'

export default {
  name: 'SearchForm',
  components: { FormRender },
  extends: base,
  provide() {
    return {
      onChange: this.handleValueChange,
      onGetValue: this.handleValueGet
    }
  },
  data() {
    return {
      dataCache: {}
    }
  },
  created() {
    this.dataCache = cloneDeep(this.value)
  },
  methods: {
    handleValueChange(val, id) {
      const component = this.extras.components.find((item) => item.id === id)
      if (component) {
        const paths = component.fieldPath.split('/')
        if (paths.length === 1) {
          this.value[paths[0]] = val
        } else {
          let valueObj = null
          for (let i = 0; i < paths.length; i++) {
            if (i === paths.length - 1) {
              if (valueObj) {
                valueObj[paths[i]] = val
              }
              break
            }
            if (valueObj && valueObj[paths[i]]) {
              valueObj = valueObj[paths[i]]
            } else {
              valueObj = this.value[paths[i]]
            }
          }
        }
      }
    },

    handleValueGet(id, val) {
      const component = this.componentMap[id]
      if (val) {
        component.extras.options = [
          {
            value: '3',
            label: '接口三'
          }
        ]
      } else {
        component.extras.options = [
          {
            value: '1',
            label: '接口一'
          },
          {
            value: '2',
            label: '接口二'
          },
          {
            value: '3',
            label: '接口三'
          }
        ]
      }
    },

    async handleSearchBtnClick() {
      if (this.extras.searchEvent) {
        this.onBtnClick(this.extras.searchEvent, this.value)
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
}
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
