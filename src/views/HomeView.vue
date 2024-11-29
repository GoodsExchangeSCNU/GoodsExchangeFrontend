<script setup>
import Goodsinfo from "@/components/Home/Goodsinfo.vue";
import {onMounted, ref, watch} from "vue";
import { Search } from "@element-plus/icons-vue";
import { useI18n } from "vue-i18n";
import axios from "@/axios_client/index.js";
import PersonalData from "@/components/profile/PersonalData.vue";

//access to vue-i18n
const { t , locale } = useI18n();
// 搜索框绑定的变量
const searchQuery = ref('');
let componentKey = ref(0);


// 点击搜索按钮事件
const handleSearch = () => {
  compoentKey.value += 1;

    axios.post("/search").then((res) => {
      if (res.status === 200 && res.data.code === 0) {
        cards.value = res.data.data;
      }
      else {
        console.warn("Failed to fetch items");
      }
    });

};

// 标签数组
const tags = ref([t("home.tag1"),t("home.tag2"),t("home.tag3"),t("home.tag4"),t("home.tag4"),t("home.tag5"),t("home.tag6"),t("home.tag7"),t("home.tag8"),t("home.tag9"),t("home.tag10"),t("home.tag11"),t("home.tag12"),t("home.tag13"),t("home.tag14"),t("home.tag15"),t("home.tag16"),t("home.tag17"),t("home.tag18"),t("home.tag19"),t("home.tag20")]);
// 定义一个响应式变量控制卡片数量
const cardCount = ref(20); // 渲染18章卡片
const language_flag = ref("en"); // 语言标志

// 生成一个数组，用于渲染卡片
const cards = ref(Array.from({ length: cardCount.value }, (_, index) => index + 1));

let itemname = ref("");
let price = ref("");
let description = ref("");
let img = ref("");
// 处理标签点击
const handleTagClick = (tag) => {
  searchQuery.value = tag;
};

watch(
    () => locale.value,
    (newVal) => {
      if (newVal === "zh") {
        language_flag.value = "zh";
        tags.value = [t("home.tag1"),t("home.tag2"),t("home.tag3"),t("home.tag4"),t("home.tag4"),t("home.tag5"),t("home.tag6"),t("home.tag7"),t("home.tag8"),t("home.tag9"),t("home.tag10"),t("home.tag11"),t("home.tag12"),t("home.tag13"),t("home.tag14"),t("home.tag15"),t("home.tag16"),t("home.tag17"),t("home.tag18"),t("home.tag19"),t("home.tag20")];
      } else {
        language_flag.value = "en";
        tags.value = [t("home.tag1"),t("home.tag2"),t("home.tag3"),t("home.tag4"),t("home.tag4"),t("home.tag5"),t("home.tag6"),t("home.tag7"),t("home.tag8"),t("home.tag9"),t("home.tag10"),t("home.tag11"),t("home.tag12"),t("home.tag13"),t("home.tag14"),t("home.tag15"),t("home.tag16"),t("home.tag17"),t("home.tag18"),t("home.tag19"),t("home.tag20")]
      }
    }
)

onMounted(() => {
  if (locale.value === "zh") {
    language_flag.value = "zh";
  } else {
    language_flag.value = "en";
  }
  componentKey.value += 1;
  axios.get("/item/list").then(res => {
    if(res.status === 200){
      if(res.data.code === 0){
        cards.value = res.data.data
        if(cards.value.length < cardCount.value){
          cards.value = [...cards.value,...Array.from({ length: cardCount.value-cards.value.length }, (_, index) => index + 1)]
        }
        // itemname.value = res.data.data.name;
        // img.value = res.data.data.img;
        // description.value = res.data.data.description;
        // price.value = res.data.price;
      }
      else{
        console.warn("failed to get item info")
      }
    }
    else{
      console.warn("failed to get item info")
    }
    // compoentKey.value += 1;
  }).catch(res => {
    console.warn("failed to get item info")
    console.warn(res)
  })
});
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <!-- 搜索框 -->
      <el-input
          v-model="searchQuery"
          :placeholder="t('')"
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
      <div class="block-for-tags">
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
        <div class="block">
          <img
              src="@/assets/homeview.jpg"
              alt="icon"
              class="block-img"
          >
        </div>
      </div>

      <!-- 内容区域 -->
      <div class="content">
        <div class = "block-for-content">
          <div v-for="(card, index) in cards" :key="card" class="card">
            <Goodsinfo
                :img = "card.img"
                :itemname = "card.name"
                :description = "card.description"
                :price = "card.price"
                :itemid="card.id"
                :key="compoentKey"
            />
          </div>
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
  justify-content: flex-start;
  align-items: flex-start;
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
  display: flex;
  flex-wrap: wrap; /* 自动换行 */
  justify-content: flex-start; /* 左对齐 */
  gap: 20px; /* 卡片之间的水平和垂直间距 */
  width: 100%; /* 占满父容器宽度 */
}

.card {
  background-color: #eef1f6; /* 卡片背景色 */
  border-radius: 8px; /* 卡片圆角 */
  padding: 10px; /* 卡片内边距 */
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* 卡片阴影 */
  box-sizing: border-box; /* 确保宽度计算包含内边距 */
  width: 100%;
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
  gap: 10px;
  width: 75%;
  align-self:flex-start;
  height: 95%;
}

.block {
  width: 100%;
  background-color: #eef1f6; /* 背景色 */
  border-radius: 12px; /* 圆角 */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* 阴影效果 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; /* 确保内容不超出 */
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 15px;
  flex-wrap: wrap;
  gap: 10px;
  height: 95%;
}

.block-img {
  width: 100%;
  height: 100%;
  border-radius: 12px; /* 图片圆角与 block 保持一致 */
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
.block-for-tags {
  background-color: #fff; /* 背景颜色 */
  padding: 10px; /* 内边距 */
  box-sizing: border-box; /* 确保边框和内边距包含在宽度内 */
  width: 100%; /* 与搜索框同宽 */
  margin: 20px 0;
  border-radius: 12px; /* 设置圆角 */
  display: flex;
  flex-direction: row;
  height: 400px;
  align-items: center;
  justify-content: center;
}

.block-for-content {
  background-color: #fff; /* 背景颜色 */
  padding: 20px; /* 内边距 */
  box-sizing: border-box; /* 包含边框和内边距 */
  width: 100%; /* 与搜索框宽度一致 */
  border-radius: 12px; /* 四个角平滑 */
  margin: 20px 0; /* 上下间距 */
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1); /* 添加轻微阴影效果 */
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 每行四个 */
  gap: 25px; /* 卡片间的间距，可调整 */
}
</style>

