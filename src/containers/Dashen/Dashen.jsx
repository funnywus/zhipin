/*
* 大神主界面的路由容器组件
* */
import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashen extends Component {
  render () {
    return (
      <div>
        <h1>Dashen component</h1>
      </div>
    )
  }
}

export default connect(
  state => ({}),
  {}
)(Dashen)
