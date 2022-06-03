<template>
  <el-form-item :label="title" :required="required">
    <el-input v-model="input" @input="onInput" placeholder="Please input" />
  </el-form-item>
</template>

<script>
export default {
  name: 'TextBox',
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
    onInput(val) {
      if (val !== this.value) {
        this.$emit('change', val, this.id)
      }
    }
  }
}
</script>

<style></style>
