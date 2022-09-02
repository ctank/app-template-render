<template>
  <el-form-item
    :label="title"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <el-checkbox
      class="atp-checkbox__all"
      v-if="extras.checkAll"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      :disabled="disabled"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-checkbox-group v-model="value" :disabled="disabled" @change="handleValueChange">
      <el-checkbox
        :label="option.value"
        v-for="(option, index) in filterOptions"
        :key="`${index}-${option.value}`"
        >{{ option.label }}</el-checkbox
      >
    </el-checkbox-group>
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import { getValueByPath } from '../../../utils/common'
import base from '../base.vue'

export default defineComponent({
  name: 'CheckBox',
  extends: base,
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },

    required: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      filterOptions: [],
      relateOptionFieldValue: '',
      // 全选
      checkAll: false,
      // 不确定状态
      isIndeterminate: false
    }
  },
  computed: {
    relateValue() {
      let relateValue = ''
      if (this.extras.relateOptionField) {
        const component = this.componentMap[this.extras.relateOptionField]
        relateValue = getValueByPath(this.formData, component.fieldPath)
      }
      return relateValue
    }
  },
  watch: {
    relateValue: function () {
      this.setFilterOptions()
    },
    'extras.options': function () {
      this.setFilterOptions()
    }
  },
  created() {
    this.setDefaultValue()
    this.setRules()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.setFilterOptions()
    },

    /**
     * [setRules 设置验证规则]
     */
    setRules() {
      if (this.rules) {
        const title = this.title

        if (this.required) {
          this.rules.push({
            required: true,
            message: `${title}不能为空`,
            trigger: 'blur'
          })
        }

        if (this.extras) {
          const minLimit = parseInt(this.extras.minLimit)
          const maxLimit = parseInt(this.extras.maxLimit)

          if (!isNaN(minLimit) && !isNaN(maxLimit)) {
            this.rules.push({
              validator: (rules, value, callback) => {
                if (
                  value &&
                  value instanceof Array &&
                  (value.length < minLimit || value.length > maxLimit)
                ) {
                  callback(`选择的数量必须在${minLimit}和${maxLimit}之间`)
                  return
                }
                callback()
              },
              trigger: 'change'
            })
          } else if (!isNaN(minLimit)) {
            this.rules.push({
              validator: (rules, value, callback) => {
                if (value && value instanceof Array && value.length < minLimit) {
                  callback(`至少选择${minLimit}个选项`)
                  return
                }
                callback()
              },
              trigger: 'change'
            })
          } else if (!isNaN(maxLimit)) {
            this.rules.push({
              validator: (rules, value, callback) => {
                if (value && value instanceof Array && value.length > maxLimit) {
                  callback(`最多可选择${maxLimit}个选项`)
                  return
                }
                callback()
              },
              trigger: 'change'
            })
          }
        }
      }
    },

    setDefaultValue() {
      if (!this.value) {
        const value = []
        for (let i = 0; i < this.extras.options.length; i++) {
          if (this.extras.options[i].isDefault) {
            value.push(this.extras.options[i].value)
          }
        }
        if (value && value.length) {
          this.onChange(value, this.id)
        }
      } else {
        this.setCheckAll()
      }
    },

    setCheckAll() {
      let isCheckAll = true
      if (this.filterOptions.length) {
        for (let i = 0; i < this.filterOptions.length; i++) {
          isCheckAll = this.value.includes(this.filterOptions[i].value)
          if (!isCheckAll) {
            break
          }
        }
      } else {
        isCheckAll = false
      }
      this.checkAll = isCheckAll
    },

    setFilterOptions() {
      const self = this
      let options = []
      if (this.extras.dataSource === 'api') {
        if (this.relateOptionFieldValue !== this.relateValue) {
          this.relateOptionFieldValue = this.relateValue
        }
        const paths = this.fieldPath.split('/')
        this.onGetValue(
          {
            id: this.id,
            field: paths[paths.length - 1] || '',
            relateValue: this.relateOptionFieldValue
          },
          (options) => {
            if (Array.isArray(options)) {
              setTimeout(() => {
                self.filterOptions = options
                self.setCheckAll()
              }, 0)
            }
          }
        )
      } else {
        if (this.extras.relateOptionField) {
          const filterOptions = this.extras.relateAvailableOptions[this.relateValue]
          if (filterOptions && filterOptions.length) {
            options = this.extras.options.filter(
              (option) => filterOptions.indexOf(option.value) >= 0
            )
          }
        } else {
          options = this.extras.options
        }
      }
      this.filterOptions = options
    },
    handleCheckAllChange(val) {
      const values = []
      this.filterOptions.forEach((item) => {
        values.push(item.value)
      })
      this.value = val ? values : []
      this.isIndeterminate = false
    },

    handleValueChange(value) {
      const checkedCount = value.length
      const values = []
      this.filterOptions.forEach((item) => {
        values.push(item.value)
      })
      this.checkAll = checkedCount === values.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < values.length
    }

    // onChange(val) {
    //   if (val !== this.value) {
    //     this.$emit('change', val, this.id)
    //   }
    // }
  }
})
</script>

<style>
.atp-checkbox__all {
  margin-right: 30px !important;
}
</style>
