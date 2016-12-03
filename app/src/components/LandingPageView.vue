<style scoped>
  img {
    margin-top: -25px;
    width: 450px;
  }
</style>

<template>
  <div>
    <img src="./LandingPageView/assets/logo.png" alt="electron-vue">
    <h1>Welcomesasdas.</h1>
    <current-page></current-page>
    <versions></versions>
    <!-- <links></links> -->
  </div>
</template>

<script>
  import CurrentPage from './LandingPageView/CurrentPage'
  import Links from './LandingPageView/Links'
  import Versions from './LandingPageView/Versions'
  var exec = require('child_process').exec

  export default {
    components: {
      CurrentPage,
      Links,
      Versions
    },
    name: 'landing-page',
    mounted() {
      let cmdStr = 'curl http://www.weather.com.cn/data/sk/101010100.html'

      exec(cmdStr, (err, stdout, stderr) => {
        if (err) {
          console.log(err)
        } else {
          console.log(stdout)
        }
      })
      exec('git log', (err, stdout) => {
        console.log(123, stdout)
      })
    }
  }
</script>
