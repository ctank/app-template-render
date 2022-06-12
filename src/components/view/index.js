import ViewRender from './render.vue'

ViewRender.install = function (Vue) {
  Vue.component(ViewRender.name, ViewRender)
}

export default ViewRender