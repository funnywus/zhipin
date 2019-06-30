/*
* 包含 n 个action creator
* 同步 action
* 异步 action
* */

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'

import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser
} from '../api'

// 授权成功的同步 action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
// 错误信息提示的同步 action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
// 接受用户的同步 action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
// 重置用户的同步 action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })


// 注册异步 action
export const register = (user) => {
  const { username, password, confirmPwd, type } = user
  // 密码的前台检查, 如果不通过, 返回一个errorMsg的同步 action
  if (!username) {
    return errorMsg('用户名必须指定!')
  } else if (!password) {
    return errorMsg('密码必须指定!')
  } else if (!confirmPwd) {
    return errorMsg('确认密码必须指定!')
  } else if (password !== confirmPwd) {
    return errorMsg('两次密码要一致!')
  }

  // 表单数据合法， 返回一个发送ajax请求的异步action的函数
  return async dispatch => {
    // 发送注册的异步请求
    const result = await reqRegister({ username, password, type }) // { code: 0/1, user, msg: '' }
    if (result.code === 0) { // 成功
      // 授权成功的同步 action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 错误信息提示的同步 action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录异步 action
export const login = (user) => {
  const { username, password } = user
  // 密码的前台检查, 如果不通过, 返回一个errorMsg的同步 action
  if (!username) {
    return errorMsg('用户名必须指定!')
  } else if (!password) {
    return errorMsg('密码必须指定!')
  }

  // 表单数据合法， 返回一个发送ajax请求的异步action的函数
  return async dispatch => {
    const result = await reqLogin({ username, password })
    // 发送注册的异步请求
    if (result.code === 0) { // 成功
      // 授权成功的同步 action
      dispatch(authSuccess(result.data))
    } else { // 失败
      // 错误信息提示的同步 action
      dispatch(errorMsg(result.msg))
    }
  }
}

// 更新异步 action
export const updateUser = (user) => {
  return async dispatch => {
    const result = await reqUpdateUser(user)
    if (result.code === 0) { // 更新成功: data
      dispatch(receiveUser(result.data))
    } else { // 更新失败: msg
      dispatch(resetUser(result.msg))
    }
  }
}

// 异步获取用户信息
export const getUser = () => {
  return async dispatch => {
    const result = await reqUser()
    if (result.code === 0) { // 获取成功: data
      dispatch(receiveUser(result.data))
    } else { // 获取失败
      dispatch(resetUser(result.msg))
    }
  }
}
