<style>
  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    line-height: 1.4;
  }
  header{
    height: 50px;
    display: flex;
    align-items: center;
    background: #FF4949;
    color: #fff;
  }
  .el-icon-menu,
  .el-icon-d-arrow-left {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .el-icon-d-arrow-left {
    float: right;
  }
  h1 {
    font-size: 18px;
  }
  .container {
    display: flex;
    flex-direction: column;
  }
  .content{
    flex: 1;
    padding: 30px
  }
  .side {
    background: #f1f1f1;
  }
</style>

<template>
  <div class="container">
    <header>
      <i class="el-icon-menu" @click="menuVisible = true"></i>
      <h1 @click="$router.push({name: 'project'})">前端发布工具</h1>
    </header>
    <router-view class="content"></router-view>
    <sub-menu v-model="menuVisible"/>
  </div>
  </el-row>
</template>

<script>
  import subMenu from './components/subMenu'
  export default {
    name: 'app',
    data() {
      return {
        menuVisible: false
      }
    },
    methods: {
    },
    components: {
      subMenu
    }
  }
</script>
