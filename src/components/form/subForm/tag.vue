<template>
  <span class="atp-tag" :style="style"><slot></slot></span>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    color: {
      type: String,
      default() {
        return '#000000'
      }
    },
    hit: {
      type: Boolean,
      default() {
        return false
      }
    }
  },

  computed: {
    style() {
      return `color:${this.color};background-color:${this.hex2Rgba(this.color, 0.1)};`
    }
  },
  methods: {
    hex2Rgba(color, alpha = 1) {
      const reg = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/
      if (!reg.test(color)) {
        return
      }
      let newColor = color.toLowerCase().replace(/\#/g, '')
      if (newColor.length === 3) {
        let t = ''
        for (let i = 0; i < newColor.length; i++) {
          t += newColor.slice(i, i + 1).concat(newColor.slice(i, i + 1))
        }
        newColor = t
      }
      // 将字符串分隔，两个两个的分隔
      const arr = []
      for (let i = 0; i < 6; i = i + 2) {
        const s = newColor.slice(i, i + 2)
        arr.push(parseInt('0x' + s))
      }
      return `rgba(${arr.join(',')},${alpha})`
    }
  }
}
</script>

<style>
.atp-tag {
  border-radius: 2px;
  padding: 2px 5px;
}
</style>
