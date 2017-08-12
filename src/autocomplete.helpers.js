import axios from 'axios'
/**
 *
 * @param value search by
 * @param transform transform response
 * @param remoteMeta remote request data
 * @param source source of data
 * @param hooks hooks to evaluate
 * @return {Promise}
 */
export const getOptions = (value, transform, {url = '', param = '', otherParams = {}, method = 'GET'} = {}, source = [], hooks = {}) => {
  // execute before url hock if available
  if (hooks.beforeSearch) {
    hooks.beforeSearch(url, value)
  }
  if (url) {
    const passedData = {
      ...otherParams,
      [param]: value
    }
    let params, data
    if (method.toUpperCase() === 'GET') {
      params = { ...passedData }
    } else if (method.toUpperCase() === 'POST') {
      data = { ...passedData }
    }
    return axios({
      url,
      method,
      params,
      data
    })
  }
}
