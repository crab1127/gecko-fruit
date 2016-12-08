<template>
  <main>
    <el-tabs :active-name="environment" style="width: 100%;">
      <el-tab-pane label="测试环境" name="sit">
        <el-button type="primary" @click="(dialogVisible = true, environment= 'sit')">
          发布到测试环境
        </el-button>
        <el-table :data="sitLogFilter">
          <el-table-column
            prop="id"
            label="id"
            width="180" >
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
            prop="id"
            label="id"
            width="180" >
          </el-table-column>
          <el-table-column
            prop="message"
            label="上传说明">
          </el-table-column>
          <el-table-column
            prop="tag"
            label="标记">
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
              <el-button type="text" size="small">查看</el-button>
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
        <el-form-item label="名称">
          <el-input v-model="form.tag"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
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
        <el-button type="primary" @click="onPublish" :loading="loading">确定发布</el-button>
      </span>
    </el-dialog>
  </main> 
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  import path from 'path'
  import ftpUpload from '../util/ftp-upload'
  import { getRandom, dateFormat } from '../util/common'

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
          tag: ''
        }
      }
    },
    mounted() {
      if (!this.activeProject.id) {
        this.$router.replace({name: 'project'})
      }
      console.log('detail')
      ipcRenderer
        .on('shell:exec:stdout', (event, data) => {
          console.log('stdout', data)
        })
        .on('shell:exec:stderr', (event, data) => {
          console.log('stderr', data)
        })
        .on('shell:close', (event, data) => {
          data === 0 && this.onFtpUpload()
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
      onPublish() {
        this.loading = true
        const branchName = this.environment === 'sit' ? 'develop' : 'master'
        const node = `node ./app/src/util/shell-project-package.js ${this.projectName} ${branchName}`
        ipcRenderer.send('shell:exec', node)
      },
      onFtpUpload() {

        const projectPath = '/Users/my/Web/project/webSiteApp/src'
        const originPath = this.environment === 'sit' ? this.activeProject.sit_pwd : this.activeProject.sec_pwd
        const assetsId = this.environment === 'sit' ? this.activeProject.sit_ip : this.activeProject.sec_ip
        const ftpOption = this.assets.filter(item => assetsId === item.id).pop()

        ftpUpload(projectPath, originPath, ftpOption).then(
          _ => {
            this.commitLog()
          },
          _ => console.log(_)
        )
      },
      commitLog() {
        let log = {
          key: this.activeProject.id,
          value: {
            id: getRandom(),
            environment: this.environment,
            message: this.form.message,
            tag: this.form.tag,
            createTime: + new Date()
          }
        }
        this.$store.commit('PUBLISH_LOG', log)
        this.$store.commit('ACTIVE_PUBLISH_LOG', this.activeProject.id)
        this.dialogVisible = false
      }
    },
    filters: {
      dateFormat: dateFormat
    }
  }
</script>