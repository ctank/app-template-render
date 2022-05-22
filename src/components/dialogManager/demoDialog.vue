<template>
  <div>{{ id }}</div>
</template>

<script>
export default {
  name: 'dialogDemo',
  props: {
    id: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {}
  },
  created() {
    console.log('执行created')
  },
  mounted() {
    console.log('执行mounted')
    this.$parent.$children = this
  },
  destroyed() {
    console.log('执行destroyed')
  },
  methods: {
    confirm() {
      this.$attrs.events.confirm()
    },
    cancel() {
      this.$attrs.events.cancel()
    }
  }
}
</script>
