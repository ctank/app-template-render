<template>
  <el-form-item :label="title" :class="required ? 'is-required' : ''">
    <el-radio-group v-model="value">
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
import { defineComponent } from 'vue'
import { getValueByPath } from '../../../utils/common'
import base from '../base.vue'

export default defineComponent({
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
      // 过滤关联选项
      if (this.extras.relateOptionField) {
        const component = this.componentMap[this.extras.relateOptionField]
        const componentValue = getValueByPath(this.formData, component.fieldPath)
        if (componentValue) {
          const filterOptions = this.extras.relateAvailableOptions[componentValue]
          if (filterOptions.length) {
            options = this.extras.options.filter((option) => {
              const show = filterOptions.indexOf(option.value) >= 0
              if (!show && option.value === this.value) {
                this.onChange(this.extras.options[0].value)
              }
              return show
            })
          }
        }
      }
      return options
    }
  },
  created() {
    this.setDefaultValue()
  },
  methods: {
    setDefaultValue() {
      if (!this.value) {
        let value = this.extras.options[0].value
        for (let i = 0; i < this.extras.options.length; i++) {
          if (this.extras.options[i].isDefault) {
            value = this.extras.options[i].value
            break
          }
        }
        this.onChange(value, this.id)
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
