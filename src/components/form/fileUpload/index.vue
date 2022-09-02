<template>
  <el-form-item
    :label="title"
    :class="required ? 'is-required' : ''"
    :prop="validProp"
    :rules="rules"
  >
    <div class="atp-file-upload">
      <el-upload
        class="atp-file-upload__btn"
        v-model:file-list="value"
        :accept="uploadAccept"
        :action="extras.uploadConfig.action"
        :disabled="disabledUpload"
        :show-file-list="false"
        :before-upload="beforeUpload"
        :on-success="uploadSuccess"
        :on-error="uploadError"
      >
        <el-button :disabled="disabledUpload" type="primary">点击上传</el-button>
      </el-upload>

      <file-list
        v-if="value.length"
        class="atp-file-upload__list"
        :width="extras.width"
        :height="extras.height"
        :file-list="value"
        @preview="handleFilePreview"
        @remove="handleFileRemove"
      />
    </div>
  </el-form-item>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'
import FileList from './fileList.vue'
import { getValueByPath, cloneDeep } from '../../../utils/common'

export default defineComponent({
  name: 'FileUpload',
  extends: base,
  components: { FileList },
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
    return {}
  },
  // watch: {
  //   value() {
  //     this.setDefaultValue()
  //   }
  // },
  computed: {
    showUploadBtn() {
      if (this.extras.maxLimit === 1 && this.value.length === this.extras.maxLimit) {
        return false
      }
      return true
    },
    uploadAccept() {
      if (this.extras.fileType) {
        const types = this.extras.fileType.split(';')
        let accept = ''
        types.forEach((type) => {
          if (accept.length) {
            accept += ' '
          }
          accept += `.${type},`
        })
        return accept
      }
      return '*'
    },
    disabledUpload() {
      if (
        (this.extras.maxLimit > 1 && this.value.length === this.extras.maxLimit) ||
        this.disabled
      ) {
        return true
      }
      return false
    }
  },
  created() {
    this.setRules()
    this.setDefaultValue()
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
            trigger: 'submit'
          })
        }

        if (this.extras) {
          const minLimit = parseInt(this.extras.minLimit)
          const maxLimit = parseInt(this.extras.maxLimit)
          if (!isNaN(minLimit) && !isNaN(maxLimit)) {
            // 最大最小长度都需要验证
            this.rules.push({
              validator: (rules, value, callback) => {
                if (Array.isArray(value) && (value.length < minLimit || value.length > maxLimit)) {
                  callback(new Error(`上传文件数量在${minLimit}和${maxLimit}之间`))
                  return
                }
                callback()
              },
              trigger: 'submit'
            })
          } else if (!isNaN(minLimit)) {
            // 只需验证最小长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (Array.isArray(value) && value.length < minLimit) {
                  callback(new Error(`最少需要上传${minLimit}个文件`))
                  return
                }
                callback()
              },
              trigger: 'submit'
            })
          } else if (!isNaN(maxLimit)) {
            // 只需验证最大长度
            this.rules.push({
              validator: (rules, value, callback) => {
                if (Array.isArray(value) && value.length > maxLimit) {
                  callback(new Error(`最多允许上传${maxLimit}个文件`))
                  return
                }
                callback()
              },
              trigger: 'submit'
            })
          }
        }
      }
    },
    setDefaultValue() {
      if (!this.value) {
        this.onChange([], this.id)
      }
    },
    beforeUpload(file) {
      console.log('beforeUpload--->', file)
      const { $message } = this.__$app.config.globalProperties
      // 获取文件名
      const reg = new RegExp('^[\u4E00-\u9FA5A-Za-z0-9_-]+$')
      if (file.name.split('.').length > 2 || !reg.test(this.filename)) {
        if ($message) {
          $message({
            showClose: true,
            message: '文件名仅能包含中文数字英文字母_-',
            type: 'error'
          })
        } else {
          alert('文件名仅能包含中文数字英文字母_-')
        }
        return false
      }

      const { fileSizeLimit } = this.extras
      if (fileSizeLimit.value) {
        const maxFileSize =
          fileSizeLimit.unit === 'MB' ? fileSizeLimit.value * 1024 : fileSizeLimit.value
        if (file.size / 1024 > maxFileSize) {
          if ($message) {
            $message({
              showClose: true,
              message: `上传文件大小不能超过${fileSizeLimit.value}${fileSizeLimit.unit}`,
              type: 'error'
            })
          } else {
            alert(`上传文件大小不能超过${fileSizeLimit.value}${fileSizeLimit.unit}`)
          }
          return false
        }
      }

      return true
    },
    uploadSuccess(res, file, files) {
      const successFun = (data) => {
        const { nameFieldPath, urlFieldPath, thumbUrlFieldPath } = this.extras.uploadConfig
        // 文件名
        let name = data.name
        if (nameFieldPath) {
          name = getValueByPath(res, nameFieldPath)
        }
        // 文件地址
        let url = ''
        if (urlFieldPath) {
          url = getValueByPath(res, urlFieldPath)
        }
        let thumbUrl = url
        if (thumbUrlFieldPath) {
          url = getValueByPath(res, thumbUrlFieldPath)
        }

        let index = files.findIndex((f) => f.uid && f.uid === data.uid)
        files[index] = {
          name,
          url,
          thumbUrl,
          uid: data.uid,
          status: data.status,
          percentage: data.percentage
        }
      }

      if (this.extras.actionConfig.success) {
        this.onEvent(
          this.extras.actionConfig.success,
          {
            file,
            res,
            id: this.id,
            fieldPath: this.fieldPath
          },
          successFun
        )
      } else {
        successFun(file)
      }
    },
    uploadError(err, file, files) {
      // console.log('uploadError--->', err, file, files)
      if (this.extras.actionConfig.success) {
        this.onEvent(this.extras.actionConfig.success, {
          file,
          err,
          id: this.id,
          fieldPath: this.fieldPath
        })
      }
    },
    handleFilePreview(file) {
      if (this.extras.actionConfig.preview) {
        this.onEvent(this.extras.actionConfig.preview, {
          file,
          id: this.id,
          fieldPath: this.fieldPath
        })
      }
    },
    handleFileRemove(index) {
      if (Array.isArray(this.value)) {
        const file = this.value[index]
        file.status = 'uploading'
        const removeFun = (status = 'success') => {
          file.status = 'success'
          if (status === 'success') {
            const value = cloneDeep(this.value)
            value.splice(index, 1)
            this.onChange(value, this.id)
          }
        }
        if (this.extras.actionConfig.remove) {
          this.onEvent(
            this.extras.actionConfig.remove,
            {
              file,
              id: this.id,
              fieldPath: this.fieldPath
            },
            removeFun
          )
        } else {
          removeFun()
        }
      }
    }
  }
})
</script>

<style lang="scss">
.atp-file-upload {
  width: 100%;
  .atp-file-upload__list {
    margin-top: 5px;
  }
}
</style>
