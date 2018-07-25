import jsonp from 'jsonp'

const _setAjax = (ajaxUrl) => {
  return new Promise((resolve, reject) => {
    jsonp(ajaxUrl, null, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

export default _setAjax
