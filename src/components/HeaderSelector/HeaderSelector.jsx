/*
* 选择用户头像的 UI 组件
* */

import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'

export default class HeaderSelector extends Component {
  constructor (props) {
    super(props)
    this.headerList = []
    for (let i = 1; i <= 20; i ++) {
      this.headerList.push({
        icon: require(`../../assets/images/头像${i}.png`),
        text: `头像${i}`
      })
    }
  }

  static propTypes = {
    setHeader: PropTypes.func.isRequired
  }

  state = {
    icon: null // 图片对象
  }

  // 点击头像的处理
  handleHeaderImg = ({icon, text}) => {
    // 更新当前组件状态
    this.setState({icon})
    // 调用函数更新父组件状态
    this.props.setHeader(text)
  }

  render () {
    const { icon } = this.state
    // 头部界面
    const listHeader = !icon ? '请选择头像' : (
      <div>
        已选择头像 : <img src={icon} style={{ verticalAlign: 'middle' }} alt='headerImg' />
      </div>
    )

    return (
      <div>
        <List renderHeader={() => listHeader}>
          <Grid data={this.headerList} columnNum={5} onClick={this.handleHeaderImg} />
        </List>
      </div>
    )
  }
}
