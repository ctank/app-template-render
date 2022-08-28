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
import { h, defineComponent, markRaw } from 'vue'
import {
  getValueByPath,
  setValueByPath,
  getComponentMap,
  getComponentStatus
} from '../../../utils/common'
import { LAYOUT_TYPES } from '../../../utils/constant'

export default defineComponent({
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
                this.renderComponent = markRaw((await import(`../../form/row/index.vue`)).default)
                break
              case 'textBox':
                this.renderComponent = markRaw((await import(`../../form/textBox/index.vue`)).default)
                break
              case 'textarea':
                this.renderComponent = markRaw((await import(`../../form/textarea/index.vue`)).default)
                break
              case 'number':
                this.renderComponent = markRaw((await import(`../../form/number/index.vue`)).default)
                break
              case 'radio':
                this.renderComponent = markRaw((await import(`../../form/radio/index.vue`)).default)
                break
              case 'checkBox':
                this.renderComponent = markRaw((await import(`../../form/checkBox/index.vue`)).default)
                break
              case 'select':
                this.renderComponent = markRaw((await import(`../../form/select/index.vue`)).default)
                break
              case 'cascader':
                this.renderComponent = markRaw((await import(`../../form/cascader/index.vue`)).default)
                break
              case 'datetime':
                this.renderComponent = markRaw((await import(`../../form/datetime/index.vue`)).default)
                break
              case 'imageUpload':
                this.renderComponent = markRaw((await import(`../../form/imageUpload/index.vue`)).default)
                break
              case 'fileUpload':
                this.renderComponent = markRaw((await import(`../../form/fileUpload/index.vue`)).default)
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
        show = getComponentStatus(item.extras.showConfig, this.formData, this.componentMap)
        if (!show) {
          if (!this.components.some((component) => component.fieldPath === item.fieldPath)) {
            setValueByPath(this.formData, item.fieldPath, '')
          }
        }
      }
      return show
    }
  }
})
</script>

<style></style>
