<script setup>
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import axios from '../axios_client/index.js';

// 组件基本变量设置
const { t } = useI18n();
let searchQuery = ref("");
let componentKey = ref(0);
const cardCount = 20; // 每页显示的卡片数量
let cardList = ref([]);

// 组件基本函数设置
const handleSearch = () => {
  componentKey.value += 1;
  axios.post("/search", {
    key: searchQuery
  }).then(res => {
    if (res.status === 200) {

    }
  })
};
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <div class="search-bar">

      </div>
      <div class="quick-tabs">

      </div>
      <div class="item-info-block">

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
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  max-width: 1200px;
  min-width: 1200px;
  margin-top: 50px;
}
</style>

