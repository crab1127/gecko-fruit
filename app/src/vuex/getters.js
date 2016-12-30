export const userSet = state => state.set.main
export const assets = state => state.asset.main
export const project = state => state.project.main
export const activeProject = state => state.project.activeProject
export const publishLog = state => state.project.publishLog
export const activeLog = state => state.project.activePublishLog
export const sitLog = state => {
  if (state.project.activePublishLog && state.project.activePublishLog.length) {
    return state.project.activePublishLog.filter(item => item.environment === 'sit')
  } else {
    return []
  }
}
export const secLog = state => {
  if (state.project.activePublishLog && state.project.activePublishLog.length) {
    return state.project.activePublishLog.filter(item => item.environment === 'sec')
  } else {
    return []
  }
}