<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts">
      <view-component-render
        v-if="componentMap[item.id]"
        :key="`${item.id}-${index}`"
        :viewData="viewData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
        @change="handleValueChange"
      />
    </template>
  </div>
</template>

<script>
import { h } from 'vue'
import { getComponentMap } from '../../utils/common'

export default {
  name: 'ViewRender',
  provide() {
    return {
      onBtnClick: this.handleBtnClick
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
                  this.renderComponent = (await import(`./listView/index.vue`)).default
                  break
                case 'searchForm':
                  this.renderComponent = (await import(`./searchForm/index.vue`)).default
                  break
              }
            } else {
              console.log('component error')
            }
          },
          render({ component, componentMap, viewData }) {
            if (this.renderComponent && component) {
              return h(this.renderComponent, {
                componentMap,
                viewData,
                ...component,
                onChange: self.handleValueChange,
                onGetValue: self.handleValueGet
              })
            }
            return h('div')
          }
        })
      }
    },
    handleBtnClick(event, data) {
      this.$emit(event, data)
    }
  }
}
</script>

<style></style>
