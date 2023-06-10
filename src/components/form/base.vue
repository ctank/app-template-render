<template>
  <div></div>
</template>

<script>
import { getValueByPath } from '../../utils/common'

export default {
  name: 'FormComponentBase',
  components: {},
  inject: ['onChange', 'onGetValue', 'onEvent'],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    },
    // 控件类型
    type: {
      type: String,
      default() {
        return ''
      }
    },
    // 业务属性
    extras: {
      type: Object,
      default() {
        return {}
      }
    },
    // 占位符
    placeholder: {
      type: String,
      default() {
        return '请输入'
      }
    },
    // 验证规则
    rules: {
      type: Array,
      default() {
        return []
      }
    },
    // 字段路径
    fieldPath: {
      type: String,
      default() {
        return ''
      }
    },
    // 控件集合
    componentMap: {
      type: Object,
      default() {
        return {}
      }
    },
    // 子表单控件集合
    subFormComponents: {
      type: Array,
      default() {
        return []
      }
    },
    // 数据
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    // 禁用
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    },
    // 临时值
    tempVal: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    // 字段id
    value: {
      get() {
        let value = ''
        if (this.formData && this.fieldPath) {
          value = getValueByPath(this.formData, this.fieldPath)
        }
        return value
      },
      set(val) {
        if (this.tempVal) {
          this.$emit('tempChange', val, this.id)
        } else {
          this.onChange(val, this.id)
        }
      }
    },
    validProp() {
      return this.fieldPath.replace(/\//g, '.')
    }
  }
}
</script>

<style></style>
