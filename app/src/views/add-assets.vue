<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="主机名">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="ip">
      <el-input v-model="form.ip"></el-input>
    </el-form-item>
    <el-form-item label="端口">
      <el-input v-model="form.port"></el-input>
    </el-form-item>
    <el-form-item label="账号">
      <el-input v-model="form.account"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.password"></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="form.type" placeholder="请选择">
        <el-option label="ftp" value="ftp" />
        <el-option label="ssh" value="ssh" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>

  export default {
    name: 'add-assets',
    props: {
      data: {
        type: Object,
        default() {
          return {
            name: '',
            ip: '',
            port: '',
            account: '',
            password: '',
            type: ''
          }
        }
      }
    },
    computed: {
      form() {
        return Object.assign({}, this.data)
      }
    },
    mounted() {
      console.log('ssss')
    },
    methods: {
      onSubmit() {
        let commitType = this.form.id ? 'ASSETS_UPDATE' : 'ASSETS_ADD'
        this.$store.commit(commitType, this.form)
        this.$emit('change')
      }
    }
  }
</script>