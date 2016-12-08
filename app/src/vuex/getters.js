export const userSet = state => state.set.main
export const assets = state => state.asset.main
export const project = state => state.project.main
export const activeProject = state => state.project.activeProject
export const activeLog = state => state.project.activePublishLog
export const sitLog = state => state.project.activePublishLog.filter(item => item.environment === 'sit')
export const secLog = state => state.project.activePublishLog.filter(item => item.environment === 'sec')

