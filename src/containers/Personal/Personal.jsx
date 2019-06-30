/*
* 个人中心界面的路由容器组件
* */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Result,
  List,
  WhiteSpace,
  Button,
  Modal
} from 'antd-mobile'
import Cookie from 'js-cookie'

import { resetUser } from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief
const alert = Modal.alert

class Personal extends Component {

  logout = (e) => {
    alert('退出登录', '你确定要退出登录吗?', [
      {
        text: '取消',
        onPress: () => console.log('cancel')
      },
      {
        text: '确定',
        onPress: () => {
          // 清除 cookie 中的 userid
          Cookie.remove('userid')
          // 清除 redux 管理的 user
          this.props.resetUser()
        }
        },
    ])
    e.preventDefault()
  }

  render () {
    const { user } = this.props

    return (
      <div>
        <Result img={<img src={ require(`../../assets/images/${user.headerImg}.png`)} style={{width: 50}} alt="header"/>}
        title={ user.username }
        message={ user.company ? user.company : null }/>
        <List renderHeader={ () => '相关信息' }>
          <Item multipleLine>
            <Brief>职位: { user.post }</Brief>
            <Brief>简介: { user.info }</Brief>
            { user.salary ? <Brief>薪资: { user.salary }</Brief> : null }

          </Item>
        </List>
        <WhiteSpace />
        <List>
          <Button type='warning' onClick={ (e) => this.logout(e) }>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { resetUser }
)(Personal)
