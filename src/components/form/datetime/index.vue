<template>
  <el-form-item
    :label="title"
    :class="required ? 'is-required' : ''"
    class="atr-datetime"
    :prop="validProp"
    :rules="rules"
  >
    <!-- 日期 -->
    <el-date-picker
      v-if="formats.datePicker.includes(extras.format)"
      v-model="value"
      :type="datePickerType"
      :format="extras.format"
      :valueFormat="extras.format"
      :disabled-date="disabledDate"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <!-- 时间 -->
    <el-time-picker
      v-else-if="formats.timePicker.includes(extras.format) && !extras.isSelect"
      v-model="value"
      :format="extras.format"
      :valueFormat="extras.format"
      :isRange="extras.isRange"
      :disabled-hours="disabledHours"
      :disabled-minutes="disabledMinutes"
      :disabled-seconds="disabledSeconds"
      :placeholder="placeholder"
      :disabled="disabled"
    />
    <!-- 时间选择 -->
    <el-time-select
      v-else
      v-model="value"
      :start="extras.min.value || '00:00'"
      :end="extras.max.value || '23:59'"
      :step="extras.timeStep || '00:01'"
      :placeholder="placeholder"
      :disabled="disabled"
    />
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import { getValueByPath, cloneDeep } from '../../../utils/common'
import base from '../base.vue'

const dayjs = require('dayjs')

const getLimitDate = ({ type, value }, relateValue) => {
  if (type === 'null') {
    return null
  }
  if (type === 'fixed') {
    return dayjs(value)
  } else if (type === 'field') {
    if (relateValue) {
      return dayjs(relateValue)
    }
    return null
  } else {
    const date = dayjs()
    if (type === 'now') {
      return date
    }
    if (value && Number(value) > 0) {
      if (type === 'before') {
        // 排除当天
        return date.subtract(Number(value) + 1, 'd')
      }
      if (type === 'after') {
        return date.add(Number(value), 'd')
      }
    }
  }
}

const getTimeRange = (start, end) => {
  const result = []
  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

export default defineComponent({
  name: 'DataTime',
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
      formats: {
        datePicker: ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD HH:mm', 'YYYY-MM-DD', 'YYYY-MM', 'YYYY'],
        timePicker: ['HH:mm:ss', 'HH:mm'],
        timeSelect: ['HH:mm']
      }
    }
  },
  computed: {
    datePickerType() {
      const { format, isRange } = this.extras
      switch (format) {
        // 日期时间
        case 'YYYY-MM-DD HH:mm:ss':
        case 'YYYY-MM-DD HH:mm':
          // 范围
          if (isRange) {
            return 'datetimerange'
          }
          return 'datetime'
        // 日期
        case 'YYYY-MM-DD':
          // 范围
          if (isRange) {
            return 'daterange'
          }
          return 'date'
        case 'YYYY-MM':
          // 范围
          if (isRange) {
            return 'monthrange'
          }
          return 'month'
        case 'YYYY':
          return 'year'
      }
    },
    minDateTime() {
      return getLimitDate(
        this.extras.min,
        this.extras.min.type === 'field' ? this.getRelateValue(this.extras.min.value) : ''
      )
    },
    maxDateTime() {
      return getLimitDate(
        this.extras.max,
        this.extras.max.type === 'field' ? this.getRelateValue(this.extras.max.value) : ''
      )
    }
  },
  created() {
    this.setDefaultValue()
    // this.setRules()
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {},
    setDefaultValue() {
      if (this.extras.defaultValue && !this.value) {
        this.onChange(this.extras.defaultValue, this.id)
      }
    },
    getRelateValue(fieldId) {
      let relateValue = ''
      if (fieldId) {
        const component = this.componentMap[fieldId]
        relateValue = getValueByPath(this.formData, component.fieldPath)
      }
      return relateValue
    },
    disabledDate(time) {
      let isDisable = false
      if (this.maxDateTime && !dayjs(time).isBefore(this.maxDateTime)) {
        isDisable = true
      }
      if (this.minDateTime && !dayjs(time).isAfter(this.minDateTime)) {
        isDisable = true
      }
      return isDisable
    },
    disabledTime(defaultStart, defaultEnd, type, { hour, minute }) {
      let start = cloneDeep(defaultStart)
      let end = cloneDeep(defaultEnd)
      if (this.minDateTime) {
        if (
          type === 'second' &&
          hour === this.minDateTime.hour() &&
          minute === this.minDateTime.minute()
        ) {
          start = this.minDateTime.second() - 1
        } else if (type === 'minute' && hour === this.minDateTime.hour()) {
          start = this.minDateTime.minute() - 1
        } else {
          start = this.minDateTime.hour() - 1
        }
      }
      if (this.maxDateTime) {
        if (
          type === 'second' &&
          hour === this.maxDateTime.hour() &&
          minute === this.maxDateTime.minute()
        ) {
          end = this.maxDateTime.second() + 1
        } else if (type === 'minute' && hour === this.maxDateTime.hour()) {
          end = this.maxDateTime.minute() + 1
        } else {
          end = this.maxDateTime.hour() + 1
        }
      }
      let startRange = []
      if (start > defaultStart) {
        startRange = getTimeRange(defaultStart, start)
      }
      let endRange = []
      if (end < defaultEnd) {
        endRange = getTimeRange(end, defaultEnd)
      }
      return startRange.concat(endRange)
    },
    disabledHours() {
      return this.disabledTime(0, 23, 'hour', {})
    },
    disabledMinutes(hour) {
      return this.disabledTime(0, 59, 'minute', { hour })
    },
    disabledSeconds(hour, minute) {
      return this.disabledTime(0, 59, 'second', { hour, minute })
    }
  }
})
</script>

<style>
.atr-datetime .el-range-editor {
  padding: 0 10px;
}
</style>
