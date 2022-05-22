<template>
  <el-config-provider :locale="locale">
    <router-view />
    <dialog-manager></dialog-manager>
  </el-config-provider>
</template>

<script>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import dialogManager from '@/components/dialogManager/dialogManager'

export default {
  name: 'App',
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    dialogManager
  },
  data() {
    return {
      locale: zhCn
    }
  }
}
</script>

<style lang="scss"></style>
