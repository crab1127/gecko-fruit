/**
 * 项目
 */
import { getRandom } from '../../util/common'

let defaultMain = []
let defaultPublishLog = {}

localStorage['PROJECT'] && (defaultMain = JSON.parse(localStorage['PROJECT']))
localStorage['PUBLISH_LOG'] && (defaultPublishLog = JSON.parse(localStorage['PUBLISH_LOG']))

const state = {
  // 项目
  main: defaultMain,
  activeProject: {},
  // 上传纪录
  publishLog: defaultPublishLog,
  activePublishLog: []
}

const mutations = {
  PROJECT_ADD(state, data) {
    data.id = getRandom()
    state.main.push(data)
    localStorage['PROJECT'] = JSON.stringify(state.main)
  },
  PROJECT_UPDATE(state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main[index] = data
      }
    })
    localStorage['PROJECT'] = JSON.stringify(state.main)
  },
  PROJECT_DELETE(state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main.splice(index, 1)
      }
    })
  },
  SET_ACTIVE_PROJECT(state, data) {
    state.activeProject = {...data }
  },

  // 发布记录
  PUBLISH_LOG(state, data) {
    let active = state.publishLog[data.key]
    if (active) {
      active.unshift(data.value)
    } else {
      state.publishLog[data.key] = [data.value]
    }
    localStorage['PUBLISH_LOG'] = JSON.stringify(state.publishLog)
  },
  // 更新记录
  UPDATE_PUBLISH_LOG(state, data) {
    const active = state.publishLog[data.key]
    active.forEach((item, i) => {
      if (item.id === data.value.id) {
        active[i] = Object.assign({}, item, data.value)
      }
    })
    state.activePublishLog = state.publishLog[data.key]
    localStorage['PUBLISH_LOG'] = JSON.stringify(state.publishLog)
  },
  // 当前的发布记录
  ACTIVE_PUBLISH_LOG(state, key) {
    state.activePublishLog = Object.assign([], state.publishLog[key])
  }
}

export default {
  state,
  mutations
}