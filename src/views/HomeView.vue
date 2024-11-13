<script setup>
import Goodsinfo from "@/components/Home/Goodsinfo.vue";
import { ref } from "vue";

// 定义一个响应式变量控制卡片数量
const cardCount = ref(18); // 渲染18章卡片

// 生成一个数组，用于渲染卡片
const cards = ref(Array.from({ length: cardCount.value }, (_, index) => index + 1));
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <div class="searching-bar">
        <el-input
          v-model="searchQuery"
          placeholder="请输入搜索内容"
          class="searching-bar"
      ></el-input></div>
      <div class="tag">these are tags</div>
      <div class="content">
        <p>This is contents for goods</p>
        <!-- 循环渲染卡片 -->
        <div v-for="card in cards" :key="card" class="card">
          <Goodsinfo />
        </div>
      </div>

    </div>
  </div>

</template>

<style scoped>
.basic-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #CAD9F1;

}

.center-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  max-width: 1200px;
  min-width: 1200px;
  margin-top: 50px;
}
.searching-bar {
  background-color: #f8f8f8; /* 搜索栏背景颜色 */
  padding: 10px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  width: 100%; /* 占满整个容器宽度 */
  z-index: 10; /* 确保搜索栏在最上层 */
}
.content {
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许换行 */
  justify-content: flex-start; /* 从左到右排列 */
  align-items: center; /* 垂直方向居中对齐 */
  gap: 20px; /* 卡片之间的间距 */
  width: 100%; /* 占满父容器宽度 */
}

</style>

