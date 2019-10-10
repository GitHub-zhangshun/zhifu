const getters = {
  // user
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  dictionaryList: state => state.user.dictionaryList, // 字典集合
  menuList: state => state.user.menuList, // 菜单集合
  routes: state => state.user.routes, // 动态生成路由表
  userInfos: state => state.user.userInfos, // 用户信息
  jobInfos: state => state.user.jobInfos, // 岗位信息
  actions: state => state.user.actions, // 运行时功能
  resetTablePage: state => state.user.resetTablePage, // 重置分页状态
  disabledSearch: state => state.user.disabledSearch, // 禁用搜索框
  // sys
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  errorLogs: state => state.errorLog.logs,
}
export default getters
