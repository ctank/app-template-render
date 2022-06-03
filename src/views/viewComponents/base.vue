<template>
  <div></div>
</template>

<script>
import { getValueByPath } from '@/utils/common'

export default {
  name: 'BaseComponent',
  components: {},
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    },
    extras: {
      type: Object,
      default() {
        return {}
      }
    },

    showTitle: {
      type: String,
      default() {
        return '请输入'
      }
    },

    title: {
      type: String,
      default() {
        return ''
      }
    },

    dataPath: {
      type: String,
      default() {
        return ''
      }
    },
    componentMap: {
      type: Object,
      default() {
        return {}
      }
    },
    viewData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    // 字段id
    component() {
      return this.componentMap[this.id] || {}
    },
    validProp() {
      return this.fieldPath.replace(/\//g, '.')
    }
  },
  watch: {
    // data() {}
  },
  methods: {
    // getValueByPath(data, path) {
    //   let value = ''
    //   if (data && path) {
    //     const paths = path.split('/')
    //     for (let i = 0; i < paths.length; i++) {
    //       if (value && value[paths[i]]) {
    //         value = value[paths[i]]
    //       } else {
    //         value = data[paths[i]]
    //       }
    //     }
    //   }
    //   return value
    // }
  }
}
</script>

<style lang="less"></style>
