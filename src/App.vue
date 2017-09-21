<template>
  <div id="app">
    <!--左侧导航-->
    <leftNav></leftNav>
    <!--右侧操作区域-->
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import leftNav from '@/components/common/leftNav'
export default {
  name: 'app',
  components:{
    leftNav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul{
  padding: 0;
  margin: 0;
}
  .main{
    width: 95%;
    height: 100%;
    background-color: aliceblue;
    float: left;
  }
</style>
