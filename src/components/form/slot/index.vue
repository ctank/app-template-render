<template>
  <div class="component-render__slot">
    <slot :name="slotName" :data="{slotName, id}"></slot>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'

export default defineComponent({
  name: 'SlotBox',
  extends: base,
  props: {
    slotName: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {},
  created() {},
  methods: {}
})
</script>

<style></style>
