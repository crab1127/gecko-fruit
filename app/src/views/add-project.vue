<template>
  <el-form ref="form" :model="form" label-width="100px" width="400px">
    <el-form-item label="项目名称">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="项目中文名">
      <el-input v-model="form.cnName"></el-input>
    </el-form-item>
    <el-form-item label="git地址">
      <el-input v-model="form.git"></el-input>
    </el-form-item>
    <el-form-item label="发布的目录">
      <el-input v-model="form.dir"></el-input>
    </el-form-item>
    <h3>测试环境</h3>
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
    <h3>真实环境</h3>
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
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ipcRenderer } from 'electron'
  export default {
    name: 'add-assets',
    computed: {
      ...mapGetters({
        activeproject: 'activeProject',
        assets: 'assets',
        userSet: 'userSet'
      }),
      form() {
        return Object.assign({}, this.activeproject)
      }
    },
    mounted() {
      ipcRenderer.on('shell:exec:stdout', (event, data) => {
        console.log('stdout',data)
      });
      ipcRenderer.on('shell:exec:stderr', (event, data) => {
        console.log('stderr',data)
      });
      ipcRenderer.on('shell:close', (event, data) => {
        this.$router.push({'name': 'project'})
      });
    },
    destroyed() {
      ipcRenderer.removeAllListeners('shell:exec:stdout')
      ipcRenderer.removeAllListeners('shell:exec:stderr')
      ipcRenderer.removeAllListeners('shell:close')
    },
    methods: {
      onSubmit() {
        let commitType = this.form.id ? 'PROJECT_UPDATE' : 'PROJECT_ADD'
        this.$store.commit(commitType, {...this.form})
        ipcRenderer.send('shell:exec', `node ./app/src/util/shell-project-init.js ${this.form.git}`)
      }
    }
  }
</script>
