/*
* 登录的路由组件
* */
import React, { Component } from 'react'
import {
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'

import Logo from '../../components/Logo/Logo'
import { login } from '../../redux/actions'
import {Redirect} from "react-router-dom"

class Login extends Component {

  state = {
    username: '', // 用户名
    password: '', // 密码
    redirectTo: '' // 需要自动重定向的路由路径
  }

  login = () => {
    // console.log(this.state)
    this.props.login(this.state)
  }

  // 处理输入的数据的改变, 更新到对应的状态
  handleChange = (name, val) => {
    // 更新数据
    this.setState({
      [name]: val // 属性名不是 name, 是 name 的值
    })
  }

  // 跳转到登录界面
  toRegister = () => {
    this.props.user.msg = ''
    this.props.history.replace('/register')
  }

  render () {
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
            <Button type="primary" onClick={this.login}>登录</Button>
            <WhiteSpace />
            <Button onClick={this.toRegister}>还没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { login }
)(Login)
