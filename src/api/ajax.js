/*
*能发送 ajax 请求的函数模块
* 函数的返回值是 promise对象
* */
import axios from 'axios'

export default function ajax (url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise

    if (type === 'GET') { // 发送 GET 请求
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr) {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url += '?' + dataStr
      }

      promise = axios.get(url)
    } else { // 发送 POST 请求
      promise = axios.post(url, data)
    }

    promise
      .then(response => {
      resolve(response.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}
