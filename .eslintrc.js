// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard',
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-unused-vars': 0,
    'key-spacing': ['error', { beforeColon: false }],
    'space-before-function-paren': ['error', 'never'],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 关闭禁止函数圆括号之前有一个空格
    'space-before-function-paren': 0,
    // 关闭禁用不必要的return await
    'no-return-await': 0,
    // Update
    // 取消强制限制驼峰法
    camelcase: 0,
    // 关闭callback必须有参数,关闭回调报错（callback(true／false)）
    'standard/no-callback-literal': 'off',
    // 关闭[]必须同一行
    'standard/computed-property-even-spacing': 'off',
    'operator-linebreak': 'off',
    // 允许-在字符串中出现了Control的字符
    'vue/no-parsing-error': 'off',
    // 不要在子组件内部改变 prop
    'vue/no-mutating-props': 0,
    // $emit不校验kebab-case,自定义事件名使用短横线方式
    'vue/custom-event-name-casing': 0,
    // prop类型不能被假定为构造函数
    'vue/require-prop-type-constructor': 0,
    // 不允许v-if和v-for一起用
    'vue/no-use-v-if-with-v-for': 0,
    // 检查每个prop的默认值对于给定类型是否有效
    'vue/require-valid-default-prop': 0,
    // 禁止直接使用 Object.prototypes 的内置属性
    'no-prototype-builtins': 0,
    // 强制计算属性有return
    'vue/return-in-computed-property': 0,
    // 在promise使用async
    'no-async-promise-executor': 0,
    // 禁用不必要的转义字符
    'no-useless-escape': 0,
    // 禁止使用未注册的组件
    'vue/no-unused-components': 0,
    // 未使用的scope等var
    'vue/no-unused-vars': 0,
  },
}
