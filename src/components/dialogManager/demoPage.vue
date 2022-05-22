<template>
  <div>
    <el-button @click="openDialog">测试弹窗</el-button>
  </div>
</template>

<script>
import { Dialog } from './dialogModel'
export default {
  name: 'dialogDemoPage',

  data() {
    return {
      id: 1,
      dialog: null
    }
  },
  destroyed() {
    // 组件销毁时记得同时销毁弹窗
    this.$store.dispatch('dialogManager/removeDialog', this.dialog.key)
  },
  methods: {
    openDialog() {
      // 定义传参，这里为凸显每次点击后不同设置id自加1
      const props = {
        id: this.id++
      }
      // 定义回调事件
      const events = {
        confirm: () => {
          console.log('confirm回调函数')
        },
        cancel: () => {
          console.log('cancel回调函数')
          this.$store.dispatch('dialogManager/closeDialog', this.dialog.key)
        }
      }
      // 定义弹窗配置
      const meta = {
        width: 500,
        bodyHeight: 300
        // isDestroyByClose: true
      }
      // 引入弹窗主体组件
      const component = require('./demoDialog').default
      if (this.dialog) {
        // 若弹窗存在
        // 设置需要改动的传值
        this.dialog.props = props
        this.$store.dispatch('dialogManager/updateDialog', this.dialog)
      } else {
        // 新建并添加弹窗
        this.dialog = new Dialog(component, props, events, meta)
        this.$store.dispatch('dialogManager/addDialog', this.dialog)
      }
      this.$store.dispatch('dialogManager/openDialog', this.dialog.key)
    }
  }
}
</script>
