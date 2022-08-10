<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts">
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
import { h, defineComponent } from 'vue'
import { getValueByPath, setValueByPath, getComponentMap, isValueEqual } from '../../utils/common'
import { LAYOUT_TYPES } from '../../utils/constant'

export default defineComponent({
  name: 'FormRender',
  provide() {
    return {
      onChange: this.handleValueChange,
      onGetValue: this.handleValueGet,
      onEvent: this.handleEvent
    }
  },
  props: {
    layouts: {
      type: Array,
      default() {
        return []
      }
    },
    components: {
      type: Array,
      default() {
        return []
      }
    },
    formData: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    componentMap() {
      return getComponentMap(this.layouts, this.components)
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
              case 'row':
                this.renderComponent = (await import(`./row/index.vue`)).default
                break
              case 'textBox':
                this.renderComponent = (await import(`./textBox/index.vue`)).default
                break
              case 'textarea':
                this.renderComponent = (await import(`./textarea/index.vue`)).default
                break
              case 'number':
                this.renderComponent = (await import(`./number/index.vue`)).default
                break
              case 'radio':
                this.renderComponent = (await import(`./radio/index.vue`)).default
                break
              case 'checkBox':
                this.renderComponent = (await import(`./checkBox/index.vue`)).default
                break
              case 'select':
                this.renderComponent = (await import(`./select/index.vue`)).default
                break
              case 'cascader':
                this.renderComponent = (await import(`./cascader/index.vue`)).default
                break
              case 'datetime':
                this.renderComponent = (await import(`./datetime/index.vue`)).default
                break
              case 'imageUpload':
                this.renderComponent = (await import(`./imageUpload/index.vue`)).default
                break
              case 'fileUpload':
                this.renderComponent = (await import(`./fileUpload/index.vue`)).default
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
      if (item && !LAYOUT_TYPES.includes(item.type)) {
        if (item.extras.showConfig && item.extras.showConfig.length) {
          show = false
          for (let i = 0; i < item.extras.showConfig.length; i += 1) {
            if (!show) {
              for (let j = 0; j < item.extras.showConfig[i].length; j += 1) {
                const { field, value, logic } = item.extras.showConfig[i][j]
                const targetValue = getValueByPath(
                  this.formData,
                  this.componentMap[field].fieldPath
                )
                switch (logic) {
                  case '0':
                    if (!isValueEqual(targetValue, value)) {
                      show = true
                    } else {
                      show = false
                    }
                    break
                  case '1':
                    if (isValueEqual(targetValue, value)) {
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
      }
      return show
    },
    handleValueChange(val, id) {
      this.$emit('change', val, id)
    },
    handleValueGet(data, cb) {
      this.$emit('getValue', data, cb)
    },
    handleEvent(event, data, cb) {
      this.$emit(event, data, cb)
    }
  }
})
</script>

<style>
.component-render {
  overflow: hidden;
}
</style>
