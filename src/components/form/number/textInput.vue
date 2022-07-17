<template>
  <div class="el-input-number el-input-amount">
    <span role="button" class="el-input-number__decrease">
      <el-icon><Minus /></el-icon>
    </span>
    <span role="button" class="el-input-number__increase">
      <el-icon><Plus /></el-icon>
    </span>
    <el-input
      v-model="inputValue"
      class="input-with-select"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @input="handleValueInput"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'

const numbro = require('numbro')

export default defineComponent({
  name: 'Amount',
  props: {
    type: {
      type: String,
      default: 'money'
    },
    step: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: Number.POSITIVE_INFINITY
    },
    min: {
      type: Number,
      default: Number.NEGATIVE_INFINITY
    },
    showText: {
      type: Boolean,
      default: false
    },
    modelValue: {
      type: Number
    },
    precision: {
      type: Number,
      validator: (val) => val >= 0 && val === Number.parseInt(`${val}`, 10)
    }
  },
  data() {
    return {
      isFocus: false
    }
  },

  computed: {
    inputValue: {
      get() {
        if (this.isFocus) {
          return this.modelValue
        } else {
          if (this.type === 'percent') {
            return this.modelValue + '%'
          }

          if (this.showText) {
            return this.formatText(this.modelValue)
          }
          return this.formatThousandSeparator(this.modelValue)
        }
      },
      set(val) {
        this.handleValueInput(val)
      }
    }
  },

  methods: {
    // 金额加千分符
    formatThousandSeparator(num) {
      if (!num && num !== 0) {
        return ''
      }
      return numbro(num).format({ thousandSeparated: true, mantissa: 2 })
    },
    // 金额转中文大写
    formatText(value) {
      debugger
      const valueByStr = value.toString()
      const tempArr = valueByStr.split('.')
      if (tempArr[0].length > 12) {
        // 金额超过千亿
        return '位数超过限制，无法显示大写'
      }
      const fraction = ['角', '分']
      const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
      const unit = [
        ['圆', '万', '亿'],
        ['', '拾', '佰', '仟']
      ]
      let num = Math.abs(+value)
      let text = ''
      fraction.forEach((item, index) => {
        text += (digit[Math.floor(num * 10 * 10 ** index) % 10] + item).replace(/零./, '')
      })
      text = text || '整'
      num = Math.floor(num)
      for (let i = 0; i < unit[0].length && num > 0; i += 1) {
        let p = ''
        for (let j = 0; j < unit[1].length && num > 0; j += 1) {
          p = digit[num % 10] + unit[1][j] + p
          num = Math.floor(num / 10)
        }
        text = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
      }
      return text
        .replace(/(零.)*零圆/, '圆')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零圆整')
    },
    handleInputFocus() {
      this.isFocus = true
    },
    handleInputBlur() {
      this.isFocus = false
    },
    handleValueInput(val) {
      this.$emit('update:modelValue', val)
    }
  }
})
</script>

<style></style>
