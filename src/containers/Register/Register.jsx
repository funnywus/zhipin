/*
* 注册的路由组件
* */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { register } from '../../redux/actions'
import Logo from '../../components/Logo/Logo'

const ListItem = List.Item

class Register extends Component {
  state = {
    username: '', // 用户名
    password: '', // 密码
    confirmPwd: '', // 确认密码
    type: 'laoban', // 用户类型名称 boss / 大神
    redirectTo: '', // 需要自动重定向的路由路径
  }

  // 点击注册调用
  register = () => {
    // console.log(this.state)
    this.props.register(this.state)
  }

  // 处理输入数据的改变: 更新对应的状态
  handleChange = (name, val) => {
    // 更新数据
    this.setState({
      [name]: val // 属性名不是 name, 而是 name 变量的值
    })
  }

  // 跳转到登录界面
  toLogin = () => {
    this.props.user.msg = ''
    this.props.history.replace('/login')
  }

  render () {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    // 如果 redirectTo 有值, 就需要重定向对应的路由
    if (redirectTo) {
      return <Redirect to={redirectTo} />
    }

    return (
      <div>
        <NavBar>Boss&nbsp;直&nbsp;聘</NavBar>
        <Logo></Logo>
        { msg ? <div className='error-msg'>{ msg }</div> : null }
        <WingBlank>
          <List>
            <WhiteSpace />
            <InputItem placeholder="请输入用户名" onChange={val => this.handleChange('username', val)}>用户名 :</InputItem>
            <WhiteSpace />
            <InputItem type="password" placeholder="请输入密码" onChange={val => this.handleChange('password', val)}>密&nbsp;&nbsp;&nbsp;码 :</InputItem>
            <WhiteSpace />
            <InputItem type="password" placeholder="请输入确认密码" onChange={val => this.handleChange('confirmPwd', val)}>确认密码 :</InputItem>
            <WhiteSpace />
            <ListItem>
              <span>用户类型 :</span>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'dashen'} onChange={() => this.handleChange('type', 'dashen')}>大神</Radio>&nbsp;&nbsp;&nbsp;
              <Radio checked={type === 'laoban'} onChange={() => this.handleChange('type', 'laoban')}>老板</Radio>
            </ListItem>
            <WhiteSpace />
            <Button type="primary" onClick={this.register}>注册</Button>
            <WhiteSpace />
            <Button onClick={this.toLogin}>已有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { register }
)(Register)
