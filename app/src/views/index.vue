<template>
  <main>
    <router-link :to="{name: 'add-project'}">
      <el-button type="primary">
        添加项目
      </el-button>
    </router-link>
    <el-row>
      <el-col :span="8" v-for="(o, index) in 2" :offset="index > 0 ? 2 : 0">
        <el-card :body-style="{ padding: '0px' }">
          <div style="padding: 14px;">
            <span>专修通</span>
            <div class="bottom clearfix">
              <time class="time"></time>
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </main>
</template>

<script>
  import os from 'os'

  export default {
    data() {
      return {
      }
    }
  }
</script>
