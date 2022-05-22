<template>
  <div>
    <div v-for="(item, index) in layout" :key="index">
      <anchored-heading
        :formData="formData"
        :component="components[item.key]"
        @change="handleValueChange"
      ></anchored-heading>
    </div>
  </div>
</template>

<script>
import { h } from 'vue'

export default {
  name: 'FormRender',
  props: {
    layout: {
      type: Array,
      default() {
        return []
      }
    },
    components: {
      type: Object,
      default() {
        return {}
      }
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    },
    formData: {
      type: Object,
      default() {
        return null
      }
    }
  },
  created() {
    this.demo()
  },
  methods: {
    demo() {
      console.log(111)
      const self = this
      this.$App.component('anchored-heading', {
        props: {
          component: {
            type: Object,
            default() {
              return null
            }
          },
          formData: {
            type: Object,
            default() {
              return null
            }
          }
        },
        render() {
          if (this.component) {
            let value = ''
            if (this.formData && this.component.fieldPath) {
              const paths = this.component.fieldPath.split('/')
              for (let i = 0; i < paths.length; i++) {
                if (value && value[paths[i]]) {
                  value = value[paths[i]]
                } else {
                  value = this.formData[paths[i]]
                }
              }
            }
            const render = require(`./${this.component.type}`).default

            // debugger
            return h(render, {
              key: 'test-demo',
              value,
              ...this.component
            })
          }

          return h('div')
        }
      })
    },
    handleValueChange(val, id) {
      this.$emit('change', val, id)
    }
  }
}
</script>

<style></style>
