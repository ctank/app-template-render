<template>
  <div class="demo">
    <div>INDEX-DEMO</div>
    <div>{{ $route.query.test }}</div>
    <el-form
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >
      <form-render
        class="demo-ruleForm"
        :formData="formData"
        :layouts="formTemp.layouts"
        :componentMap="formTemp.componentMap"
        @change="handleValueChange"
        @getValue="handleValueGet"
      />

      <el-form-item>
        <el-button type="primary" @click="submitForm">Create</el-button>
        <el-button @click="resetForm">Reset</el-button>
      </el-form-item>
    </el-form>
    <div>{{ formData }}</div>
  </div>
</template>

<script>
import FormRender from '../formComponents/render.vue'
import ViewRender from '../viewComponents/render.vue'
import { isUndefined, isNull } from '@/utils/common'
import { formApi } from '@/api'

export default {
  name: 'IndexDemo',
  components: { FormRender, ViewRender },
  data() {
    return {
      formData: {
        demo: {
          test1: '',
          test2: '',
          test3: '',
          test4: '',
          test5: '',
          test6: '',
          test7: '',
          test8: ''
        }
      },
      rules: {
        // 'demo.test1': [
        //   {
        //     required: true,
        //     message: 'Please input Activity name',
        //     trigger: 'blur'
        //   }
        // ]
      },
      formTemp: { layouts: [], componentMap: {}, config: {} }
    }
  },
  mounted() {
    console.log('mounted-demo1')
    this.getFormTemplate()
  },
  methods: {
    async getFormTemplate() {
      const res = await formApi.getFormTemplate({
        api: 'test/api'
      })
      this.formTemp.layouts = res.data.layouts
      this.formTemp.componentMap = this.setComponentMap(res.data.layouts, res.data.components)
    },

    setComponentMap(layouts, components) {
      const obj = {}
      components.forEach((item) => {
        if (!obj[item.id]) {
          obj[item.id] = item
        }
      })
      layouts.forEach((layout) => {
        if (!obj[layout.id]) {
          obj[layout.id] = layout
        }
      })
      return obj
    },

    handleValueChange(val, id) {
      const component = this.formTemp.componentMap[id]
      if (component) {
        const paths = component.fieldPath.split('/')
        if (paths.length === 1) {
          this.formData[paths[0]] = val
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
              valueObj = this.formData[paths[i]]
            }
          }
        }
      }
    },

    async submitForm() {
      const formEl = this.$refs.ruleFormRef
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    },

    resetForm() {
      const formEl = this.$refs.ruleFormRef
      if (!formEl) return
      formEl.resetFields()
    }
  }
}
</script>

<style>
.demo {
  color: #ffaa00;
}
</style>
