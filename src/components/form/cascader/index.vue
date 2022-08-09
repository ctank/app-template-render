<template>
  <el-form-item
    :label="title"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <el-cascader
      v-model="value"
      :options="provinceAndCityData"
      :placeholder="placeholder"
      clearable
    ></el-cascader>
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import {
  provinceAndCityData,
  // regionData,
  // provinceAndCityDataPlus,
  // regionDataPlus,
  // CodeToText,
  // TextToCode
} from '../../../lib/chinaAreaData'
import base from '../base.vue'

export default defineComponent({
  name: 'Cascader',
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
      provinceAndCityData: provinceAndCityData
    }
  },
  computed: {},
  watch: {},
  created() {
    this.setRules()
  },
  mounted() {},
  methods: {
    /**
     * [setRules 设置验证规则]
     */
    setRules() {
      if (this.rules) {
        const title = this.title
        if (this.required) {
          this.rules.push({
            required: true,
            message: `${title}不能为空`,
            trigger: 'blur'
          })
        }
      }
    }
  }
})
</script>

<style></style>
