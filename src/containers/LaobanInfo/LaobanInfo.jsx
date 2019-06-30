/*
* boss信息完善路由容器组件
* */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import { Redirect } from 'react-router-dom'

import { updateUser } from '../../redux/actions'
import HanderSelector from '../../components/HeaderSelector/HeaderSelector'

class LaobanInfo extends Component {
  state = {
    headerImg: '', // 头像名称
    post: '', // 招聘职位
    company: '', // 公司名称
    salary: '', // 职位薪资
    info: '', // 职位要求
  }

  // 更新 headerImg 状态
  setHeader = (headerImg) => {
    this.setState({
      headerImg
    })
  }

  // 处理输入数据的改变, 更新到对应的状态
  handleChange = (name, val) => {
    // 更新状态
    this.setState({
      [name]: val
    })
  }

  save = () => {
    this.props.updateUser(this.state)
  }

  render () {
    // 如果信息已经完善, 自动重定向到对应主界面
    const { headerImg, type } = this.props.user

    if (headerImg) { // 说明信息已经完善
      const path = type === 'dashen' ? '/dashen' : '/laoban'
      return <Redirect to={path} />
    }

    return (
      <div>
        <NavBar>boss信息完善</NavBar>
        <HanderSelector setHeader={ this.setHeader } />
        <InputItem placeholder="请输入招聘职位" onChange={val => this.handleChange('post', val)}>招聘职位: </InputItem>
        <InputItem placeholder="请输入公司名称" onChange={val => this.handleChange('company', val)}>公司名称: </InputItem>
        <InputItem placeholder="请输入职位薪资" onChange={val => this.handleChange('salary', val)}>职位薪资: </InputItem>
        <TextareaItem placeholder="请输入职位要求" rows={3} title="职位要求" onChange={val => this.handleChange('info', val)} />
        <Button type="primary" onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
      </div>
    )
  }
}

export default connect(
  state => ({ user: state.user }),
  { updateUser }
)(LaobanInfo)
