<template>
  <el-form-item :label="title" :required="required" :prop="validProp">
    <el-input v-model="value" :rows="extras.rows" type="textarea" :placeholder="placeholder" />
  </el-form-item>
</template>

<script>
import base from '../base'

export default {
  name: 'Textarea',
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
    },
    placeholder: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      input: ''
    }
  },
  watch: {},
  mounted() {},
  methods: {}
}
</script>

<style></style>
