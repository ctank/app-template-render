<template>
  <div class="atp-file-list">
    <div
      class="atp-file-list__item"
      :class="file.percent && file.percent < 100 ? 'atp-file-list__item--progress' : ''"
      v-for="(file, index) in fileList"
      :key="file.url"
    >
      <div class="atp-file-list__content">
        <div class="atp-file-list__icon">
          <img class="atp-file-icon" :src="getFileTypeIconSrc(file)" />
        </div>
        <div class="atp-file-list__title">
          <span :title="file.name" @click="handleFilePreview(file)">{{ file.name }}</span>
        </div>
        <div class="atp-file-list_action">
          <el-icon title="删除" @click="handleFIleRemove(index)"><Delete /></el-icon>
        </div>
      </div>
      <div class="atp-progress atp-file-progress" v-if="file.percent && file.percent < 100">
        <div
          class="atp-progress__bar atp-progress__bar--striped atp-progress__bar--animated"
          :style="`width:${file.percent || 100}%;`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import base from '../base.vue'
import { FILE_EXT_ICONS, FILE_TYPE_ICONS } from '../../../utils/constant'

const FILE_TYPES = {
  excel: ['xls', 'xlsx'],
  music: ['mp3', 'wav'],
  pic: ['jpg', 'png', 'gif'],
  ppt: ['ppt', 'pptx'],
  video: ['mp4'],
  word: ['doc', 'docx'],
  zip: ['zip', 'rar', '7z']
}

export default defineComponent({
  name: 'FileList',
  extends: base,
  props: {
    fileList: {
      type: Array,
      default() {
        return []
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
      fileTypeIcons: FILE_TYPE_ICONS
    }
  },
  watch: {},
  created() {},
  methods: {
    getFileTypeIconSrc(file) {
      let src = FILE_TYPE_ICONS.default
      const extIndex = file.name.lastIndexOf('.')
      if (extIndex >= 0) {
        const extName = file.name.substr(extIndex + 1)
        if (FILE_EXT_ICONS[extName.toLowerCase()]) {
          src = FILE_EXT_ICONS[extName.toLowerCase()]
        } else {
          for (const key in FILE_TYPES) {
            if (FILE_TYPES[key].includes(extName)) {
              src = FILE_TYPE_ICONS[key]
            }
          }
        }
      }
      return src
    },
    handleFilePreview(file) {
      this.$emit('preview', file)
    },
    handleFIleRemove(index) {
      this.$emit('remove', index)
    }
  }
})
</script>

<style lang="scss">
.atp-file-list {
  .atp-file-list__item {
    line-height: 16px;
    position: relative;
    padding-top: 7px;
    margin-bottom: 5px;
    .atp-file-list__content {
      display: flex;
      padding: 0 5px;
    }
    .atp-file-list__icon {
      margin-right: 5px;
      .atp-file-icon {
        vertical-align: bottom;
      }
    }
    .atp-file-list__title {
      flex: 1;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      span {
        cursor: pointer;
      }
    }
    .atp-file-list_action {
      .el-icon {
        cursor: pointer;
      }
    }
    .atp-file-progress {
      margin-top: 5px;
    }
    &:hover {
      background-color: #ecf6fd;
      .material-icons {
        opacity: 1;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    &:not(.atp-file-list__item--progress) {
      padding-bottom: 7px;
    }
  }
}

.atp-file-icon {
  width: 18px;
  height: 18px;
}

.atp-progress {
  display: flex;
  height: 3px;
  overflow: hidden;
  background-color: #e2e2e9;
  border-radius: 3px;
  position: relative;

  .atp-progress__bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    text-align: center;
    white-space: nowrap;
    background-color: #409eff;
    transition: width 0.6s ease;
  }

  .atp-progress__bar--striped {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1rem 1rem;
  }

  .atp-progress__bar--animated {
    animation: atp-progress__bar-stripes 1s linear infinite;
  }
}

@keyframes atp-progress__bar-stripes {
  from {
    background-position: 1rem 0;
  }

  to {
    background-position: 0 0;
  }
}
</style>
