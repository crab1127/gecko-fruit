<template>
  <div>
    首页
  </div>
</template>

<script>
  import os from 'os'

  export default {
    data() {
      return {
        platform: os.platform(),
        versions: process.versions
      }
    }
  }
</script>
