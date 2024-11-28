<script setup>
import { useRouter } from 'vue-router';
import axios from "@/axios_client/index.js";
import {onMounted, ref, reactive, computed} from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router/index.js";

const props = defineProps({
  img: String,
  itemname: String,
  price: Number,
  description: String,
  itemid: String
})

console.log(props.itemname)
function goToItemPage() {
  router.push(`/iteminfo/${props.itemid}`)
}
</script>


<template>
  <el-card
      class="clickable-card"
      @click="goToItemPage"
      style="cursor: pointer;"
  >


    <img
        :src="decodeURIComponent(img?img.length>0?img[0]:null:null)"
        style="width: 100%; height: auto;"
    />
    <div class="price">
    <p >￥{{price}}</p>
    </div>
    <div class = "description">
    <p >{{description}}</p>
    </div>
  </el-card>
</template>


<style scoped>
.el-card {
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

.description{
  text-align: left;
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
.price{
  padding-bottom: 30px;
  padding-top: 30px;
  text-align: left;
  font-size: 24px;
  height: 24px;
  line-height: 24px;
  color: #ff4f24;


}
.price p {
  font-weight: 700;
}
</style>