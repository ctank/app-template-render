<template>
  <el-form-item
    :label="title"
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
      type="textarea"
      :placeholder="placeholder"
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
          // // 默认不能大于128
          // // 【流程建模--- 武探星测试进销存相关应用”下面的【单文本流程】建立 一个新流程，查看【单行文本2】后面输入框的提示信息，是“请填写”，跟需求不符，需求是“请输入内容”，另外 ，当输入内容超长，超过输入框的长度时，后面的内容以...显示，跟需求不符】https://www.tapd.cn/49578510/bugtrace/bugs/view?bug_id=1149578510001023656
          // this.rules.push({
          //   validator: (rules, value, callback) => {
          //     if (typeof value === 'string' && value.length && value.length > 128) {
          //       callback(new Error(`${title}的长度不能大于128`))
          //       return
          //     }
          //     callback()
          //   },
          //   trigger: 'change'
          // })
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
