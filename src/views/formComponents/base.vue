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

    placeholder: {
      type: String,
      default() {
        return '请输入'
      }
    },

    fieldPath: {
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
    formData: {
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
    value: {
      get() {
        let value = ''
        if (this.formData && this.fieldPath) {
          value = getValueByPath(this.formData, this.fieldPath)
        }
        return value
      },
      set(val) {
        this.$emit('change', val, this.id)
      }
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
