/**
 * 项目
 */

const defaultMain = [{
  id: '',
  name: '',   // 名字
  ip: '',     // ip
  user: '',   // 用户名
  pwd: ''     // 密码
}]

const state = {
  // 项目
  mian: defaultMain,

  activeProject: {},
  // tag 
  tag: []
}

const mutations = {
  add (state, data) {
    state.main.push(data)
  },
  update (state, data) {
    state.main.forEach((item, index) => {
      if (item.id === data.id) {
        state.main[index] = data
      }
    })
  },

}