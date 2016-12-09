<template>
  <div class="cmd-container" v-show="visible">
    <div @click="visible = false">
      <el-button type="text" class="cmd-close" icon="close"></el-button>
    </div>
    <div v-html="cmdToHtml(content)">
    </div>
    ...
  </div>
</template>
<script type="text/javascript">
  export default {
    name: 'cmd',
    props: {
      value: {
        type: Boolean
      },
      content: {
        type: Array,
        default: []
      }
    },
    data () {
      return {
        visible: false
      }
    },
    watch: {
      value(bl) {
        this.visible = bl
      },
      visible(bl) {
        this.$emit('input', bl)
      }
    },
    mounted() {
      console.log('cmd')
    },
    methods: {
      cmdToHtml(cmds) {
        let html = '';
        cmds.forEach(item => html += `<code>${item}</code> <br />`)
        return html
      }
    }
  }
</script>
<style>
  .cmd-container{
    position: fixed;
    top: 0; right: 0; 
    bottom: 0; left: 0;
    z-index: 21;
    padding: 20px;
    overflow-y: auto;
    background: rgba(20,20,20, .9);
    color: #fff;
  }
  .cmd-close {
    position: absolute;
    top: 0;
    right: 10px;
  }
</style>