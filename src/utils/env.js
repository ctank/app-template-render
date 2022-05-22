const env = process.env

const isDev = (val) => {
  // return process.env.APP_ENV === 'development' ? env[val + '_LOCAL'] : env[val]
  return env[val]
}

// BASE URL
export const APP_BASE_PATH = isDev('APP_BASE_PATH')
export const APP_BASE_API = isDev('APP_BASE_API')
