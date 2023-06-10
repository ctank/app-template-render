import FormRender from './components/form/index.js'
import ViewRender from './components/view/index.js'
import Utils from './utils/utils.js'

const components = [FormRender, ViewRender]

// will install the plugin only once
const install = function (Vue) {
  Vue.config.globalProperties.__$app = Vue
  for (let i = 0; i < components.length; i++) {
    Vue.component(components[i].name, components[i])
  }
}

window.ATP_VERSION = '0.1.15'

// To allow use as module (npm/webpack/etc.) export component
export default { install, FormRender, ViewRender, Utils }

// /***
// 在es模块中， 能被按需引入的变量需要用这些方式导出：
// export const a = 1
// export function a(){}
// export { a, b }
// 而不能使用export default
// ***/

// It's possible to expose named exports when writing components that can
// also be used as directives, etc. - eg. import { RollupDemoDirective } from 'rollup-demo';
// export const RollupDemoDirective = component;
