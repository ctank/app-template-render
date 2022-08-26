<template>
  <div class="atp-treeview">
    <el-input class="atp-treeview__search" v-if="extras.filter" v-model="filterText" />
    <el-tree
      ref="treeRef"
      class="filter-tree"
      :data="value"
      :props="defaultProps"
      :draggable="extras.draggable || false"
      :default-expand-all="extras.expandAll || false"
      :filter-node-method="filterNode"
      @node-drag-start="
        (draggingNode, event) => {
          handleNodeDrag('dragStart', { draggingNode, event })
        }
      "
      @node-drag-enter="
        (draggingNode, dropNode, event) => {
          handleNodeDrag('dropEnter', { draggingNode, dropNode, event })
        }
      "
      @node-drag-leave="
        (draggingNode, dropNode, event) => {
          handleNodeDrag('dropLeave', { draggingNode, dropNode, event })
        }
      "
      @node-drag-over="
        (draggingNode, dropNode, event) => {
          handleNodeDrag('dropOver', { draggingNode, dropNode, event })
        }
      "
      @node-drag-end="
        (draggingNode, dropNode, dropType, event) => {
          handleNodeDrag('dropEnd', { draggingNode, dropNode, dropType, event })
        }
      "
      @node-drop="
        (draggingNode, dropNode, dropType, event) => {
          handleNodeDrag('drop', { draggingNode, dropNode, dropType, event })
        }
      "
    >
      <template #default="{ node, data }">
        <div class="atp-treeview__node">
          <div class="atp-treeview__title">{{ node.label }}</div>
          <div class="atp-treeview__action">
            <template v-for="btn in extras.operations">
              <el-button
                v-if="getComponentDisplay(data, btn)"
                :key="btn.buttonEvent"
                :type="btn.buttonType"
                @click.stop="handleBtnClick(btn.buttonEvent, data)"
                size="small"
              >
                {{ btn.buttonName }}
              </el-button>
            </template>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script>
import base from '../base.vue'
import { isValueEqual } from '../../../utils/common'

export default {
  name: 'TreeView',
  extends: base,
  data() {
    return {
      filterText: ''
    }
  },
  computed: {
    defaultProps() {
      return {
        children: this.extras.childrenField || 'children',
        label: this.extras.titleField || 'label',
        disabled: this.extras.disabledField || 'disabled',
        class: (data, node) => {
          if (data[this.extras.disabledField || 'disabled']) {
            return 'atp-treeview__node--disabled'
          }
        }
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.treeRef.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.includes(value)
    },
    getComponentDisplay(row, item) {
      let show = true
      if (item && Array.isArray(item.showConfig) && item.showConfig.length) {
        show = false
        for (let i = 0; i < item.showConfig.length; i += 1) {
          if (!show) {
            for (let j = 0; j < item.showConfig[i].length; j += 1) {
              const { field, value, logic } = item.showConfig[i][j]
              const targetValue = row[field] || ''
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
      }
      return show
    },
    handleNodeDrag(type, dragData) {
      if (this.extras.draggableEvent) {
        this.onEvent(this.extras.draggableEvent, {
          ...dragData,
          eventType: type,
          data: this.demo
        })
      }
    },
    handleBtnClick(event, row) {
      this.onEvent(event, row)
    }
  }
}
</script>

<style lang="scss">
.atp-treeview {
  .atp-treeview__search {
    margin-bottom: 20px;
  }
  .atp-treeview__node {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding-right: 10px;
  }
  .atp-treeview__node--disabled {
    color: #ccc;
  }
  .el-tree-node__content {
    height: 36px;
    line-height: 36px;
  }
}
</style>
