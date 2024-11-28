<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let search_item_id = ref(""); // 被用户点击的商品id

onMounted(() => {
  search_item_id.value = route.params.itemid;
});
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <div class = "block">
<!--调用itemcard组件-->
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
.block{
  background-color: #fff; /* 背景颜色 */
  padding: 10px; /* 内边距 */
  box-sizing: border-box; /* 确保边框和内边距包含在宽度内 */
  width: 100%; /* 与搜索框同宽 */
  margin: 20px 0;
  border-radius: 12px; /* 设置圆角 */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 90%;
}

</style>