<template>
  <el-form-item :label="title" :required="required">
    <el-radio-group v-model="input" @change="onChange">
      <el-radio v-for="(option, index) in extras.options" :key="index" :label="option.value">{{
        option.label
      }}</el-radio>
    </el-radio-group>
  </el-form-item>
</template>

<script>
export default {
  name: 'Radio',
  props: {
    value: {
      type: String,
      default() {
        return ''
      }
    },
    id: {
      type: String,
      default() {
        return ''
      }
    },
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

    extras: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      input: ''
    }
  },
  mounted() {
    this.input = this.value
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
