<template>
  <main>
    <el-tabs :active-name="activeName">
      <el-tab-pane label="测试环境" name="first">
        <el-button type="primary">
          发布到测试环境
        </el-button>
      </el-tab-pane>
      <el-tab-pane label="正式环境" name="second">
        <el-button type="primary">
          发布到正式环境
        </el-button>
      </el-tab-pane>
    </el-tabs>
  </main> 
</template>

<script>
  import os from 'os'

  export default {
    data() {
      return {
        activeName: 'first'
      }
    }
  }
</script>