import fetch from '@/utils/fetch'

export default {
  /**
   * 获取表单模板
   * @param {*} data
   * @returns
   */
  getFormTemplate(data) {
    return fetch({
      url: '/form/getFormTemp',
      method: 'post',
      data
    })
  },

  getViewTemplate(data) {
    return fetch({
      url: '/view/getViewTemp',
      method: 'post',
      data
    })
  }
}
