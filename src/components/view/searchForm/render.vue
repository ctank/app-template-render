<template>
  <div class="search-component-render">
    <template v-for="(item, index) in layouts">
      <search-component-render
        v-if="getComponentDisplay(componentMap[item.id])"
        :key="`${item.id}-${index}`"
        :formData="formData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
      />
    </template>
  </div>
</template>

<script>
import { h } from 'vue'
import { getValueByPath, setValueByPath, getComponentMap } from '../../../utils/common'
import { LAYOUT_TYPES } from '../../../utils/constant'

export default {
  name: 'SearchFormRender',
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
      if (typeof this.__$app.component('search-component-render') === 'undefined') {
        this.$App.component('search-component-render', {
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
                this.renderComponent = (await import(`../../form/row/index.vue`)).default
                break
              case 'textBox':
                this.renderComponent = (await import(`../../form/textBox/index.vue`)).default
                break
              case 'textarea':
                this.renderComponent = (await import(`../../form/textarea/index.vue`)).default
                break
              case 'number':
                this.renderComponent = (await import(`../../form/number/index.vue`)).default
                break
              case 'radio':
                this.renderComponent = (await import(`../../form/radio/index.vue`)).default
                break
              case 'checkBox':
                this.renderComponent = (await import(`../../form/checkBox/index.vue`)).default
                break
              case 'select':
                this.renderComponent = (await import(`../../form/select/index.vue`)).default
                break
              case 'cascader':
                this.renderComponent = (await import(`../../form/cascader/index.vue`)).default
                break
              case 'datetime':
                this.renderComponent = (await import(`../../form/datetime/index.vue`)).default
                break
              case 'imageUpload':
                this.renderComponent = (await import(`../../form/imageUpload/index.vue`)).default
                break
              case 'fileUpload':
                this.renderComponent = (await import(`../../form/fileUpload/index.vue`)).default
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
                const { field, value, logic, type } = item.extras.showConfig[i][j]
                let fieldPath = ''
                if (type === 'custom') {
                  fieldPath = field
                } else {
                  if (this.componentMap[field]) {
                    fieldPath = this.componentMap[field].fieldPath
                  }
                }
                const targetValue = getValueByPath(this.formData, fieldPath)
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
      }
      return show
    }
  }
}
</script>

<style></style>
