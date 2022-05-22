<template>
  <el-form-item :label="title" :required="required">
    <el-radio-group v-model="value" @change="onChange">
      <el-radio
        v-for="(option, index) in showOptions"
        :key="`${index}-${option.value}`"
        :label="option.value"
        >{{ option.label }}</el-radio
      >
    </el-radio-group>
  </el-form-item>
</template>

<script>
import { getValueByPath } from '@/utils/common'
import base from '../base'

export default {
  name: 'Radio',
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
      filterOptions: []
    }
  },
  computed: {
    showOptions() {
      let options = this.extras.options
      if (this.extras.relateOptionField) {
        const component = this.componentMap[this.extras.relateOptionField]
        const componentValue = getValueByPath(this.formData, component.fieldPath)

        if (componentValue) {
          const filterOptions = this.extras.relateAvailableOptions[componentValue]
          if (filterOptions.length) {
            options = this.extras.options.filter(
              (option) => filterOptions.indexOf(option.value) >= 0
            )
          }
        }
      }
      return options
    }
  },
  mounted() {
    // this.input = this.value
  },
  methods: {
    onChange(val) {
      if (val !== this.value) {
        this.$emit('change', val, this.id)
      }
    }
  }
}
</script>

<style></style>
