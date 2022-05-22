<template>
  <div class="tabfream-panel">
    <el-scrollbar>
      <div class="tabfream-tabs">
        <div
          class="tabfream-tabs__item"
          v-for="item in openedPageRouters"
          :class="{
            'tabfream-tabs__item-active': item.fullPath == $route.fullPath
          }"
          :key="item.fullPath"
          @click="onClick(item)"
          @contextmenu.prevent="showContextMenu($event, item)"
        >
          {{ item.meta.title }}
          <span
            class="el-icon-close"
            @click.stop="onClose(item)"
            @contextmenu.prevent.stop=""
            v-if="!item.meta || !item.meta.isLock"
            :style="openedPageRouters.length <= 1 ? 'width:0;' : ''"
          ></span>
        </div>
      </div>
    </el-scrollbar>
    <div v-show="contextMenuVisible">
      <ul
        :style="{ left: contextMenuLeft + 'px', top: contextMenuTop + 'px' }"
        class="tabfream-tabs__contextmenu"
      >
        <li>
          <el-button type="text" @click="reload" size="small"> 重新加载 </el-button>
        </li>
        <li>
          <el-button type="text" @click="closeOtherLeft" :disabled="false" size="small"
            >关闭左边</el-button
          >
        </li>
        <li>
          <el-button type="text" @click="closeOtherRight" :disabled="false" size="small"
            >关闭右边</el-button
          >
        </li>
        <li>
          <el-button type="text" @click="closeOther" size="small">关闭其他</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import routeList from '@/router/index/index'

