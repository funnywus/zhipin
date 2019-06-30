/*
* 消息界面的路由容器
* */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Message extends Component {
  render () {
    return (
      <div>
        <h1>Message component</h1>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Message)
