<template>
  <div>
    <el-dialog
      v-for="dialog in dialogList"
      v-model="dialog.show"
      :ref="dialog.key"
      :key="dialog.key"
      :title="dialog.meta.title"
      :width="getDialogWidth(dialog)"
      :fullscreen="dialog.meta.fullscreen"
      :close-on-click-modal="dialog.meta.closeOnClickModal === true"
      :close-on-press-escape="false"
      :show-close="dialog.meta.showClose !== false"
      :custom-class="dialog.meta.customClass"
      :center="dialog.meta.center"
      @close="close(dialog)"
    >
      <div :style="getDialogStyle(dialog)">
        <dialog-render
          v-if="dialog.render"
          :ref="`dialogBody_${dialog.key}`"
          :key="dialog.key"
        ></dialog-render>
      </div>
      <template #footer>
        <div
          v-if="dialog.meta.isShowFooter !== false"
          :class="footeralign(dialog.meta.footerAlign)"
          class="dialog-footer"
        >
          <el-button
            v-if="dialog.meta.isShowCancelBtn !== false"
            @click="cancel(dialog)"
            size="small"
            plain
            :loading="dialog.cancelBtnLoading"
          >
            {{ dialog.meta.cancelBtnTxt || '取消' }}
          </el-button>
          <el-button
            v-if="dialog.meta.isShowConfirmBtn !== false"
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="confirm(dialog)"
            :disabled="dialog.confirmBtnLoading"
            :loading="dialog.confirmBtnLoading"
          >
            {{ dialog.meta.confirmBtnTxt || '确定' }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { h, markRaw } from 'vue'

export default {
  name: 'dialogManager',
  data() {
    return {
      // 是否由取消按钮触发close事件
      closeByCancel: false,
      vm: this
    }
  },
  computed: {
    dialogList() {
      return this.$store.state.dialogManager.dialogList
    },
    dialogBodySize() {
      return ''
    }
  },
  created() {
    const self = this

    let currentDialog = null
    const component = null
    const key = this.$.vnode.key
    const attrs = {
      'data-dialogkey': key
    }
    self.dialogList.forEach((dialog) => {
      if (dialog.key === key) {
        currentDialog = dialog
        return false
      }
    })

    this.$App.component('dialog-render', {
      props: {
        //
      },
      render(context) {
        let currentDialog = null
        const component = null
        const key = this.$.vnode.key
        const attrs = {
          'data-dialogkey': key
        }
        self.dialogList.forEach((dialog) => {
          if (dialog.key === key) {
            currentDialog = dialog
            return false
          }
        })
        const children = []
        if (currentDialog) {
          return h(currentDialog.component, {
            ...attrs,
            ...currentDialog.props,
            events: currentDialog.events
          })
        }
        return h('div')
      }
    })
  },
  methods: {
    getDialogStyle(dialog) {
      if (dialog.meta.bodyHeight < 150) {
        dialog.meta.bodyHeight = 150
      } else if (dialog.meta.bodyHeight > 570) {
        dialog.meta.bodyHeight = 570
      }
      if (dialog.meta.minHeightStatus) {
        return {
          minHeight: dialog.meta.bodyHeight + 'px',
          maxHeight: '570px'
        }
      } else {
        return {
          height: dialog.meta.bodyHeight + 'px'
        }
      }
    },
    getDialogWidth(dialog) {
      if (dialog.meta.width) {
        if (typeof dialog.meta.width === 'number') {
          return dialog.meta.width + 'px'
        }
        return dialog.meta.width
      } else {
        switch (dialog.meta.size) {
          case 'small':
            return '500px'
          case 'normal':
            return '700px'
          case 'large':
            return '900px'
          default:
            return '700px'
        }
      }
    },
    footeralign(type) {
      if (type) {
        switch (type) {
          case 'center':
            return 'dialog-footer-center'
          case 'left':
            return 'dialog-footer-left'
          case 'right':
            return 'dialog-footer-right'
          default:
            return ''
        }
      }
      return ''
    },
    confirm(dialog) {
      const dialogRef = this.$refs[`dialogBody_${dialog.key}`]
      if (
        dialogRef &&
        dialogRef.$children &&
        dialogRef.$children.confirm &&
        dialogRef.$children.confirm instanceof Function
      ) {
        dialogRef.$children.confirm()
      }
    },
    cancel(dialog) {
      this.closeByCancel = true
      const dialogRef = this.$refs[`dialogBody_${dialog.key}`]
      if (
        dialogRef &&
        dialogRef.$children &&
        dialogRef.$children.cancel &&
        dialogRef.$children.cancel instanceof Function
      ) {
        dialogRef.$children.cancel()
      }
    },
    close(dialog) {
      this.$emit('close')
      if (this.closeByCancel) {
        this.closeByCancel = false
        return
      }
      this.$store.dispatch('dialogManager/closeDialog', dialog.key)
      this.cancel(dialog)
    }
  }
}
</script>
