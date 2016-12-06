/**
 * 全局设置
 */
// const fs    =   require('fs')
// const path  =   require('path')

// const setFilePath = path.join(__dirname, '../..', '/data/set.json')

let defaultMain = {
  repository: '',
  git_name: '',
  git_password: ''
}

localStorage['USER_SET'] && (defaultMain = JSON.parse(localStorage['USER_SET']))

// fs.readFile(setFilePath, (err, data) => {
//   console.log(1234, __dirname)
//   if (err) return;
//   defaultMain = JSON.parse(data.toString())
//   console.log(1234, data.toString())
// })

const state = {
  main: defaultMain
}

const mutations = {
  SET_UPDATE (state, data) {
    state.main = data
    // fs.writeFile(setFilePath, JSON.stringify(data))
    localStorage['USER_SET'] = JSON.stringify(data)
  }
}

export default {
  state,
  mutations
}