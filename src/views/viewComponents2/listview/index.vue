<template>
  <div>
    <el-table :data="data" style="width: 100%">
      <template v-for="(column, index) in columns">
        <el-table-column v-if="column.type === 'component'" :key="`component-${index}`" v-bind="column.props">
          <template #default="{ row, $index }"> {{row}} </template>
        </el-table-column>
        <el-table-column v-else :key="`text-${index}`" v-bind="column.props" />
      </template>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ListView',
  data() {
    return {
      columns: [
        {
          props: {
            prop: 'date',
            label: '日期',
            width: '180'
          },
          type: 'text'
        },
        {
          props: {
            prop: 'name',
            label: '姓名',
            width: '180'
          },
          type: 'text'
        },
        {
          props: {
            prop: 'address',
            label: '地址'
          },
          type: 'component'
        }
      ],
      data: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom2',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom3',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom4',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    }
  }
}
</script>

<style></style>
