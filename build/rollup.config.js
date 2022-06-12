import baseConfig from './rollup.config.base'
import path from 'path'

module.exports = {
  input: 'src/index.js',
  external: ['vue', 'element-plus'],
  output: [
    {
      dir: 'dist', 
      entryFileNames: 'appTempRender.js',
      chunkFileNames: 'es/[name]-[hash].js',
      format: 'es',
      globals: {
        vue: 'Vue'
      }
    }
  ],
  ...baseConfig({
    commonjs: {
      include: 'dist/**'
    },
    postcss: true
  })
}
