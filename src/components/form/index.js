import FormRender from './render.vue'

FormRender.install = function (Vue) {
  Vue.component(FormRender.name, FormRender)
}

export default FormRender

// export default (vue) => (vue.component(hello.name, hello));
