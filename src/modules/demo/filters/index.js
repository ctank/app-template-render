import createFilters from '@/filters/createFilters'

const demoFilter = function (val) {
  return val + '_demo'
}
export default createFilters('demo', {
  demoFilter
})
