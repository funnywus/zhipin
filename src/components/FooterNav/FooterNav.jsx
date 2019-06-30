import React, { Component } from 'react'
import { TabBar } from 'antd-mobile'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './footernav.less'

// 在非路由组件使用路由库的 api？
// withRouter()
class FooterNav extends Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render () {
    // 过滤掉 hide 为 true的数据
    const navList = this.props.navList.filter(item => !item.hide)
    const { pathname } = this.props.location // 请求的path
    return (
      <div>
        <TabBar>
          {
            navList.map(item => (
              <TabBar.Item key={item.path}
                    title={item.text}
                    icon={{uri: require(`./images/${item.icon}.png`)}}
                    selectedIcon={{uri: require(`./images/${item.icon}-selected.png`)}}
                    selected={pathname === item.path}
                    onPress={() => {
                      this.props.history.replace(item.path)
                    }}
              />
            ))
          }
        </TabBar>
      </div>
    )
  }
}

// 向外暴露 withRouter() 包装产生的组件
export default withRouter(FooterNav)
