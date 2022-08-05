<template>
  <div class="atp-image-list">
    <div class="atp-image-list__item mr-2" v-for="(image, index) in fileList" :key="image.url">
      <div class="atp-image-list__delete" @click="handleImageRemove(index)">
        <el-icon><CircleCloseFilled /></el-icon>
      </div>
      <el-image
        :style="itemPicStyle"
        class="atp-image-list__pic"
        :src="image.url"
        :preview-src-list="previewSrcList"
        fit="cover"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'

export default defineComponent({
  name: 'ImageList',
  extends: base,
  props: {
    fileList: {
      type: Array,
      default() {
        return []
      }
    },
    width: {
      type: Number,
      default() {
        return 50
      }
    },
    height: {
      type: Number,
      default() {
        return 50
      }
    },
    disabled: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      input: ''
    }
  },
  computed: {
    itemPicStyle() {
      return `height:${this.height}px;width:${this.width}px;`
    },
    previewSrcList() {
      if (Array.isArray(this.fileList)) {
        return this.fileList.map((file) => file.url)
      }
      return []
    }
  },
  watch: {},
  created() {},
  methods: {
    handleImageRemove(index){
      this.$emit('remove', index)
    }
  }
})
</script>

<style>
.atp-image-list {
  display: flex;
}
.atp-image-list .atp-image-list__item {
  display: flex;
  position: relative;
}

.atp-image-list .atp-image-list__delete {
  position: absolute;
  padding: 5px;
  line-height: 1px;
  color: #ca0000;
  cursor: pointer;
  right: -10px;
  top: -10px;
  z-index: 10;
  font-size: 16px;
}

.atp-image-list .atp-image-list__delete .el-icon {
  background: #fff;
  border-radius: 100%;
}
</style>
