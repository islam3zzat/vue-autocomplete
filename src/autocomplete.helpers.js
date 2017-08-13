import axios from 'axios'

/**
 * gets autocomplete options
 * @param value
 * @param url
 * @param param
 * @param otherParams
 * @param method
 * @param source
 * @param filterMethod
 * @param hooks
 * @return {*}
 */
export const getOptions = (
  {
    value,
    apiOptions: {url = '', param = '', otherParams = {}, method = 'GET'} = {},
    sourceOptions: {source, filterMethod} = {},
    hooks = {}
  }
) => {
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
  } else if (source) {
    return Promise.resolve(source.filter(item => {
      if (filterMethod) {
        return filterMethod(item)
      }
      return item.toLowerCase().indexOf(value.toLowerCase()) >= 0
    }))
  }
}
/**
 * evaluateAfterRespnse hooks
 * @param res
 * @param afterSearch
 * @return Promise
 */
export const evaluateResponse = (res, afterSearch) => {
  if (afterSearch && res) {
    const mutatedResponse = afterSearch(res)
    return mutatedResponse || res
  }
  return res
}

/**
 * transfor respnse
 * @param res
 * @param transform
 * @return Promise
 */
export const transformResponse = (res, transform) => {
  let options
  if (typeof transform === 'string') {
    options = res[transform]
  } else if (typeof transform === 'function') {
    options = transform(res)
  } else {
    options = res
  }
  return options
}
