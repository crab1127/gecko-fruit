<template>
  <main class="add-project-container">
    <el-form :model="form" :rules="rules" ref="form" label-width="180px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="git地址">
        <el-col :span="14">
          <el-input v-model="form.git" :disabled="!isNew"></el-input>
        </el-col>
        <el-col class="line" :span="1">－</el-col>
        <el-col :span="4">
          <el-input v-model="form.gitBranchMaster" placeholder="主分支"></el-input>
        </el-col>
        <el-col class="line" :span="1">－</el-col>
        <el-col :span="4">
          <el-input v-model="form.gitBranchDevelop" placeholder="开发分支"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="发布的目录">
        <el-input v-model="form.dir"></el-input>
      </el-form-item>
      <el-form-item label="测试环境">
        <el-switch on-text="" off-text="" v-model="form.sit" @change="changSit" />
      </el-form-item>
      <template v-if="form.sit">
        <el-form-item label="ip">
          <el-select v-model="form.sit_ip" placeholder="请选择">
            <el-option
              v-for="item in assets"
              :label="item.ip"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录">
          <el-input v-model="form.sit_pwd"></el-input>
        </el-form-item>
      </template>
      <el-form-item label="正式环境">
        <el-switch on-text="" off-text="" v-model="form.sec" @change="changSec" />
      </el-form-item>
      <template v-if="form.sec">
        <el-form-item label="ip">
          <el-select v-model="form.sec_ip" placeholder="请选择">
            <el-option
              v-for="item in assets"
              :label="item.ip"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录">
          <el-input v-model="form.sec_pwd"></el-input>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" :loading="sublimeLoding" @click="onSubmit">立即创建</el-button>
        <el-button type="text" v-show="initStatus || sublimeLoding" @click="cmdVisible = true">详情</el-button> 
      </el-form-item>
    </el-form>
    <cmd v-model="cmdVisible" :content="cmdContent"/>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  import Cmd from '../components/cmd'
  // const defaultFrom = 
  export default {
    name: 'add-assets',
    computed: {
      ...mapGetters({
        activeproject: 'activeProject',
        assets: 'assets',
        userSet: 'userSet'
      }),
      isNew() {
        return !this.activeproject.git ? true : false
      }
    },
    data () {
      return {
        sublimeLoding: false,
        cmdVisible: false,
        initStatus: false,
        form: {
          name: '',
          git: '',
          gitBranchMaster: 'master',
          gitBranchDevelop: 'develop',
          sit: true,
          sec: true
        },
        cmdContent: ['~~~~~~~~~start~~~~~~~~']
        // rules: {
        //   name: [
        //     { required: true, message: '请输入项目名称', trigger: 'blur' },
        //     { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        //   ],
        //   git: [
        //     { required: true, message: '请输入git地址', trigger: 'blur' },
        //   ],
        //   gitBranchMaster: [
        //     { required: true, message: '请输入主分支', trigger: 'blur' },
        //   ],
        //   gitBranchDevelop: [
        //     { required: true, message: '请输入开发分支', trigger: 'blur' },
        //   ]
        // }
      }
    },
    mounted() {
      console.log('dddd')
      this.form = Object.assign(this.form, this.activeproject)

      ipcRenderer.on('shell:exec:stdout', (event, data) => {
        this.cmdContent.push(data)
        console.log('stdout',data)
      });
      ipcRenderer.on('shell:exec:stderr', (event, data) => {
        this.cmdContent.push(data)
        console.log('stderr',data)
      });
      ipcRenderer.on('shell:close', (event, data) => {
        this.cmdContent.push('~~~~~end~~~~~~~')
        this.sublimeLoding = false
        if (data === 0) {
          this.$store.commit('PROJECT_ADD', this.form)
          this.success('new')
        } else {
          this.initStatus = true
          this.fail()
        }
      });
    },
    destroyed() {
      ipcRenderer.removeAllListeners('shell:exec:stdout')
      ipcRenderer.removeAllListeners('shell:exec:stderr')
      ipcRenderer.removeAllListeners('shell:close')
    },
    methods: {
      changSit(val) {
        this.form.sit = val
      },
      changSec(val) {
        this.form.sec = val
      },
      onSubmit() {
        let commitType = this.form.id ? 'PROJECT_UPDATE' : 'PROJECT_ADD'
        if (this.isNew) {
          this.sublimeLoding = true
          ipcRenderer.send('shell:exec', `node ./app/src/util/shell-project-init.js ${this.form.git}`)
        } else {
          this.$store.commit(commitType, this.form)
          this.success('update')
        }
      },
      success(type) {
        let msg = type === 'new' ? '添加项目成功, 3秒后回到首页' : '更新项目成功, 3秒后回到首页'
        this.$message({
          message: msg,
          type: 'success'
        });
        setTimeout(_ => this.$router.push({'name': 'project'}), 3000)
      },
      fail() {
        this.$message({
          message: `初始项目失败，错误信息：${this.cmdContent[this.cmdContent.length - 2]}`,
          type: 'error'
        });
      }
    },
    components: {
      Cmd
    }
  }
</script>
<style type="text/css">
  .add-project-container {
    margin-right: 150px;
  }
  .line{
    text-align: center;
  }
</style>
