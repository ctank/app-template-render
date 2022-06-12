<template>
  <el-row :gutter="10">
    <el-col v-for="(col, i) in children" :key="`col-${i}`" :span="24 / extras.size">
      <component-render
        v-for="(item, j) in col.children"
        :key="`col-item-${j}`"
        :formData="formData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
      />
    </el-col>
  </el-row>
</template>

<script>
import base from '../base'

export default {
  name: 'Row',
  extends: base,
  props: {
    children: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style></style>
