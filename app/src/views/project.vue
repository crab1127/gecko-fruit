<template>
  <main class="project-container">
    <el-button type="primary" class="add-project" icon="plus" @click="handleAdd()">
      添加项目
    </el-button>
    <el-row class="project-main">
      <el-col :span="8" v-for="(item, index) in projectData" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;" @click="handleDetail(index, item)">
            <span>{{ item.name }}</span>
            <div class="bottom clearfix">
              <el-button type="text" class="button" @click.stop="handleEdit(index, item)">编辑</el-button>
              <el-button type="text" class="button" @click.stop="handleDelete(index, item)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import editProject from './add-project'
  export default {
    name: 'project',
    computed: {
      ...mapGetters({
        projectData: 'project'
      })
    },
    data() {
      return {
        activeProject: {}
      }
    },
    methods: {
      handleAdd() {
        this.$store.commit('SET_ACTIVE_PROJECT', {})
        this.$router.push({
          'name': 'add-project'
        })
      },
      handleEdit(index, row) {
        this.$store.commit('SET_ACTIVE_PROJECT', row)
        this.$router.push({
          'name': 'add-project'
        })
      },
      handleDelete(index, row) {
        this.$store.commit('PROJECT_DELETE', row)
      },
      handleDetail(index, row) {
        console.log(row)
        this.$store.commit('SET_ACTIVE_PROJECT', row)
        this.$router.push({
          'name': 'detail'
        })
      }
    },
    components: {
      editProject
    }
  }
</script>

<style type="text/css">
  .project-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .add-project {
    width: 200px;
    margin-bottom: 30px;
  }
  
  .project-main {
    flex: 1;
    width: 100%;
    padding: 0 20px;
  }
</style>