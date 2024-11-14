<script setup>
import Goodsinfo from "@/components/Home/Goodsinfo.vue";
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";



// 点击搜索按钮事件
const handleSearch = () => {
  console.log("搜索内容为:", searchQuery.value);
};


// 搜索框绑定的变量
const searchQuery = ref('');

// 标签数组
const tags = ref(['Vue', 'React', 'JavaScript', 'CSS', 'HTML']);
// 定义一个响应式变量控制卡片数量
const cardCount = ref(18); // 渲染18章卡片

// 生成一个数组，用于渲染卡片
const cards = ref(Array.from({ length: cardCount.value }, (_, index) => index + 1));


// 处理标签点击
const handleTagClick = (tag) => {
  searchQuery.value = tag;
};
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <!-- 搜索框 -->
      <el-input
          v-model="searchQuery"
          placeholder="请输入搜索内容"
          class="searching-bar">
        <template #append>
          <!-- 放大镜按钮 -->
          <el-button @click="handleSearch">
            <el-icon>
              <Search />
            </el-icon>
          </el-button>
        </template>
      </el-input>

      <!-- 标签区域 -->
      <!-- 标签容器 -->
      <div class="tag-container">
        <div
            v-for="tag in tags"
            :key="tag"
            class="tag"
            @click="handleTagClick(tag)"
        >
          {{ tag }}
        </div>
      </div>
      <!-- 内容区域 -->
      <div class="content">
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
  padding: 6px;
  text-align: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  width: 100%; /* 占满整个容器宽度 */
  z-index: 10; /* 确保搜索栏在最上层 */
  height:60px;


}
.content {
  display: flex; /* 使用 Flexbox 布局 */
  flex-wrap: wrap; /* 允许换行 */
  justify-content: flex-start; /* 从左到右排列 */
  align-items: center; /* 垂直方向居中对齐 */
  gap: 20px; /* 卡片之间的间距 */
  width: 100%; /* 占满父容器宽度 */

}
.tag-container {
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
  width: 50%;
  position: relative;
  left: 0;
}

.tag {
  background-color: #eef1f6;
  padding: 8px 16px;
  border-radius: 16px; /* 圆角 */
  cursor: pointer;
  font-size: 14px; /* 默认字体大小 */
  color: #333;
  transition: all 0.3s ease;
}

.tag:hover {
  background-color: #d0e4fc; /* 鼠标悬停颜色 */
}

.tag:active {
  background-color: #a5c8f8; /* 点击时颜色 */
}
</style>

