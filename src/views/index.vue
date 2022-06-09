<template>
  <div>
    <div>
      <el-button @click="handleSpaPush">demo</el-button>
      <el-button @click="jumpDemo('formTextBox')">单行文本</el-button>
    </div>
    <div><img src="@/assets/images/demo.png" /></div>
    <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div id="subapp-viewport"></div>
  </div>
</template>

<script>
import { routerPush, openUrl } from '@/utils/common'

export default {
  name: 'Index',
  data() {
    return {
      options: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      value: ''
    }
  },
  mounted() {
    console.log('mounted!')
  },
  methods: {
    handleSpaPush() {
      routerPush({
        mode: 'spa',
        vm: this,
        name: 'demo',
        query: {
          test: 'test-spa'
        }
      })
    },
    jumpDemo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style lang="scss" scoped></style>
