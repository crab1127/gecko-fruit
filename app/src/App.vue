<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    display: flex;
    align-items: flex-start;
  }
  .container {
    flex:1;
  }
  .side {
    background: #f1f1f1;
  }
</style>

<template>
  <el-row class="container">
    <el-col :span="6" class="side">
      <el-button-group>
        <el-button icon="arrow-left" @click.native="$router.go(-1)"></el-button>
        <el-button @click.native="$router.go(1)"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
      <div class="grid-content bg-purple-dark">
        <div>用户名</div>
      </div>
      <div>全部项目</div>
    </el-col>
    <el-col :span="18"><router-view></router-view></el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'app',
    methods: {
    }
  }
</script>
