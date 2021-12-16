<template>
  <div class="header-container">
    <div class="page-container header-content">
      <div class="header-menu">
        <el-menu
          :active-text-color="activeTextColor"
          :default-active="activeIndex"
          class="el-menu-header"
          mode="horizontal"
        >
          <el-menu-item index="1">首页</el-menu-item>
          <el-menu-item index="2">歌单</el-menu-item>
          <el-menu-item index="3">专辑</el-menu-item>
          <el-menu-item index="4">榜单</el-menu-item>
          <el-menu-item index="5">歌手</el-menu-item>
        </el-menu>
      </div>
      <div class="menu-input-container">
        <el-input placeholder="搜索歌曲、歌手、MV" prefix-icon="el-icon-search" v-model="searchValue"></el-input>
        <i class="el-icon-user-solid user-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { globalConfig } from '@/utils/global';
export default {
  data() {
    return {
      activeIndex: '1',
      searchValue: '',
      activeTextColor: globalConfig.main_text_color,
    };
  },
  created() {},
};
</script>

<style lang="scss" scoped>
.header-container {
  padding:5px 20px;
  border-bottom: 1px solid #f5f5f8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .menu-input-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 300px;
      .user-icon{
        font-size: 34px;
        padding-left: 20px;
      }
    }
  }
}
.el-menu-header {
  border-bottom: none;
  .el-menu-item {
    border-bottom: none;
  }
}
</style>
