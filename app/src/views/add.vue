<template>
  <main>
    <h1>添加表单</h1>
    <el-form ref="form" :model="form" label-width="100px" width="400px">
      <el-form-item label="项目名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="git地址">
        <el-input v-model="form.git"></el-input>
      </el-form-item>
      <h3>测试环境</h3>
      <el-form-item label="ip">
        <el-input v-model="form.sit"></el-input>
      </el-form-item>
      <el-form-item label="目录">
        <el-input v-model="form.sit"></el-input>
      </el-form-item>
      <h3>真实环境</h3>
      <el-form-item label="ip">
        <el-input v-model="form.sit"></el-input>
      </el-form-item>
      <el-form-item label="目录">
        <el-input v-model="form.sit"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import os from 'os'
  import { exec } from 'child_process'
  export default {
    data() {
      return {
        form: {
          name: '',
          git: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit() {
        console.log('sss')
        exec('cd /Users/my/Web/project && git clone https://github.com/crab1127/blog.git', (err, st) => {
          console.log(123, st)
        })
        console.log('submile')
      }
    }
  }
</script>
