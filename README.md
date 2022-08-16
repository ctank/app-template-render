# APP-TEMPLATE-RENDER

ATR是一个基于`VUE3`和`ElementPlus`的纯前端渲染组件，也仅仅是一个前端渲染组件，可以做到通过相应的`JSON`生成简单的表单和视图，提高前端开发效率

# 为什么要做ATR

面对B端页面的开发，前端更多的是CV一下之前差不多的页面，改UI改接口，然后就没有然后了，小团队立马开发出一套低代码工具来实现项目阻力也比较大，所以就搞了个ATR来提高一点前端的开发效率

# 快速开始

## 安装
```
# NPM
npm install app-template-render

# Yarn
yarn add app-template-render
```

## 引入
```js
import appTemplateRender from 'app-template-render'
import 'app-template-render/dist/appTempRender.css'

const app = createApp(App)
app.use(appTemplateRender)
```

## 视图渲染
```vue
<template>
  <div class="demo-list">
    <view-render
      :viewData="listViewData"
      :layouts="listViewConfig.layouts"
      :components="listViewConfig.components"
      :searchForm="searchFormConfig"
      @search="handleSearch"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      @change="handleValueChange"
    />
  </div>
</template>

<script>
export default {
  name: 'ListDemo',
  data() {
    return {
      // 查询表单配置
      searchFormConfig: searchForm,
      // 视图配置
      listViewConfig: listView,
      // 视图
      listViewData: {
      	// 列表数据
        list: [],
        // 查询表单
        search: {
          name: '',
          address: ''
        },
        // 分页数据
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        }
      }
    }
  },
  methods: {
    /**
     * 查询
     */
    handleSearch() {
      ...
    },
  	/**
     * 修改每页条数
     * @param {Number} size 每页条数
     */
    handleSizeChange(size) {
      ...
    },
    /**
     * 翻页
     * @param {Number} current 页数
     */
    handleCurrentChange(current) {
      ...
    }
  }
}
</script>
```

## 表单渲染
```vue
<template>
  <el-form
    class="demo-form"
    label-position="right"
    label-width="120px"
    :model="formData"
  >
    <form-render
      :formData="formData"
      :layouts="formTemp.layouts"
      :components="formTemp.components"
      @change="handleValueChange"
    />
  </el-form>
</template>

<script>
import appTemplateRender from 'app-template-render'

const { setValue } = appTemplateRender.Utils

export default {
  name: 'DemoForm',
  data() {
    return {
      // 表单配置
      formTemp,
      // 表单数据
      formData: {
        name: '',
        address: ''
      }
    }
  },
  methods: {
    /**
     * 修改值
     * @param {*} val 控件值
     * @param {String} id 控件id
     */
    handleValueChange(val, id) {
      const component = this.formTemp.components.find((item) => item.id === id)
      if (component) {
        setValue(this.formData, component.fieldPath, val)
      }
    }
  }
}
</script>
```

## 配置渲染模板

https://www.c-tank.cn/atp

数据保存在`localStorage`中

# 组件列表

## 表单组件(form-render)

需要写在`<el-form>`中，不含操作按钮

| 属性        | 说明     | 类型     | 默认值     | 
| ----------- | -------- |-------- |-------- |
| formData | 表单数据  | object |  null |
|  layouts  |  控件布局   | array  |   []      |
|  components  |  控件集合   | array  |   []      |

| 方法        | 说明     | 参数    | 
| ----------- | -------- | -------- |
| change | 配合工具方法 `setValue` 修改表单数据  |  值, 控件ID  |
|  getValue  |  获取数据，目前用于 `多选` 和 `下拉` 控件通过接口获取选项   |  {id: 控件ID, field: 字段, relateValue: 关联字段值}, 回调   |


## 视图组件(view-render)

| 属性        | 说明     | 类型     | 默认值     | 
| ----------- | -------- |-------- |-------- |
| viewData | 表单数据  | object |  null |
|  layouts  |  控件布局   | array  |   []      |
|  components  |  控件集合   | array  |   []      |
|  searchForm  |  查询表单配置   | form-render  |  null     |

| 方法        | 说明     | 参数    | 
| ----------- | -------- | -------- |
| change | 配合工具方法 `setValue` 修改表单数据  |  值, 控件ID  |
|  getValue  |  获取数据，目前用于 `多选` 和 `下拉` 控件通过接口获取选项   |  {id: 控件ID, field: 字段, relateValue: 关联字段值}, 回调   |
| current-change | `current-page` 改变时触发  |  新当前页  |
| size-change | `page-size` 改变时触发  |  新每页条数  |

# 工具方法

| 方法        | 说明     | 参数     |
| ----------- | -------- | -------- |
| setValue | 根据字段路径修改字段值 | data, path, value | 
| cascader.areaDataCodeToText | 区域选择使用element-china-area-data | areaDataCodeToText = CodeToText |
| cascader.areaDataTextToCode | 区域选择使用element-china-area-data | areaDataTextToCode = TextToCode |

# 问题整理

# 更新日志