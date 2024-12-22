<template>
  <div class="common-layout">
    <el-container>
      <!-- 顶部标题 -->
      <el-header class="header">微商城后台管理系统</el-header>

      <el-container>
        <!-- 侧边导航 -->
        <el-aside class="aside" width="200px">
          <el-menu
              active-text-color="#fff"
              :default-active="activeIndex"
              class="el-menu-demo"
              @select="handleSelect"
          >
            <el-menu-item index="1">
              <router-link to="/" class="menu-link">
                <el-icon>
                  <HomeFilled />
                </el-icon>
                <span>首页</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="2">
              <router-link to="/category" class="menu-link">
                <el-icon>
                  <List />
                </el-icon>
                <span>分类管理</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="3">
              <router-link to="/goods" class="menu-link">
                <el-icon>
                  <List />
                </el-icon>
                <span>商品管理</span>
              </router-link>
            </el-menu-item>
            <el-menu-item index="4">
              <router-link to="/me" class="menu-link">
                <el-icon>
                  <Setting />
                </el-icon>
                <span>个人中心</span>
              </router-link>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主内容区域 -->
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { HomeFilled, List, Setting } from "@element-plus/icons-vue";

// 当前激活的菜单项
const activeIndex = ref("1");

// 获取当前路由对象
const route = useRoute();

// 菜单选择事件
const handleSelect = (key, keyPath) => {
  console.log(`Selected menu item: ${key}`, keyPath);
  activeIndex.value = key;
};

// 监听路由变化，更新 activeIndex
import { watchEffect } from "vue";
watchEffect(() => {
  activeIndex.value = route.path;
});
</script>

<style scoped>
/* 顶部标题样式 */
.header {
  height: 60px;
  line-height: 60px;
  background: #1493fa !important; /* 根据图片的蓝色设置 */
  color: #fff;
  text-align: center;
  font-size: 20px; /* 调整为略大字体 */
  font-weight: bold;
}

/* 菜单样式 */
.el-menu-demo {
  height: calc(100vh - 60px); /* 自适应高度 */
  border-right: 1px solid #ddd;
  background-color: #f4f6f9; /* 根据图片调整背景色 */
}

.menu-link {
  display: flex;
  align-items: center;
  font-size: 16px; /* 设置字体大小 */
  color: #333; /* 默认字体颜色 */
  text-decoration: none; /* 移除下划线 */
  transition: color 0.3s; /* 增加交互效果 */
}

.menu-link:hover {
  color: #1493fa; /* 鼠标悬停时字体颜色 */
}

.aside {
  background-color: #f4f6f9; /* 根据图片调整背景色 */
  box-shadow: 1px 5px 5px rgba(0, 0, 0, 0.1);
}

/* 激活的菜单项背景 */
.el-menu .is-active {
  background: #1493fa !important; /* 根据图片的激活项背景色 */
  color: #fff !important;
}

/* 主内容样式 */
.el-main {
  background-color: #fff;
  padding: 20px;
  overflow-y: auto;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);
  min-height: calc(100vh - 60px); /* 内容区域适应屏幕高度 */
  border-radius: 4px;
  font-size: 16px; /* 内容区域字体大小 */
  color: #333; /* 内容字体颜色 */
}
</style>