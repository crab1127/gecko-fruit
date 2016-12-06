/**
 * 项目
 */

let defaultMain = []

localStorage['PROJECT'] && (defaultMain = JSON.parse(localStorage['PROJECT']))

const state = {
  // 项目
  main: defaultMain,

  activeProject: {},
}

const mutations = {
  PROJECT_ADD (state, data) {
    data.id = +new Date()
    state.main.push(data)
    localStorage['PROJECT'] = JSON.stringify(state.main)
  },
  PROJECT_UPDATE (state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main[index] = data
      }
    })
    localStorage['PROJECT'] = JSON.stringify(state.main)
  },
  PROJECT_DELETE (state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main.splice(index, 1)
      }
    })
  },
  SET_ACTIVE_PROJECT (state, data) {
    state.activeProject = {...data}
  }

}

export default {
  state,
  mutations
}