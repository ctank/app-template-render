<template>
  <el-form-item
    :label="showTitle ? title : ''"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <el-input
      v-model="value"
      :rows="extras.rows"
      :minlength="extras.minLength"
      :maxlength="extras.maxLength"
      :autosize="extras.autosize"
      :resize="extras.resize"
      :show-word-limit="extras.showWordLimit"
      :placeholder="placeholder"
      :disabled="disabled"
      type="textarea"
    />
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import { isUndefined, isNull } from '../../../utils/common'
import base from '../base.vue'

export default defineComponent({
  name: 'Textarea',
  extends: base,
  props: {
    title: {
      type: String,
      default() {
        return ''
      }
    },
    showTitle: {
      type: Boolean,
      default() {
        return true
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
  created() {
    this.setDefaultValue()
    this.setRules()
  },
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

        if (this.extras) {
          const minLength = parseInt(this.extras.minLength)
          const maxLength = parseInt(this.extras.maxLength)
          if (!isNaN(minLength) && !isNaN(maxLength)) {
            // 最大最小长度都需要验证
            this.rules.push({
              validator: (rules, value, callback) => {
                if (
                  typeof value === 'string' &&
                  value.length &&
                  (value.length < minLength || value.length > maxLength)
                ) {
                  callback(new Error(`字符长度必须在${minLength}和${maxLength}之间`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          } else if (!isNaN(minLength)) {
            // 只需验证最小长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (typeof value === 'string' && value.length && value.length < minLength) {
                  callback(new Error(`至少输入${minLength}个字符`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          } else if (!isNaN(maxLength)) {
            // 只需验证最大长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (typeof value === 'string' && value.length && value.length > maxLength) {
                  callback(new Error(`最多可输入${maxLength}个字符`))
                  return
                }
                callback()
              },
              trigger: 'blur'
            })
          }
        }
      }
    },

    setDefaultValue() {
      if (this.extras.defaultValue && (isUndefined(this.value) || isNull(this.value))) {
        this.onChange(this.extras.defaultValue, this.id)
      }
    }
  }
})
</script>

<style></style>
