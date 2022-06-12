<template>
  <div class="apptemp-listview">
    <div class="apptemp-listview__action">
      <el-button
        v-for="btn in extras.operations"
        :key="btn.buttonEvent"
        :type="btn.buttonType"
        @click="handleBtnClick(btn.buttonEvent)"
      >
        {{ btn.buttonName }}
      </el-button>
    </div>
    <div class="apptemp-listview__title" v-if="showTitle">{{ title }}</div>
    <el-table
      :data="viewData[dataPath]"
      style="width: 100%"
      :border="tableStyle.border"
      :stripe="tableStyle.stripe"
      ref="listViewTable"
    >
      <!-- 选择列 -->
      <el-table-column v-if="extras.checkBox" type="selection"></el-table-column>
      <!-- 序号列 -->
      <el-table-column label="序号" v-if="extras.showNum">
        <template #default="{ $index }"> {{ $index + 1 }} </template>
      </el-table-column>
      <template v-for="(column, index) in extras.columns">
        <el-table-column
          v-if="column.type === 'field'"
          :key="`field-${index}`"
          :label="column.label"
        >
          <template #default="{ row, $index }"> {{ row[column.fieldPath] }} </template>
        </el-table-column>
        <el-table-column v-else :key="`button-${index}`" :label="column.label">
          <template #default="{ row, $index }">
            <el-button
              v-for="btn in column.actionConfig"
              :key="btn.buttonEvent"
              :type="btn.buttonType"
              @click="handleColBtnClick(btn.buttonEvent, row)"
            >
              {{ btn.buttonName }}
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      small
      background
      :page-sizes="extras.pageSize"
      layout="sizes, prev, pager, next"
      :total="2"
    />
  </div>
</template>

<script>
import base from '../base.vue'

export default {
  name: 'ListView',
  extends: base,
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
    }
  },
  methods: {
    handleBtnClick(event) {
      const data = {}
      if (this.extras.checkBox) {
        const table = this.$refs.listViewTable
        data.selections = table.getSelectionRows() || []
      }
      this.onBtnClick(event, data)
    },
    handleColBtnClick(event, row) {
      this.onBtnClick(event, row)
    }
  }
}
</script>

<style></style>
