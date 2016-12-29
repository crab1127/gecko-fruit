<template>
  <main>
    <el-tabs :active-name="environment" style="width: 100%;">
      <el-tab-pane label="测试环境" name="sit">
        <el-button type="primary" @click="(dialogVisible = true, environment= 'sit')">
          发布到测试环境
        </el-button>
        <el-table :data="sitLogFilter">
          <el-table-column
            inline-template    
            label="状态"
            width="80"
          >
            <span style="font-size:20px">😓</span>
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本">
          </el-table-column>
          <el-table-column
            prop="message"
            label="上传说明">
          </el-table-column>
          <el-table-column
            inline-template
            label="时间"
            width="180">
            <div>{{ row.createTime | dateFormat('yyyy-MM-dd hh:mm') }}</div>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :total="sitLog.length"
          :current-page="sitLogPages.current"
          @current-change="onSitPageChange">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="正式环境" name="sec">
        <el-button type="primary"  @click="(dialogVisible = true, environment= 'sec')">
          发布到正式环境
        </el-button>
        <el-table :data="secLogFilter">
          <el-table-column
            inline-template    
            label="状态"
            width="80"
          >
            <span style="font-size:20px">😓</span>
          </el-table-column>
          <el-table-column
            prop="version"
            label="版本">
          </el-table-column>
          <el-table-column
            prop="message"
            label="上传说明">
          </el-table-column>
          <el-table-column
            inline-template
            label="时间"
            width="180">
            <div>{{ row.createTime | dateFormat('yyyy-MM-dd hh:mm') }}</div>
          </el-table-column>
          <el-table-column
            inline-template
            :context="_self"
            fixed="right"
            label="操作"
            width="100">
            <span>
              <el-button type="text" size="small">回滚</el-button>
            </span>
          </el-table-column>
        </el-table>
        <el-pagination
          small
          :total="secLog.length"
          :current-page="secLogPages.current"
          @current-change="onSecPageChange">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
    <el-dialog title="发布说明" v-model="dialogVisible">
      <el-form label-position="top" :model="form" class="demo-form-stacked">
        <el-form-item label="发布版本">
          <el-input v-model="form.version" placeholder="v1.0.0"></el-input>
        </el-form-item>
        <el-form-item label="发布说明">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="form.message">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button @click="cmdVisible = true">详情</el-button>
        <el-button type="primary" @click="onPublish" :loading="loading">确定发布</el-button>
      </span>
    </el-dialog>
    <cmd v-model="cmdVisible" :content="cmdContent" />
  </main>
</template>

