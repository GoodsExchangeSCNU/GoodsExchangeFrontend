<script setup>
import { useRouter } from 'vue-router';
import axios from "@/axios_client/index.js";
import {onMounted, ref, reactive, computed} from "vue";
import { useI18n } from "vue-i18n";
const router = useRouter();
const props = defineProps({
  img: String,
  itemname: String,
  price: Number,
  description: String,

})

console.log(props.itemname)
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
        <span>{{itemname}}</span>
      </div>
    </template>

    <img
        :src="decodeURIComponent(img?img.length>0?img[0]:null:null)"
        style="width: 100%; height: auto;"
    />
    <p class="text item">{{price}}</p>
    <template #footer>{{description}}</template>
  </el-card>
</template>


<style scoped>
.el-card {
  //margin: 10px auto; /* 卡片之间留间距 */
  //padding: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影 */
  transition: transform 0.2s, box-shadow 0.2s; /* 点击时有轻微放大效果 */
  width: 100%;
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