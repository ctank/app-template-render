<template>
  <div
    :class="{
      'atp-subform__column': true,
      'atp-subform__column--click': column.clickEvent
    }"
  >
    <!-- 文本 -->
    <span v-if="config.type === 'text' && !isEdit">{{ config.content }}</span>
    <!-- 标签 -->
    <tag v-else-if="config.type === 'tag' && !isEdit" :color="config.color">{{
      config.content
    }}</tag>
    <!-- 文件 -->
    <div v-else-if="config.type === 'file' && !isEdit">
      <img
        v-for="(file, index) in config.content"
        :title="file.name"
        :key="index"
        class="atp-subform__file-icon"
        :src="getFileTypeIconSrc(file)"
      />
    </div>
    <!-- 组件 -->
    <form-component-render
      v-else-if="getComponentDisplay"
      :formData="row"
      :component="column.fieldConfig"
      :componentMap="componentMap"
      :disabled="getComponentDisabled"
      :tempVal="true"
      @tempChange="handleValueChange"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { setValueByPath, getComponentMap, getComponentStatus } from '../../../utils/common'
import Tag from './tag.vue'
import { FILE_EXT_ICONS, FILE_TYPE_ICONS } from '../../../utils/constant'

const dayjs = require('dayjs')

const TEXT_FIELDS = ['textBox', 'textarea', 'number']
const OPTION_FIELDS = ['radio', 'checkBox', 'select', 'cascader']
const DATETIME_FIELDS = ['datetime']
const FILE_FIELDS = ['imageUpload', 'fileUpload']

const FILE_TYPES = {
  excel: ['xls', 'xlsx'],
  music: ['mp3', 'wav'],
  pic: ['jpg', 'png', 'gif'],
  ppt: ['ppt', 'pptx'],
  video: ['mp4'],
  word: ['doc', 'docx'],
  zip: ['zip', 'rar', '7z']
}

export default defineComponent({
  name: 'ColumnContent',
  components: { Tag },
  props: {
    row: {
      type: Object,
      default() {
        return null
      }
    },
    column: {
      type: Object,
      default() {
        return null
      }
    },
    componentMap: {
      type: Object,
      default() {
        return {}
      }
    },
    isEdit: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  computed: {
    config() {
      const value = this.row[this.column.fieldPath] || ''
      const c = {
        content: '',
        type: 'text',
        color: ''
      }
      if (TEXT_FIELDS.includes(this.column.fieldType)) {
        c.content = value
      } else if (DATETIME_FIELDS.includes(this.column.fieldType)) {
        const format = this.column.fieldConfig?.extras.format || 'YYYY-MM-DD HH:mm:ss'
        c.content = dayjs(value).format(format || 'YYYY-MM-DD HH:mm:ss')
      } else if (OPTION_FIELDS.includes(this.column.fieldType)) {
        const options = this.column.fieldConfig?.extras.options || []
        const item = options.find((option) => option.value === value)
        if (item) {
          c.content = item.label
          if (item.color) {
            c.type = 'tag'
            c.color = item.color
          }
        }
      } else if (FILE_FIELDS.includes(this.column.fieldType)) {
        c.type = 'file'
        c.content = value
        if (typeof value === 'string') {
          c.content = [
            {
              name: value,
              url: value
            }
          ]
        } else if (!Array.isArray(value)) {
          c.content = []
        }
      }
      return c
    },
    getComponentDisplay() {
      let show = true
      const item = this.column.fieldConfig
      if (item) {
        show = getComponentStatus(item.extras.showConfig, this.row, this.componentMap)
        if (!show) {
          if (!this.components.some((component) => component.fieldPath === item.fieldPath)) {
            setValueByPath(this.row, item.fieldPath, '')
          }
        }
      }
      return show
    },
    getComponentDisabled() {
      let disabled = false
      const item = this.column.fieldConfig
      if (item) {
        disabled = getComponentStatus(
          item.extras.readonlyConfig,
          this.row,
          this.componentMap,
          disabled
        )
      }
      return disabled
    }
  },
  methods: {
    getFileTypeIconSrc(file) {
      let src = FILE_TYPE_ICONS.default
      const extIndex = file.name.lastIndexOf('.')
      if (extIndex >= 0) {
        const extName = file.name.substr(extIndex + 1)
        if (FILE_EXT_ICONS[extName.toLowerCase()]) {
          src = FILE_EXT_ICONS[extName.toLowerCase()]
        } else {
          for (const key in FILE_TYPES) {
            if (FILE_TYPES[key].includes(extName)) {
              src = FILE_TYPE_ICONS[key]
            }
          }
        }
      }
      return src
    },
    handleValueChange(val) {
      const { fieldPath } = this.column
      if (fieldPath && Object.prototype.toString.call(val) !== '[object event]') {
        this.row[fieldPath] = val
      }
    }
  }
})
</script>

<style lang="less">
.atp-subform__column {
  &.atp-subform__column--click {
    cursor: pointer;
  }
  .el-form-item {
    margin-bottom: 0;
  }

  .atp-subform__file-icon {
    margin-right: 5px;
  }
}
</style>
