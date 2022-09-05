<template>
  <el-tabs v-model="activeTab">
    <el-tab-pane
      v-for="(tab, i) in children"
      :key="`tab-${tab.id}`"
      :label="tab.title"
      :name="tab.id"
    >
      <form-component-render
        v-for="(item, j) in tab.children"
        :key="`tab-item-${j}`"
        :formData="formData"
        :component="componentMap[item.id] || item"
        :componentMap="componentMap"
      />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { defineComponent } from 'vue'
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
  }
})
</script>

<style></style>
