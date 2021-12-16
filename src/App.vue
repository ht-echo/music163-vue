<template>
  <div id="app">
    <el-container>
      <Header class="app-header-contaner" />
      <div style="padding:0;flex:1">
        <router-view />
      </div>
      <el-footer><Footer /></el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  overflow: auto;
}
#app {
  flex: 1;
  display: flex;
  user-select: none;
}
</style>
