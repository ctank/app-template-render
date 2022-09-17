<template>
  <div class="atp-listview">
    <div class="atp-listview__action">
      <template v-for="btn in extras.operations">
        <el-button
          v-if="isAdmin || checkPermission(btn.permission)"
          :key="btn.buttonEvent"
          :type="btn.buttonType"
          @click="handleBtnClick(btn.buttonEvent)"
        >
          {{ btn.buttonName }}
        </el-button>
      </template>
    </div>
    <div class="atp-listview__title" v-if="showTitle">{{ title }}</div>
    <el-table
      :data="viewData[dataPath]"
      style="width: 100%"
      :border="tableStyle.border"
      :stripe="tableStyle.stripe"
      ref="listViewTable"
    >
      <!-- 选择列 -->
      <el-table-column
        v-if="extras.checkBox"
        type="selection"
        fixed="left"
        :width="40"
        align="center"
      ></el-table-column>
      <!-- 序号列 -->
      <el-table-column label="序号" v-if="extras.showNum" fixed="left" :width="60" align="center">
        <template #default="{ $index }"> {{ $index + 1 }} </template>
      </el-table-column>
      <template v-for="(column, index) in extras.columns">
        <el-table-column
          v-if="column.type === 'field'"
          :key="`field-${index}`"
          :label="column.label"
          :width="column.width || ''"
          :align="column.align || 'left'"
        >
          <template #default="{ row, $index }">
            <column-content
              :row="row"
              :column="column"
              @click="handleColBtnClick(column.clickEvent, row)"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else
          fixed="right"
          :key="`button-${index}`"
          :label="column.label"
          :width="column.width || ''"
          :align="column.align || 'left'"
        >
          <template #default="{ row, $index }">
            <template v-for="btn in column.actionConfig">
              <el-button
                v-if="getComponentDisplay(row, btn) && (isAdmin || checkPermission(btn.permission))"
                :key="btn.buttonEvent"
                :type="btn.buttonType"
                link
                @click="handleColBtnClick(btn.buttonEvent, row)"
              >
                {{ btn.buttonName }}
              </el-button>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="extras.showPagination"
      small
      background
      class="atp-listview__pagination"
      :page-sizes="extras.pageSize"
      layout="sizes, prev, pager, next"
      :total="pagination.total"
      v-model:currentPage="pagination.currentPage"
      v-model:pageSize="pagination.pageSize"
      @size-change="handlePaginationSizeChange"
      @current-change="handlePaginationCurrentChange"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'
import { isValueEqual, getComponentStatus } from '../../../utils/common'
import ColumnContent from './columnContent.vue'

export default defineComponent({
  name: 'ListView',
  extends: base,
  components: { ColumnContent },
  data() {
    return {}
  },
  computed: {
    tableStyle() {
      const style = {
        border: false,
        stripe: false
      }
      switch (this.extras.tableStyle) {
        case 'borderNoStripe':
          style.border = true
          style.stripe = false
          break
        case 'borderStripe':
          style.border = true
          style.stripe = true
          break
        case 'noBorderNoStripe':
          style.border = false
          style.stripe = false
          break
        case 'noBorderStripe':
          style.border = false
          style.stripe = true
          break
      }
      return style
    },
    pagination() {
      if (this.viewData.pagination) {
        return this.viewData.pagination
      }
      return {
        total: 0,
        pageSize: 10,
        currentPage: 1
      }
    }
  },
  methods: {
    getComponentDisplay(row, item) {
      return getComponentStatus(item.showConfig, row)
    },
    handleBtnClick(event) {
      const data = {}
      if (this.extras.checkBox) {
        const table = this.$refs.listViewTable
        data.selections = table.getSelectionRows() || []
      }
      this.onEvent(event, data)
    },
    handleColBtnClick(event, row) {
      if (event) {
        this.onEvent(event, row)
      } else {
        console.log('未配置相关事件')
      }
    },
    handlePaginationCurrentChange(val) {
      this.onEvent('currentChange', val)
    },
    handlePaginationSizeChange(val) {
      this.onEvent('sizeChange', val)
    }
  }
})
</script>

<style lang="scss">
.atp-listview {
  .atp-listview__action {
    margin-bottom: 20px;
  }
  .atp-listview__pagination {
    justify-content: flex-end;
    margin-top: 20px;
  }
}
</style>
