<template>
  <div id="app">
   <el-menu mode="horizontal" :router="true">
      <!-- <el-menu-item index=''>base</el-menu-item> -->
       <el-menu-item index="/">app1-----base -1</el-menu-item>
      <el-menu-item index='/hello'>app1-----hello</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {
    
  }
}
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
