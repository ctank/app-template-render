<template>
  <div class="el-input-amount el-input-number">
    <span
      role="button"
      data-type="decrease"
      class="el-input-number__decrease"
      :class="{ 'is-disabled': modelValue <= min }"
      @mousedown="handleValueChange"
    >
      <el-icon><Minus /></el-icon>
    </span>
    <span
      role="button"
      data-type="increase"
      class="el-input-number__increase"
      :class="{ 'is-disabled': modelValue >= max }"
      @mousedown="handleValueChange"
    >
      <el-icon><Plus /></el-icon>
    </span>
    <el-input
      v-model="inputValue"
      class="input-with-select"
      @focus="handleInputFocus"
      @blur="handleInputBlur"
      @input="handleValueInput"
      @keypress="validKeyCode"
    >
      <template #suffix>
        <el-icon class="el-input-amount__copy" @click="handleValueCopy(inputValue)"
          ><CopyDocument
        /></el-icon>
      </template>
    </el-input>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { copyToClip, isNull } from '../../../utils/common'

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
      if (isNaN(num)) {
        return ''
      }
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
        text = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + text
      }
      return text
        .replace(/(零.)*零圆/, '圆')
        .replace(/(零.)+/g, '零')
        .replace(/^整$/, '零圆整')
    },

    validKeyCode(e) {
      const key = String.fromCharCode(e.keyCode)
      if (key === '.') {
        if ((this.modelValue + '').indexOf('.') >= 0) {
          return false
        }
      }
      return /[\d.]/.test(key)
    },
    handleInputFocus() {
      this.isFocus = true
    },
    handleInputBlur() {
      this.isFocus = false
    },
    handleValueChange(e) {
      let interval = null
      let isHandlerCalled = false

      const handler = () => {
        let currentElm = e.path.find((item) => item.dataset.type)
        let val = this.modelValue
        if (currentElm.dataset.type === 'decrease') {
          val--
          if (val < 0) {
            val = 0
          }
        } else if (currentElm.dataset.type === 'increase') {
          val++
        }
        this.handleValueInput(val)
      }

      const clear = () => {
        clearInterval(interval)
        interval = null

        if (!isHandlerCalled) {
          handler()
        }
        isHandlerCalled = false
      }

      if (e.button !== 0) {
        return
      }

      document.addEventListener('mouseup', clear, { once: true })
      clearInterval(interval)
      interval = setInterval(() => {
        isHandlerCalled = true
        handler()
      }, 100)
    },
    handleValueInput(val) {
      // 判断小数位数
      const decimalIndex = val.indexOf('.')
      let decimalLength = 0
      if (decimalIndex >= 0) {
        decimalLength = val.substr(val.indexOf('.') + 1).length
      }

      if (!isNull(this.precision) && decimalLength > this.precision) {
        val = numbro(val).format({ mantissa: this.precision })
      }

      if (this.max && Number(val) > this.max) {
        // 判断最大值
        val = this.max
      } else if (this.min && Number(val) < this.min) {
        // 判断最小值
        val = this.min
      }

      if (decimalLength > 0 && Number(val) !== 0) {
        val = Number(val)
      }

      this.$emit('update:modelValue', val)
    },
    handleValueCopy(val) {
      copyToClip(val, (state) => {
        if (state) {
          const { $message } = this.__$app.config.globalProperties
          if ($message) {
            $message({
              showClose: true,
              message: '复制成功',
              type: 'success'
            })
          } else {
            alert('复制成功')
          }
        }
      })
    }
  }
})
</script>

<style>
.el-input-amount .el-input-amount__copy {
  cursor: pointer;
}
</style>
