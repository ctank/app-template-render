<template>
  <div class="component-render">
    <div v-for="(item, index) in layouts" :key="`${item.id}-${index}`">
      <view-component-render
        v-if="getComponentDisplay(componentMap[item.id])"
        :viewData="viewData"
        :component="componentMap[item.id]"
        :componentMap="componentMap"
        @change="handleValueChange"
      />
    </div>
  </div>
</template>

<script>
import { h } from 'vue'
import { getValueByPath, setValueByPath } from '@/utils/common'

export default {
  name: 'ViewRender',
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
    this.demo()
  },
  methods: {
    demo() {
      const self = this
      this.$App.component('view-component-render', {
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
        render() {
          if (this.component) {
            const render = require(`./${this.component.type}`).default
            // debugger
            return h(render, {
              componentMap: this.componentMap,
              viewData: this.viewData,
              ...this.component,
              onBtnClick: self.handleBtnClick
            })
          }

          return h('div')
        }
      })
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
