<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts">
      <view-component-render
        v-if="componentMap[item.id]"
        :key="`${item.id}-${index}`"
        :viewData="viewData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
        :permissions="permissions"
      />
    </template>
  </div>
</template>

<script>
import { h, defineComponent, markRaw } from 'vue'
import { getComponentMap } from '../../utils/common'

export default defineComponent({
  name: 'ViewRender',
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
    viewData: {
      type: Object,
      default() {
        return null
      }
    },
    searchForm: {
      type: Object,
      default() {
        return null
      }
    },
    permissions: {
      type: Array,
      default() {
        return ['*']
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
    this.init()
  },
  methods: {
    init() {
      const searchFormComponent = this.components.find((item) => item.type === 'searchForm')
      if (searchFormComponent && this.searchForm) {
        const { components, layouts } = this.searchForm
        const filterLayout = (res, layouts) => {
          res.forEach((layout) => {
            if (['row', 'column', 'tabs', 'tabPanel'].includes(layout.type) && layout.children) {
              layouts = filterLayout(layout.children, layouts)
            } else {
              layouts.push(layout)
            }
          })
          return layouts
        }
        searchFormComponent.extras.layouts = filterLayout(layouts, [])
        searchFormComponent.extras.components = components
      }
    },
    registerRenderFun() {
      if (typeof this.__$app.component('view-component-render') === 'undefined') {
        this.__$app.component('view-component-render', {
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
            viewData: {
              type: Object,
              default() {
                return null
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
            return {
              renderComponent: null
            }
          },
          async created() {
            if (this.component) {
              switch (this.component.type) {
                case 'listView':
                  this.renderComponent = markRaw((await import(`./listView/index.vue`)).default)
                  break
                case 'treeView':
                  this.renderComponent = markRaw((await import(`./treeView/index.vue`)).default)
                  break
                case 'searchForm':
                  this.renderComponent = markRaw((await import(`./searchForm/index.vue`)).default)
                  break
              }
            } else {
              console.log('component error')
            }
          },
          render({ component, componentMap, viewData, permissions }) {
            if (this.renderComponent && component) {
              return h(this.renderComponent, {
                componentMap,
                viewData,
                permissions,
                ...component
              })
            }
            return h('div')
          }
        })
      }
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

<style></style>
