<template>
  <main>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="仓库地址">
        <el-input v-model="form.repository"></el-input>
      </el-form-item>
      <el-form-item label="git账号">
        <el-input v-model="form.git_name"></el-input>
      </el-form-item>
      <el-form-item label="git密码">
        <el-input v-model="form.git_password"></el-input>
      </el-form-item>
    </el-form>
  </main>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'set',
    computed: {
      ...mapGetters({
        userSet: 'userSet'
      }),
      form() {
        return Object.assign({}, this.userSet)
      }
    },
    watch: {
      form (val) {
        console.log('sss')
        this.$store.commit('SET_UPDATE', this.form)
      }
    }
  }
</script>