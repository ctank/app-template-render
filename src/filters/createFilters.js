import MainFilters from './index'

const createFilters = (modules, filters) => {
  const newfilters = {
    ...MainFilters
  }

  if (modules) {
    newfilters[modules] = filters
  }

  return newfilters
}

export default createFilters
