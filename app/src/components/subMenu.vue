<template>
    <aside>
      <transition name="fade">
        <div class="mask" v-show="visible" @click="visible = false"></div>
      </transition>
      <transition name="slide">
        <menu class="menu" v-show="visible">
          <ul>
            <li class="el-dropdown-menu__item" @click="onNav('project')">全部项目</li>
            <li class="el-dropdown-menu__item" @click="onNav('assets')">资产中心</li>
            <li class="el-dropdown-menu__item" @click="onNav('set')">设置</li>
          </ul>
        </menu>
      </transition>
    </aside>
</template>
<script>
  export default {
    name: 'subMenu',
    props: {
      value: {
        type: Boolean
      }
    },
    data() {
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
    methods: {
      onNav(path) {
        this.visible = false
        this.$router.replace({name: path})
      }
    }
  }
</script>
<style type="text/css">
  .fade-enter-active, .fade-leave-active {
    transition: all .2s
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .4s
  }
  .slide-enter, .slide-leave-active {
    transform: translate(-100%, 0);
  }
  .mask {
    position: fixed;
    top: 0; right: 0;
    bottom: 0; left: 0;
    background: rgba(0,0,0,.2);
  }
  .menu {
    position: fixed;
    top:0;
    left:0;
    z-index: 10;
    width: 200px;
    height: 100%;
    padding-top: 20px;
    box-shadow: 0 3px 2px rgba(0,0,0,.2);
    background: #fff;
  }
  .menu a{
    text-decoration: none;
    color: #333;
  }
</style>