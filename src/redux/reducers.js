/*
* 包含 n 个reducer函数, 根据老的 state和action, 返回一个新的 state
* */
import { combineReducers } from 'redux'

import { getRedirectTo } from '../utils'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER
} from './action-types'

const initUser = {
  username: '', // 用户名
  type: '', // 用户类型 dashen/laoban
  msg: '', // 错误提示信息
}

// 产生 user 状态的 reducer
function user (state = initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS: // data 是 user
      const redirectTo = getRedirectTo(action.data.type, action.data.headerImg)
      return {...state, ...action.data, redirectTo }
    case ERROR_MSG: // data 是 msg
      return { ...state, msg: action.data}
    case RECEIVE_USER: // data 是 user
      return action.data
    case RESET_USER: // data 是 msg
      return { ...initUser, msg: action.data }
    default:
      return state
  }
}

export default combineReducers({
  user
})

// 向外暴露的状态的结构: { user: {} }
