<template>
  <el-form-item
    :label="showTitle ? title : ''"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <el-select
      v-model="value"
      :placeholder="placeholder"
      :multiple="extras.multiple"
      :multiple-limit="multipleLimit"
      :disabled="disabled"
      :filterable="filterOption.filterable"
      :remote="filterOption.remote"
      :remoteMethod="filterOption.remoteMethod"
      :loading="loading"
      clearable
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
    showTitle: {
      type: Boolean,
      default() {
        return true
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
      loading: false
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
    multipleLimit() {
      let limit = 0
      if (this.extras.multiple) {
        if (this.extras.minLimit || this.extras.maxLimit) {
          limit = this.extras.maxLimit || 0
        }
      }
      return limit
    },
    filterOption() {
      const option = {
        filterable: false,
        remote: false
      }

      if (this.extras.filterable) {
        option.filterable = true
        if (this.extras.dataSource === 'api') {
          option.remote = true
          option.remoteMethod = this.remoteFilter
        }
      }
      return option
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
      if (!this.value || !this.value.length) {
        let value = ''
        if (this.extras.minLimit || this.extras.maxLimit) {
          value = []
          for (let i = 0; i < this.extras.options.length; i++) {
            if (this.extras.options[i].isDefault) {
              value.push(this.extras.options[i].value)
            }
          }
        } else {
          for (let i = 0; i < this.extras.options.length; i++) {
            if (this.extras.options[i].isDefault) {
              value = this.extras.options[i].value
              break
            }
          }
        }
        if (value && value.length) {
          this.onChange(value, this.id)
        }
      }
    },

    setFilterOptions() {
      const self = this
      let options = []
      if (this.extras.dataSource === 'api' && !this.extras.filterable) {
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

    remoteFilter(query) {
      if (query) {
        this.loading = true
        const self = this
        const paths = this.fieldPath.split('/')
        this.onGetValue(
          {
            id: this.id,
            field: paths[paths.length - 1] || '',
            relateValue: query
          },
          (options) => {
            this.loading = false
            if (Array.isArray(options)) {
              setTimeout(() => {
                self.filterOptions = options
              }, 0)
            }
          }
        )
      } else {
        this.filterOptions = []
      }
    }

    // onChange(val) {
    //   if (val !== this.value) {
    //     this.$emit('change', val, this.id)
    //   }
    // }
  }
})
</script>

<style></style>
