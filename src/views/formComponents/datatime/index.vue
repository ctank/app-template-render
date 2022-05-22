<template>
  <div>
    <el-date-picker v-model="value1" type="datetime" placeholder="Select date and time">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: 'DataTime',
  data() {
    return {
      value1: ''
    }
  }
}
</script>

<style></style>
