<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts">
      <form-component-render
        v-if="getComponentDisplay(componentMap[item.id])"
        :key="`${item.id}-${index}`"
        :formData="formData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
        :subFormComponents="subFormComponents"
        :disabled="getComponentDisabled(componentMap[item.id])"
      >


        <template v-for="(key, i) in slotKeys" :key="key" v-slot:[key]="data">
          <slot :name="key" v-bind="data"></slot>
        </template>


      </form-component-render>
    </template>
  </div>
</template>

<script>
import { h, defineComponent, markRaw } from 'vue'
import { setValueByPath, getComponentMap, getComponentStatus } from '../../utils/common'
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
    subFormComponents: {
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
  data() {
    return {
      slotKeys: []
    }
  },
  computed: {
    componentMap() {
      return getComponentMap(this.layouts, this.components)
    }
  },
  created() {
    this.registerRenderFun()
    debugger
    this.slotKeys = Object.keys(this.$slots)
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
                this.renderComponent = markRaw((await import(`./row/index.vue`)).default)
                break
              case 'tabs':
                this.renderComponent = markRaw((await import(`./tabs/index.vue`)).default)
                break
              case 'slot':
                this.renderComponent = markRaw((await import(`./slot/index.vue`)).default)
                break
              case 'textBox':
                this.renderComponent = markRaw((await import(`./textBox/index.vue`)).default)
                break
              case 'textarea':
                this.renderComponent = markRaw((await import(`./textarea/index.vue`)).default)
                break
              case 'number':
                this.renderComponent = markRaw((await import(`./number/index.vue`)).default)
                break
              case 'radio':
                this.renderComponent = markRaw((await import(`./radio/index.vue`)).default)
                break
              case 'checkBox':
                this.renderComponent = markRaw((await import(`./checkBox/index.vue`)).default)
                break
              case 'select':
                this.renderComponent = markRaw((await import(`./select/index.vue`)).default)
                break
              case 'cascader':
                this.renderComponent = markRaw((await import(`./cascader/index.vue`)).default)
                break
              case 'datetime':
                this.renderComponent = markRaw((await import(`./datetime/index.vue`)).default)
                break
              case 'imageUpload':
                this.renderComponent = markRaw((await import(`./imageUpload/index.vue`)).default)
                break
              case 'fileUpload':
                this.renderComponent = markRaw((await import(`./fileUpload/index.vue`)).default)
                break
              case 'subForm':
                this.renderComponent = markRaw((await import(`./subForm/index.vue`)).default)
                break
            }
          },
          render({ component, componentMap, formData, subFormComponents, $slots }) {
            if (this.renderComponent && component) {
              
              // if(component.type === 'slot'){

                const children = {}
                if($slots[component.slotName]){
                  children[component.slotName] = (props) => {
                    return $slots[component.slotName](props.data)
                  }
                }



                return h(this.renderComponent, {
                  componentMap,
                  formData,
                  subFormComponents,
                  ...component
                }, children)
                
                
                
                
                
                // [h('template', {
                //   slot: component.slotName
                // }, $slots[component.slotName]())] : [])
              // }
              // return h(this.renderComponent, {
              //   componentMap,
              //   formData,
              //   subFormComponents,
              //   ...component
              // })
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
    },
    getComponentDisabled(item) {
      let disabled = false
      if (item && !LAYOUT_TYPES.includes(item.type)) {
        disabled = getComponentStatus(
          item.extras.readonlyConfig,
          this.formData,
          this.componentMap,
          disabled
        )
      }
      return disabled
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
