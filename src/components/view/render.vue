<template>
  <div class="component-render">
    <template v-for="(item, index) in layouts">
      <view-component-render
        v-if="getComponentDisplay(componentMap[item.id])"
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
import { getValueByPath, setValueByPath } from '../../utils/common'

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
            switch (this.component.type) {
              case 'listView':
                this.renderComponent = (await import(`./listView/index.vue`)).default
                break
              case 'searchForm':
                this.renderComponent = (await import(`./searchForm/index.vue`)).default
                break
            }
          },
          render() {
            if (this.renderComponent && component) {
              return h(this.renderComponent, {
                componentMap: this.componentMap,
                viewData: this.viewData,
                ...this.component,
                onChange: self.handleValueChange,
                onGetValue: self.handleValueGet
              })
            }
            return h('div')
          }
        })
      }
    },
    getComponentDisplay(item) {
      let show = true

      if (item.extras.usageCondition && item.extras.usageCondition.length) {
        show = false
        for (let i = 0; i < item.extras.usageCondition.length; i += 1) {
          if (!show) {
            for (let j = 0; j < item.extras.usageCondition[i].length; j += 1) {
              const { field, value, logic } = item.extras.usageCondition[i][j]
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
    handleBtnClick(event, data) {
      this.$emit(event, data)
    }
  }
}
</script>

<style></style>
