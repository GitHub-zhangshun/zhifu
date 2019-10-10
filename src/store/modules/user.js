import {
  request
} from '@/utils/request'
import {
  getToken,
  setToken,
  removeToken
} from '@/utils/auth'
import router, {
  resetRouter, constantRoutes
} from '@/router'
import md5 from 'blueimp-md5'
import {
  Message
} from 'element-ui'


const state = {
  user: '',
  status: '',
  token: getToken(),
  routes: [],
  menuList: [],
  userInfos: [],
  jobInfos: [],
  actions: [],
  dictionaryList: [],
  resetTablePage: false,
  disabledSearch: false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    // cookie 存入
    setToken(token)
  },
  SET_DIC: (state, dictionaryList) => {
    state.dictionaryList = dictionaryList
  },
  SET_MENU: (state, menuList) => {
    state.menuList = menuList
  },
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  SET_USER_INFOS: (state, userInfos) => {
    state.userInfos = userInfos
  },
  SET_JOB_INFOS: (state, jobInfos) => {
    state.jobInfos = jobInfos
  },
  SET_ACTIONS: (state, actions) => {
    state.actions = actions
  },
  SET_TABLE_PAGE_RESET: (state, status) => {
    state.resetTablePage = status
  },
  SET_DISABLED_SEARCH: (state, disabledSearch) => {
    state.disabledSearch = disabledSearch
  }
}

const actions = {
  // 用户名登录
  async LoginByUsername({
    dispatch,
    commit
  }, userInfo) {
    // 去除空格用户名
    return new Promise((resolve, reject) => {
      return request({
        url: '/bsm/User/Login',
        method: 'post',
        data: {
          loginName: userInfo.username,
          password: md5(md5(md5(userInfo.password)))
        }
      }).then(data => {
        if (data.result.menuList.length === 0) {
          dispatch('FedLogOut')
          Message.error('无权限用户')
          reject()
        } else {
          // 获取字典信息
          request({
            url: '/dictionary/Dictionary/GetDetailListAll'
          }).then(res => {
            commit('SET_TOKEN', data.result.token)
            commit('SET_USER_INFOS', data.result.userInfo)
            commit('SET_JOB_INFOS', data.result.jobList)
            commit('SET_ACTIONS', data.result.funcList)
            commit('SET_DIC', res.result)
            dispatch('InitSiteData', data.result)
            // resetRouter()
            resolve()
          }).catch(() => {
            reject()
          })
        }
      }).catch(() => {
        reject()
      })
    })
  },
  // 前端 登出
  FedLogOut({
    commit
  }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },
  // 刷新站点数据
  RefreshSiteData({
    commit,
    dispatch
  }) {
    return new Promise((resolve, reject) => {
      return request({
        url: '/bsm/User/Current'
      }).then(data => {
        if (data.result.menuList.length === 0) {
          dispatch('FedLogOut')
          Message.error('无权限用户')
          reject()
        } else {
          // 获取字典信息
          request({
            url: '/dictionary/Dictionary/GetDetailListAll'
          }).then(res => {
            commit('SET_USER_INFOS', data.result.userInfo)
            commit('SET_JOB_INFOS', data.result.jobList)
            commit('SET_ACTIONS', data.result.funcList)
            commit('SET_DIC', res.result)
            dispatch('InitSiteData', data.result)
            // resetRouter()
            resolve()
          }).catch((err) => {
            reject(err)
          })
        }
      }).catch(() => {
        reject()
      })
    })
  },
  // init 初始化站点  数据 包括不限于==> 数据字典、菜单、功能集合
  InitSiteData({
    commit
  }, initData) {
    // 递归菜单 && 匹配菜单对应的路由
    let treeMenu = toTree(initData)
    commit('SET_MENU', treeMenu)

    // 生成路由器
    let routes = generateRouter(initData.funcList)
    routes.push({ path: '*', redirect: '/404', hidden: true })
    // 将首页加入到路由里面 侧边栏才能展示
    routes = constantRoutes.concat(routes)
    router.addRoutes(routes)
    commit('SET_ROUTES', routes)
  },
  // 充值分页状态
  ResetTablePage({
    commit
  }, status) {
    commit('SET_TABLE_PAGE_RESET', status)
  },
  // 禁用搜索框
  DisabledSearch({ commit }, disabledSearch) {
    commit('SET_DISABLED_SEARCH', disabledSearch)
  }
}

/**
 * 根据运行时功能生成路由器
 * routeKey === view
 */
function generateRouter(actions) {
  // 过滤出实际指向页面的路由
  const hasViewActions = actions.filter(item => {
    return item.routeKey === 'view' && item.isSelf
  })
  // 构造路由表 component
  let childrenRouters = []
  hasViewActions.forEach(item => {
    let routerJson = JSON.parse(item.routeConfig)
    const path = routerJson.component
    // 匹配运行时功能
    const menuActions = actions.filter(i => i.menuId === item.menuId) // 此菜单的所有运行时功能
    const topActions = menuActions.filter(i => !i.isRight && i.isShow).sort((a, b) => a.sort - b.sort) // 顶部运行时功能
    const rightActions = menuActions.filter(i => i.isRight && i.isShow).sort((a, b) => a.sort - b.sort) // 右侧运行时功能
    // 隐藏运行时功能
    const hiddenActions = {}
    menuActions.filter(i => !i.isShow).forEach(item => {
      hiddenActions[item.businessKey] = item.apiKey
    })
    childrenRouters.push({
      name: routerJson.name,
      path: routerJson.path,
      component: () => import(`@/views${path}`), // TODO: 因为import不能传入变量 所以后台component配置的时候只配置 views下的路径  import('@/views') webpack会编译 views下的所有模板
      meta: Object.assign(routerJson.meta, {
        actions: {
          menuActions,
          topActions,
          rightActions,
          hiddenActions
        }
      })
    })
  })
  // 所有动态路由挂在到layout下
  const routers = [{
    path: '',
    component: () => import('@/layout'),
    redirect: 'home',
    children: [
      ...childrenRouters
    ]
  }]
  return routers
}

/**
 * 递归获取树形路由 && 附加菜单自身路由
 *
 * @param {*} map
 * @returns
 */
function toTree(initData) {
  // 过去运行时功能表 取出菜单自身路由集合  isSelf = true
  const actionList = initData.funcList.filter(item => {
    return item.isSelf
  })
  let menuList = initData.menuList.sort((a, b) => a.sort - b.sort)
  // 删除 所有 children,以防止多次调用
  menuList.forEach(function (item) {
    delete item.children
  })
  // 挂在路由地址到对应的菜单
  menuList.map(item => {
    const action = actionList.find(i => i.menuId === item.id)
    if (action && action.routeConfig) {
      item.path = JSON.parse(action.routeConfig).path
    }
  })

  // 将数据存储为 以 id 为 KEY 的 map 索引数据列
  var map = {}
  menuList.forEach(function (item) {
    map[item.id] = item
  })
  var val = []
  menuList.forEach(function (item) {
    // 以当前遍历项，的pid,去map 对象中找到索引的id
    var parent = map[item.parentId]
    // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
    if (parent) {
      (parent.children || (parent.children = [])).push(item)
    } else {
      // 如果PID不为"0"或者null就弃用
      if (item.parentId === '0' || item.parentId === null) {
        //如果没有在map 中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
        val.push(item)
      }
    }
  })
  return val
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
