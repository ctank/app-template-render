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
        :formData="formData"
        :layouts="layouts"
        :componentMap="componentMap"
        @change="handleValueChange"
        @getValue="handleValueGet"
      />
    </el-form>
    <div>{{ formData }}</div>
  </div>
</template>

<script>
import FormRender from './formComponents/render.vue'
import { isUndefined, isNull } from '@/utils/common'
import { formApi } from '@/api'

export default {
  name: 'IndexDemo',
  components: { FormRender },
  data() {
    return {
      layouts: [],
      componentMap: {},
      config: {},
      formData: {
        demo: {
          test1: '11111',
          test2: '22222',
          test3: ''
        },
        demo2: {
          radio1: '2',
          radio2: 'c'
        },
        demo3: {
          select: {
            s1: '1',
            s2: '2'
          }
        }
      },
      rules: {
        'demo.test1': [
          {
            required: true,
            message: 'Please input Activity name',
            trigger: 'blur'
          }
        ]
      }
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
      this.layouts = res.data.layouts
      this.componentMap = this.setComponentMap(res.data.layouts, res.data.components)
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
      const component = this.componentMap[id]
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
    }
  }
}
</script>

<style>
.demo {
  color: #ffaa00;
}
</style>
