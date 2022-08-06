import resolvePlugin from '@rollup/plugin-node-resolve'
import vuePlugin from 'rollup-plugin-vue'
import babelPlugin from '@rollup/plugin-babel'
import commonjsPlugin from '@rollup/plugin-commonjs'
import servePlugin from 'rollup-plugin-serve'
import livereloadPlugin from 'rollup-plugin-livereload'
import postcssPlugin from 'rollup-plugin-postcss'
import imagePlugin from '@rollup/plugin-image';
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import clear from 'rollup-plugin-clear'
import autoprefixer from 'autoprefixer'
import path from 'path'

const NODE_ENV = process.env.NODE_ENV || 'development'
const isDev = NODE_ENV === 'development'

export default (config = {}) => {
  const {
    eslint,
    vue = {},
    // alias = {},
    // replace = {},
    serve = {},
    livereload = {},
    commonjs = {},
    lessOption = {},
    postcss,
    terserOption = {}
  } = config

  let plugins = [
    resolvePlugin(),
    vuePlugin({
      css: false,
      compileTemplate: true,
      style: {
        postcssPlugins: [autoprefixer()]
      },
      ...vue
    }),
    commonjsPlugin({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      // include: 'node_modules/**',
      ...commonjs
    }),
    imagePlugin(),
    // ...
    clear({
      // required, point out which directories should be clear.
      targets: ['dist'],
      // optional, whether clear the directores when rollup recompile on --watch mode.
      watch: true // default: false
    })
  ]

  if (eslint) {
    plugins.push(eslintPlugin(eslint))
  }
  plugins.push(
    babelPlugin({
      babelHelpers: 'runtime',
      exclude: '**/node_modules/**'
    })
  )

  if (isDev) {
    plugins = plugins.concat([
      servePlugin(
        Object.assign(
          {
            contentBase: './', // 启动文件夹;
            host: '127.0.0.1', // 设置服务器;
            port: 8080
          },
          serve
        )
      ),
      livereloadPlugin(
        {
          watch: 'src/' // 监听文件夹;
        },
        livereload
      )
    ])
  } else {
    plugins = plugins.concat([terser(terserOption), filesize()])
  }

  if (postcss) {
    plugins.push(
      postcssPlugin({
        minimize: {},
        extract: path.resolve('./dist/appTempRender.css'),
        ...postcss
      })
    )
  }

  return {
    plugins
  }
}
