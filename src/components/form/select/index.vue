<template>
  <el-form-item
    :label="title"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <el-select
      v-model="value"
      :placeholder="placeholder"
      clearable
      :multiple="multipleConfig.multiple"
      :multiple-limit="multipleConfig.limit"
    >
      <el-option
        v-for="(option, index) in filterOptions"
        :key="`${index}-${option.value}`"
        :label="option.label"
        :value="option.value"
      >
      </el-option>
    </el-select>
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import { getValueByPath } from '../../../utils/common'
import base from '../base.vue'

export default defineComponent({
  name: 'Select',
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
      relateOptionFieldValue: ''
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
    },
    multipleConfig() {
      const config = {
        multiple: false,
        limit: 0
      }
      if (this.extras.minLimit || this.extras.maxLimit) {
        config.multiple = true
        config.limit = this.extras.maxLimit || this.extras.minLimit
      }
      return config
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
      let value = ''
      if (this.extras.minLimit || this.extras.maxLimit) {
        value = []
        for (let i = 0; i < this.extras.options.length; i++) {
          if (this.extras.options[i].isDefault) {
            value.push(this.extras.options[i].value)
          }
        }
      }else{
        for (let i = 0; i < this.extras.options.length; i++) {
          if (this.extras.options[i].isDefault) {
            value = this.extras.options[i].value
            break
          }
        }
      }
      if (value || value.length) {
        this.onChange(value, this.id)
      }
    },

    setFilterOptions() {
      let options = []
      if (this.extras.dataSource === 'api') {
        if (this.relateOptionFieldValue !== this.relateValue) {
          this.relateOptionFieldValue = this.relateValue
          this.$emit('getValue', this.id, this.relateValue)
        }
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

    // onChange(val) {
    //   if (val !== this.value) {
    //     this.$emit('change', val, this.id)
    //   }
    // }
  }
})
</script>

<style></style>
