<template>
  <div class="apptemp-searchform">
    <el-form
      ref="searchForm"
      label-position="left"
      label-width="100px"
      :model="value"
      inline
      @keydown.enter.native.prevent="handleSearchBtnClick(form)"
    >
      <form-render
        :formData="value"
        :layouts="extras.layouts"
        :componentMap="extras.componentMap"
        @change="handleValueChange"
        @getValue="handleValueGet"
      />

      <el-form-item class="apptemp-searchform__btns">
        <div>
          <el-button
            @click="handleSearchBtnClick(form)"
            class="search_btn"
            data-mark="筛选条件搜索按钮"
            type="primary"
            >搜索</el-button
          >
          <el-button @click="handleFormReset">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
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
      const component = this.extras.componentMap[id]
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
        this.onBtnClick(this.extras.searchEvent, this.$refs.searchForm)
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

<style>
.apptemp-searchform .el-form-item__content {
  min-width: 200px;
}
</style>
