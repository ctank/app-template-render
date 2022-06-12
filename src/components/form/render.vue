<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts" :key="`${item.id}-${index}`">
      <form-component-render
        v-if="getComponentDisplay(componentMap[item.id])"
        :key="`${item.id}-${index}`"
        :formData="formData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
        @change="handleValueChange"
      />
    </template>
  </div>
</template>

<script>
import { h } from 'vue'
import { getValueByPath, setValueByPath } from '../../utils/common'

export default {
  name: 'FormRender',
  provide() {
    return {
      onChange: this.handleValueChange,
      onGetValue: this.handleValueGet
    }
  },
  props: {
    layouts: {
      type: Array,
      default() {
        return []
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
        return null
      }
    }
  },
  created() {
    this.registerRenderFun()
  },
  methods: {
    registerRenderFun() {
      if (typeof this.__$app.component('form-component-render') === 'undefined') {
        this.__$app.component('form-component-render', {
          props: {
            component: {
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
            formData: {
              type: Object,
              default() {
                return null
              }
            }
          },
          data() {
            return {
              renderComponent: null
            }
          },
          async created() {
            switch (this.component.type) {
              case 'textBox':
                this.renderComponent = (await import(`./textBox/index.vue`)).default
                break
              case 'radio':
                this.renderComponent = (await import(`./radio/index.vue`)).default
                break
            }
          },
          render({ component, componentMap, formData }) {
            if (this.renderComponent && component) {
              return h(this.renderComponent, {
                componentMap: componentMap,
                formData: formData,
                ...component
              })
            }
            return h('div')
          }
        })
      }
    },
    getComponentDisplay(item) {
      let show = true
      if (item.extras.showConfig && item.extras.showConfig.length) {
        show = false
        for (let i = 0; i < item.extras.showConfig.length; i += 1) {
          if (!show) {
            for (let j = 0; j < item.extras.showConfig[i].length; j += 1) {
              const { field, value, logic } = item.extras.showConfig[i][j]
              const targetValue = getValueByPath(this.formData, this.componentMap[field].fieldPath)
              switch (logic) {
                case '0':
                  if (targetValue !== value) {
                    show = true
                  } else {
                    show = false
                  }
                  break
                case '1':
                  if (targetValue === value) {
                    show = true
                  } else {
                    show = false
                  }
                  break
              }
            }
          }
        }
        if (!show) {
          setValueByPath(this.formData, item.fieldPath, '')
        }
      }
      return show
    },
    handleValueChange(val, id) {
      this.$emit('change', val, id)
    },
    handleValueGet(val, id) {
      this.$emit('getValue', val, id)
    }
  }
}
</script>

<style></style>
