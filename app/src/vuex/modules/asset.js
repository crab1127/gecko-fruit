/**
 * 主机
 */

let defaultMain = []

localStorage['ASSET'] && (defaultMain = JSON.parse(localStorage['ASSET']))

const state = {
  main: defaultMain
}

const mutations = {
  ASSETS_ADD (state, data) {
    data.id = +new Date()
    state.main.push(data)
    localStorage['ASSET'] = JSON.stringify(state.main)
  },
  ASSETS_UPDATE (state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main[index] = data
      }
    })
    localStorage['ASSET'] = JSON.stringify(state.main)
  },
  ASSETS_DELETE (state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main.splice(index, 1)
      }
    })
  }
}

export default {
  state,
  mutations
}