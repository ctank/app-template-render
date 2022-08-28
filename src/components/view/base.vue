<template>
  <div></div>
</template>

<script>
import { getValueByPath } from '../../utils/common'

export default {
  name: 'ViewComponentBase',
  components: {},
  inject: ['onChange', 'onGetValue', 'onEvent'],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    },
    // 控件类型
    type: {
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
      type: Boolean,
      default() {
        return false
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
    },
    permissions: {
      type: Array,
      default() {
        return ['*']
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
        if (this.viewData && this.dataPath) {
          value = getValueByPath(this.viewData, this.dataPath)
        }
        return value
      },
      set(val) {
        this.$emit('change', val, this.id)
      }
    },
    validProp() {
      return this.fieldPath.replace(/\//g, '.')
    },
    isAdmin() {
      if (!this.permissions || (Array.isArray(this.permissions) && this.permissions[0] === '*')) {
        return true
      }
      return false
    }
  },
  watch: {
    // data() {}
  },
  methods: {
    checkPermission(permission) {
      if (!permission || this.permissions.includes(permission)) {
        return true
      }
      return false
    }
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

<style></style>