<script>
  import path from 'path'
  import {
    mapGetters
  } from 'vuex'
  import {
    ipcRenderer
  } from 'electron'
  import {
    connect
  } from '../util/ftp'
  import {
    getRandom,
    dateFormat,
    getFileAndDir
  } from '../util/common'
  import Cmd from '../components/cmd'

  let appPath
  ipcRenderer.send('dirname')
  ipcRenderer.on('dirname', (event, data) => {
    appPath = data
  })

  export default {
    name: 'detail',
    computed: {
      ...mapGetters({
        activeProject: 'activeProject',
        log: 'activeLog',
        assets: 'assets',
        sitLog: 'sitLog',
        secLog: 'secLog'
      }),
      projectName() {
        let git = this.activeProject.git
        return git.slice(git.lastIndexOf('/') + 1, git.lastIndexOf('.'))
      },
      sitLogFilter() {
        return this.sitLog.slice((this.sitLogPages.current - 1) * this.sitLogPages.size, this.sitLogPages.current * this.sitLogPages.size)
      },
      secLogFilter() {
        return this.secLog.slice((this.secLogPages.current - 1) * this.secLogPages.size, this.secLogPages.current * this.secLogPages.size)
      }
    },
    data() {
      return {
        environment: 'sit',
        dialogVisible: false,
        cmdVisible: false,
        loading: false,
        sitLogPages: {
          current: 1,
          size: 10,
        },
        secLogPages: {
          current: 1,
          size: 10,
        },
        form: {
          message: '',
          version: ''
        },
        cmdContent: ['~~~~~~~~~start~~~~~~~~']
      }
    },
    mounted() {
      if (!this.activeProject.id) {
        this.$router.replace({
          name: 'project'
        })
      }
      console.log('detail')
      ipcRenderer
        .on('shell:exec:stdout', (event, data) => {
          console.log('stdout', data)
          this.cmdContent.push(data)
        })
        .on('shell:exec:stderr', (event, data) => {
          console.log('stderr', data)
          this.cmdContent.push(data)
        })
        .on('shell:close', (event, data) => {
          data === 0 && (this.cmdContent.push('打包完毕, 开始上传'), this.upload())
        })
    },
    destroyed() {
      ipcRenderer.removeAllListeners('shell:exec:stdout')
      ipcRenderer.removeAllListeners('shell:exec:stderr')
      ipcRenderer.removeAllListeners('shell:close')
    },
    methods: {
      onSitPageChange(val) {
        this.sitLogPages.current = val
      },
      onSecPageChange(val) {
        this.secLogPages.current = val
      },

      // 执行打包任务
      onPublish() {
        this.loading = true
        const branchName = this.environment === 'sit' ? 'develop' : 'master'
        const node = `node ${path.join(appPath, './src/task/package-project.js')}  ${this.projectName} ${branchName} ${this.form.message} ${this.form.version}`
        ipcRenderer.send('shell:exec', node)
          // this.upload()
      },

      // ftp上传
      upload() {
        // ftp账号
        const assetsId = this.environment === 'sit' ? this.activeProject.sit_ip : this.activeProject.sec_ip
        const ftpOption = this.assets.filter(item => assetsId === item.id).pop()

        // 获取本地文件列表
        const projectPath = path.join('/Users/my/Web/project', this.projectName, this.activeProject.dir)
        const fileAndDir = getFileAndDir(projectPath)

        // 远端地址
        const originPath = this.environment === 'sit' ? this.activeProject.sit_pwd : this.activeProject.sec_pwd

        this.ftp(ftpOption, projectPath, originPath, fileAndDir)
      },
      ftp(ftpOption, projectPath, originPath, fileAndDir) {
        connect(ftpOption).then(
          ftp => {
            let count = 0
            fileAndDir.dirs.forEach(item => {
              ftp.mkdir(path.join(originPath, item.replace(projectPath, '')), (err) => {
                count++
                if (!err) {
                  this.cmdContent.push('success:' + item.replace(projectPath, '') + '上传成功')
                }
                if (count === (fileAndDir.dirs.length + fileAndDir.files.length)) {
                  this.commitLog()
                }
              })
            })

            fileAndDir.files.forEach(item => {
              ftp.put(item, path.join(originPath, item.replace(projectPath, '')), err => {
                count++
                if (!err) {
                  this.cmdContent.push('success:' + item.replace(projectPath, '') + '上传成功')
                }
                if (count === (fileAndDir.dirs.length + fileAndDir.files.length)) {
                  this.commitLog()
                }
              })
            })

          },
          err => console.error(err)
        )
      },
      // 提交日志
      commitLog() {
        this.$message({
          message: `文件上传完毕`,
          type: 'success'
        });
        let log = {
          key: this.activeProject.id,
          value: {
            id: getRandom(),
            environment: this.environment,
            message: this.form.message,
            version: this.form.version,
            createTime: +new Date()
          }
        }
        this.$store.commit('PUBLISH_LOG', log)
        this.$store.commit('ACTIVE_PUBLISH_LOG', this.activeProject.id)
        this.dialogVisible = false
        this.loading = false
      }
    },
    filters: {
      dateFormat: dateFormat
    },
    components: {
      Cmd
    }
  }
</script>