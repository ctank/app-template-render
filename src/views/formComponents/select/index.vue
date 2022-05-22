<template>
  <el-form-item :label="title" :required="required">
    <el-select v-model="value" :placeholder="placeholder" @change="onChange" clearable>
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
import { getValueByPath } from '@/utils/common'
import base from '../base'

export default {
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
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.setFilterOptions()
    },

    setFilterOptions() {
      let options = this.extras.options
      if (this.extras.dataSource === 'api') {
        if (this.relateOptionFieldValue !== this.relateValue) {
          this.relateOptionFieldValue = this.relateValue
          this.$emit('getValue', this.id, this.relateValue)
        }
      } else {
        const filterOptions = this.extras.relateAvailableOptions[this.relateValue]
        if (filterOptions && filterOptions.length) {
          options = this.extras.options.filter((option) => filterOptions.indexOf(option.value) >= 0)
        }
      }
      this.filterOptions = options
    },

    onChange(val) {
      if (val !== this.value) {
        this.$emit('change', val, this.id)
      }
    }
  }
}
</script>

<style></style>
