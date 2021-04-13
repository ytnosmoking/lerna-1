<template>
  <div id="app">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/base">base</el-menu-item>
      <el-menu-item index="/test">test</el-menu-item>
      <el-menu-item
        v-for="app in apps"
        :index="app.activeRule"
        :key="app.activeRule"
        >{{ app.name }}</el-menu-item
      >
    </el-menu>
    <router-view></router-view>
    <img alt="Vue logo" src="./assets/logo.png" />
    <transition
      mode="out-in"
      enter-active-class="slideInRight animated"
      leave-active-class="slideOutRight animated"
    >
      <div id="container"></div>
    </transition>

    <!-- <div v-for="(app,index) in apps" :key="index" :id="app.name"></div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import configJson from 'app-tools/lib/config.json';
export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data() {
    return {
      appArr: configJson.arrConfig || [],
    };
  },
  computed: {
    apps() {
      return this.appArr.filter((item) => item.name !== 'main');
    },
  },
  mounted() {
    console.log(this.apps);
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
