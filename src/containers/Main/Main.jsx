/*
* 主界面的路由组件
* */
import React, { Component } from 'react'
import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { connect } from 'react-redux'
import Cookie from 'js-cookie' // 操作前端的cookie: set/get/remove
import { NavBar } from 'antd-mobile'

import LaobanInfo from '../LaobanInfo/LaobanInfo'
import DashenInfo from '../DashenInfo/DashenInfo'
import Dashen from '../Dashen/Dashen'
import Laoban from '../Laoban/Laoban'
import Message from '../Message/Message'
import Personal from '../Personal/Personal'
import NotFount from '../../components/NotFound/NotFound'
import FooterNav from '../../components/FooterNav/FooterNav'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actions'

class Main extends Component {

  // 给组件对象添加属性
  navList = [
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: ' 大神列表',
      icon: 'dashen',
      text: ' 大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: ' 老板列表',
      icon: 'laoban',
      text: ' 老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: ' 消息列表',
      icon: 'message',
      text: ' 消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: ' 用户中心',
      icon: 'personal',
      text: ' 个人',
    }
  ]

  componentDidMount () {
    // 登录过(cookie中有userid), 但没有登录(redux管理的user中没有_id), 发请求获取对应的 user
    const userid = Cookie.get('userid')
    const { _id } = this.props.user
    if (userid && !_id) {
      // 发送异步请求, 获取 user
      // console.log('发送异步请求, 获取 user')
      this.props.getUser()
    }
  }

  render () {
    // 读取 cookie 中的 userid
    const userid = Cookie.get('userid')
    // 如果没有, 自动重定向到登录界面
    if (!userid) {
      return <Redirect to='/login' />
    }
    // 如果有, 读取 redux 中的 user状态
    const { user } = this.props
    debugger
    // 如果 user 没有_id, 返回 null(不做任何显示)
    if (!user._id) {
      return null
    } else {
      // 如果 user 有 _id, 显示对应的界面
      // 如果请求根路径, 根据 user 的 type 和 headerImg 来计算出一个重定向的路由路径, 并自动重定向
      let path = this.props.location.pathname
      if (path === '/') {
        path = getRedirectTo(user.type, user.headerImg)
        return <Redirect to={path} />
      }
    }

    const { navList } = this
    const path = this.props.location.pathname
    const currentNav = navList.find(item => item.path === path)

    if (currentNav) {
      // 决定哪个路由需要隐藏
      if (user.type === 'laoban') {
        // 隐藏数组的第2个
        navList[1].hide = true
      } else {
        // 隐藏数组的第1个
        navList[0].hide = true
      }
    }

    return (
      <div>
        { currentNav ? <NavBar>{ currentNav.title }</NavBar> : null }
        <Switch>
          {
            navList.map(item => (
              <Route key={item.title} path={item.path} component={item.component} />
            ))
          }
          <Route path='/laobaninfo' component={LaobanInfo} />
          <Route path='/dasheninfo' component={DashenInfo} />
          <Route component={NotFount} />
        </Switch>
        { currentNav ? <FooterNav navList={navList} /> : null }
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { getUser }
)(Main)

/*
* 1. 实现自动登录:
*   1.1. 登录过(cookie中有userid), 但没有登录(redux管理的user中没有_id), 发请求获取对应的 user,
* 2. render()
*   1.1. 如果 cookie 中没有 userid, 直接重定向到 login
*   1.2. 判断 redux 管理的 user中是否有 _id, 如果没有, 暂时不做任何显示
*   1.3. 如果有, 说明当前已经登录, 显示对应的界面
*   1.4. 如果请求跟路径: 根据 user 的 type 和 headerImg 来计算出一个重定向的路由路径, 并自动重定向
* */
