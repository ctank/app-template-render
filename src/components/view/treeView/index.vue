<template>
  <div class="atp-treeview">
    <div class="atp-treeview__title" v-if="showTitle">{{ title }}</div>
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
          handleNodeDrag('dragEnter', { draggingNode, dropNode, event })
        }
      "
      @node-drag-leave="
        (draggingNode, dropNode, event) => {
          handleNodeDrag('dragLeave', { draggingNode, dropNode, event })
        }
      "
      @node-drag-over="
        (draggingNode, dropNode, event) => {
          handleNodeDrag('dragOver', { draggingNode, dropNode, event })
        }
      "
      @node-drag-end="
        (draggingNode, dropNode, dropType, event) => {
          handleNodeDrag('dragEnd', { draggingNode, dropNode, dropType, event })
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
          <div
            v-if="extras.displaySet && extras.displaySet.length"
            class="atp-treeview__node-title"
          >
            <template v-for="(item, index) in extras.displaySet">
              <span class="mr-1" v-if="item.fieldType === 'option'" :key="`tree-option-${index}`">
                {{ getValueByPath(item, data) }}
              </span>

              <span class="mr-1" v-else :key="`tree-text-${index}`">
                {{ getValueByPath(item, data) }}
              </span>
            </template>
          </div>
          <div v-else class="atp-treeview__node-title">
            {{ node.label }}
          </div>
          <div class="atp-treeview__node-action">
            <template v-for="btn in extras.operations">
              <el-button
                v-if="
                  getComponentDisplay(data, btn) && (isAdmin || checkPermission(btn.permission))
                "
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
import { defineComponent } from 'vue'
import base from '../base.vue'
import { getValueByPath, getComponentStatus } from '../../../utils/common'

export default defineComponent({
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
      return getComponentStatus(item.showConfig, row)
    },
    getValueByPath(item, data) {
      let value = getValueByPath(data, item.fieldPath)
      if (item.fieldType !== 'option') {
        return value
      }

      for (let i = 0; i < item.fieldFormat.length; i++) {
        if (item.fieldFormat[i].value === value) {
          value = item.fieldFormat[i].label
          break
        }
      }
      return value
    },
    handleNodeDrag(type, dragData) {
      if (this.extras.draggableEvent) {
        this.onEvent(this.extras.draggableEvent, {
          ...dragData,
          eventType: type,
          data: this.value
        })
      }
    },
    handleBtnClick(event, row) {
      this.onEvent(event, row)
    }
  }
})
</script>

<style lang="scss">
.atp-treeview {
  .atp-treeview__title,
  .atp-treeview__search {
    margin-bottom: 15px;
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
