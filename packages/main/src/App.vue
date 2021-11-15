<template>
  <div id="app">
    <el-menu mode="horizontal" router>
      <el-menu-item index="/base">base</el-menu-item>
      <el-menu-item index="/test">test</el-menu-item>
      <el-menu-item
        v-for="app in allAppArr"
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
const isDev = process.env.NODE_ENV === 'development';
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
    allAppArr() {
      return configJson.arrConfig.reduce((pre, item) => {
        if (item.name === 'app3') {
          return [
            ...pre,
            {
              ...item,
              name: 'app3-1',
              activeRule: '/application-app3-1',
              entry: isDev ? item.entry : `/app3-1/`,
            },
            {
              ...item,
              name: 'app3-2',
              activeRule: '/application-app3-2',
              entry: isDev ? item.entry + '/test' : `/app3-2/`,
            },
          ];
        }
        if (item.name === 'main') {
          return pre;
        }
        return [
          ...pre,
          {
            ...item,
            entry: isDev ? item.entry : `/${item.name}/`,
          },
        ];
      }, []);
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
