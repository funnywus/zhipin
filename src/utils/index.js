/**
 * 包含 n 个工具函数的模块
 */

/**
 * 用户主界面路由
 *  dashen: /dashen
 *  boss: /boss
 * 用户信息完界面路由
 *  dashen: /dasheninfo
 *  boss: // bossinfo
 *  判断是否已经完善信息? user.header 是否有值
 *  判断用户类型: user.type
 */

/*
* 返回对应的路由路径
* type: 用户类型
* headerImg: 用户头像名称
* */
export function getRedirectTo (type, headerImg) {
  let path = ''
  // 根据 type 得到 path
  path += type==='laoban' ? '/laoban' : '/dashen'

  // headerImg
  if (!headerImg) { // headerImg 没有值, 返回的是完善信息的path
    path += 'info'
  }

  return path
}
