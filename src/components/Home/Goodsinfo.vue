<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

function goToItemPage() {
  router.push('/item-page'); // 跳转到目标页面的路径
}
</script>


<template>
  <el-card
      class="clickable-card"
      @click="goToItemPage"
      style="cursor: pointer; max-width: 200px;"
  >
    <template #header>
      <div class="card-header">
        <span>name of the item</span>
      </div>
    </template>

    <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        style="width: 100%; height: auto;"
    />
    <p class="text item">{{ 'price of the item' }}</p>
    <template #footer>description</template>
  </el-card>
</template>


<style scoped>


.clickable-card {
  margin: 10px auto; /* 卡片之间留间距 */
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  transition: transform 0.2s, box-shadow 0.2s; /* 点击时有轻微放大效果 */
}

.clickable-card:hover {
  transform: scale(1.05); /* 鼠标悬停时放大 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); /* 悬停时加深阴影 */
}



.el-card {
  margin: 0 auto; /* 水平居中 */
  padding: 20px;
  text-align: center; /* 内容居中 */
}


.center-container{
  max-width: 1200px;
  min-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #CAD9F1;
}
</style>