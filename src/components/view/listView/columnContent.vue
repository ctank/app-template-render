<template>
  <div class="atp-listview__column">
    <span v-if="!config.isTag">{{ config.content }}</span>
    <tag v-else :color="config.color">{{ config.content }}</tag>
  </div>
</template>

<script>
import Tag from './tag.vue'

export default {
  name: 'ColumnContent',
  components: { Tag },
  props: {
    row: {
      type: Object,
      default() {
        return null
      }
    },
    column: {
      type: Object,
      default() {
        return null
      }
    }
  },
  computed: {
    config() {
      const value = this.row[this.column.fieldPath] || ''
      const c = {
        content: '',
        isTag: false,
        color: ''
      }
      if (this.column.fieldType === 'text') {
        c.content = value
      } else if (this.column.fieldType === 'option') {
        const item = (this.column.options || []).find((option) => option.value === value)
        if (item) {
          c.content = item.label
          if (item.color) {
            c.isTag = true
            c.color = item.color
          }
        }
      }
      return c
    }
  }
}
</script>

<style></style>
