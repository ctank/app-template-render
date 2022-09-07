<template>
  <el-row :gutter="10">
    <el-col v-for="(col, i) in children" :key="`col-${i}`" :span="24 / extras.size">
      <template v-for="(item, j) in col.children">
        <form-component-render
          v-if="getComponentDisplay(componentMap[item.id])"
          :key="`col-item-${j}`"
          :formData="formData"
          :component="componentMap[item.id]"
          :componentMap="componentMap"
          :disabled="getComponentDisabled(componentMap[item.id])"
        />
      </template>
    </el-col>
  </el-row>
</template>

<script>
import { defineComponent } from 'vue'
import { setValueByPath, getComponentStatus } from '../../../utils/common'
import { LAYOUT_TYPES } from '../../../utils/constant'
import base from '../base.vue'

export default defineComponent({
  name: 'Row',
  extends: base,
  props: {
    children: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    getComponentDisplay(item) {
      let show = true
      if (item && !LAYOUT_TYPES.includes(item.type)) {
        show = getComponentStatus(item.extras.showConfig, this.formData, this.componentMap)
        if (!show) {
          if (!this.components.some((component) => component.fieldPath === item.fieldPath)) {
            setValueByPath(this.formData, item.fieldPath, '')
          }
        }
      }
      return show
    },
    getComponentDisabled(item) {
      let disabled = false
      if (item && !LAYOUT_TYPES.includes(item.type)) {
        disabled = getComponentStatus(item.extras.readonlyConfig, this.formData, this.componentMap, disabled)
      }
      return disabled
    },
  }
})
</script>

<style></style>