export default {
  props: {
    // keep-alive控件实例对象
    keepAliveComponentInstance: {},
    // 空白路由的name值
    blankRouteName: {
      type: String,
      default: 'blank'
    }
  },
  data() {
    return {
      // 右键菜单是否显示
      contextMenuVisible: false,
      // 右键菜单显示位置
      contextMenuLeft: 0,
      // 右键菜单显示位置
      contextMenuTop: 0,
      // 右键所指向的菜单路由
      contextMenuTargetPageRoute: null,
      // 已打开的路由页面
      openedPageRouters: []
    }
  },
  watch: {
    // 当路由变更时，执行打开页面的方法
    $route: {
      handler(n) {
        if (n.href) {
          this.openPage(n)
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.openDefalut(routeList)
    // 添加点击关闭右键菜单
    window.addEventListener('click', this.closeContextMenu)
  },
  destroyed() {
    window.removeEventListener('click', this.closeContextMenu)
  },
  methods: {
    /**
     * 打开默认路由
     * @param {Array} routes 路由集合
     */
    openDefalut(routes) {
      routes.forEach((item) => {
        if (item.meta && item.meta.isDefault) {
          this.openedPageRouters.push({
            meta: item.meta,
            name: item.name,
            path: item.path,
            __temp__: true
          })
        }
      })
    },
    /**
     * 打开页面
     * @param {Object} route 路由
     */
    openPage(route) {
      if (route.name === this.blankRouteName) {
        return
      }
      const isExist = this.openedPageRouters.some((item) => item.fullPath === route.fullPath)
      if (!isExist) {
        const openedPageRoute = this.openedPageRouters.find((item) => item.path === route.path)
        // 判断页面是否支持不同参数多开页面功能，如果不支持且已存在path值一样的页面路由，那就替换它
        if (!route.meta.canMultipleOpen && openedPageRoute != null) {
          this.delRouteCache(openedPageRoute.fullPath)
          this.openedPageRouters.splice(this.openedPageRouters.indexOf(openedPageRoute), 1, route)
        } else {
          this.openedPageRouters.push(route)
        }
      }
    },
    /**
     * 标签点击
     * @param {Object} route 路由
     */
    onClick(route) {
      if (route.fullPath !== this.$route.fullPath) {
        if (route.__temp__) {
          this.$router.push(route.path)
        } else {
          this.$router.push(route.fullPath)
        }
      }
    },
    /**
     * 标签关闭
     * @param {Object} route 路由
     */
    onClose(route) {
      const index = this.openedPageRouters.indexOf(route)
      this.delPageRoute(route)
      if (route.fullPath === this.$route.fullPath) {
        // 删除页面后，跳转到上一页面
        this.$router.replace(this.openedPageRouters[index === 0 ? 0 : index - 1])
      }
    },
    /**
     * 显示右键菜单
     * @param {MouseEvent} e 鼠标事件
     * @param {Object} route 路由
     */
    showContextMenu(e, route) {
      this.contextMenuTargetPageRoute = route
      this.contextMenuLeft = e.layerX
      this.contextMenuTop = e.layerY
      this.contextMenuVisible = true
    },
    /**
     * 隐藏右键菜单
     */
    closeContextMenu() {
      this.contextMenuVisible = false
      this.contextMenuTargetPageRoute = null
    },
    /**
     * 重载页面
     */
    reload() {
      console.log(1)
      const fullPath = this.contextMenuTargetPageRoute.fullPath
      this.delRouteCache(fullPath)
      if (fullPath === this.$route.fullPath) {
        this.$router.replace({ name: this.blankRouteName }).then(() => {
          this.$nextTick(() => {
            this.$router.replace(fullPath)
          })
        })
      }
    },
    /**
     * 关闭其他页面
     */
    closeOther() {
      for (let i = 0; i < this.openedPageRouters.length; i++) {
        const r = this.openedPageRouters[i]
        if (r !== this.contextMenuTargetPageRoute) {
          if (this.delPageRoute(r)) {
            i--
          }
        }
      }
      if (this.contextMenuTargetPageRoute.fullPath !== this.$route.fullPath) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
    },
    /**
     * 根据路径获取索引
     * @param {String} fullPath 路由路径
     */
    getPageRouteIndex(fullPath) {
      for (let i = 0; i < this.openedPageRouters.length; i++) {
        if (this.openedPageRouters[i].fullPath === fullPath) {
          return i
        }
      }
    },
    /**
     * 关闭左边页面
     */
    closeOtherLeft() {
      let index = this.openedPageRouters.indexOf(this.contextMenuTargetPageRoute)
      const currentIndex = this.getPageRouteIndex(this.$route.fullPath)
      if (index > currentIndex) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
      for (let i = 0; i < index; i++) {
        const r = this.openedPageRouters[i]
        if (this.delPageRoute(r)) {
          i--
          index--
        }
      }
    },
    /**
     * 关闭右边页面
     */
    closeOtherRight() {
      const index = this.openedPageRouters.indexOf(this.contextMenuTargetPageRoute)
      const currentIndex = this.getPageRouteIndex(this.$route.fullPath)
      for (let i = index + 1; i < this.openedPageRouters.length; i++) {
        const r = this.openedPageRouters[i]
        if (this.delPageRoute(r)) {
          i--
        }
      }
      if (index < currentIndex) {
        this.$router.replace(this.contextMenuTargetPageRoute)
      }
    },
    /**
     * 删除页面
     * @param {Object} route 路由
     */
    delPageRoute(route) {
      if (!route.meta || !route.meta.isLock) {
        const routeIndex = this.openedPageRouters.indexOf(route)
        if (routeIndex >= 0) {
          this.openedPageRouters.splice(routeIndex, 1)
        }
        this.delRouteCache(route.fullPath)
        return true
      }
      return false
    },
    /**
     * 删除页面缓存
     * @param {String} key 缓存key
     */
    delRouteCache(key) {
      if (
        this.keepAliveComponentInstance &&
        this.keepAliveComponentInstance._ &&
        this.keepAliveComponentInstance._.__v_cache
      ) {
        this.keepAliveComponentInstance._.__v_cache.delete(key)
      }
    }
  }
}
</script>

<style lang="scss">
.tabfream-panel {
  .tabfream-tabs__contextmenu {
    margin: 0;
    border: 1px solid #e4e7ed;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, 0.1);
    li {
      margin: 0;
      padding: 0px 15px;
      &:hover {
        background: #f2f2f2;
        cursor: pointer;
      }
      button {
        color: #2c3e50;
      }
    }
  }

  $c-tab-border-color: #dcdfe6;
  position: relative;
  &::before {
    content: '';
    border-bottom: 1px solid $c-tab-border-color;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
  }
  .tabfream-tabs {
    display: flex;
    .tabfream-tabs__item {
      white-space: nowrap;
      padding: 8px 6px 8px 18px;
      font-size: 12px;
      border: 1px solid $c-tab-border-color;
      border-left: none;
      border-bottom: 0px;
      line-height: 14px;
      cursor: pointer;
      transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
        padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      &:first-child {
        border-left: 1px solid $c-tab-border-color;
        border-top-left-radius: 2px;
        margin-left: 10px;
      }
      &:last-child {
        border-top-right-radius: 2px;
        margin-right: 10px;
      }
      &:not(.tabfream-tabs__item-active):hover {
        color: #409eff;
        .el-icon-close {
          width: 12px;
          margin-right: 0px;
        }
      }
      &.tabfream-tabs__item-active {
        padding-right: 12px;
        border-bottom: 1px solid #fff;
        color: #409eff;
        .el-icon-close {
          width: 12px;
          margin-right: 0px;
          margin-left: 2px;
        }
      }
      .el-icon-close {
        width: 0px;
        height: 12px;
        overflow: hidden;
        border-radius: 50%;
        font-size: 12px;
        margin-right: 12px;
        transform-origin: 100% 50%;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        vertical-align: text-top;
        &:hover {
          background-color: #c0c4cc;
          color: #fff;
        }
      }
    }
  }
}
</style>
