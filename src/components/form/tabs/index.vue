<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="(tab, i) in children"
      :key="`tab-${tab.id}`"
      :label="tab.title"
      :name="tab.id"
    >
      <template v-for="(item, j) in col.children">
        <form-component-render
          v-if="getComponentDisplay(componentMap[item.id])"
          :key="`col-item-${j}`"
          :formData="formData"
          :component="componentMap[item.id] || item"
          :componentMap="componentMap"
          :disabled="getComponentDisabled(componentMap[item.id])"
        />
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { setValueByPath, getComponentStatus } from '../../../utils/common'
import { LAYOUT_TYPES } from '../../../utils/constant'
import base from '../base.vue'

export default defineComponent({
  name: 'Tabs',
  extends: base,
  props: {
    children: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      activeTab: ''
    }
  },
  mounted() {
    this.activeTab = this.children[0] ? this.children[0].id : ''
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
