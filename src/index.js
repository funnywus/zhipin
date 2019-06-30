/*
* 入口js
* */
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'

// 引入路由组件
import Login from './containers/Login/Login'
import Register from './containers/Register/Register'
import Main from './containers/Main/Main'

// 引入样式文件
import './assets/css/index.less'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <Route component={Main} />
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'))
