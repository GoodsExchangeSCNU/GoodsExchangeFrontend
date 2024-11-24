<script setup>

  import {ref} from "vue";
  import { ElMessageBox, ElMessage } from "element-plus";
  import axios from "@/axios_client/index.js";
  import { useI18n } from "vue-i18n";  // 控制弹窗显示

  const soldItems = ref([
    {
      name: "二手书籍",
      price: "¥20",
      description: "几乎全新，适合备考使用。",
      image: "https://via.placeholder.com/100x100.png?text=Book",
    },
    {
      name: "运动鞋",
      price: "¥150",
      description: "轻微磨损，尺码42。",
      image: "https://via.placeholder.com/100x100.png?text=Shoes",
    },
    {
      name: "电子产品",
      price: "¥800",
      description: "二手手机，功能完好。",
      image: "https://via.placeholder.com/100x100.png?text=Phone",
    },
  ]);
  const showDialog = ref(false);
  const { t , locale } = useI18n();
  // 商品信息绑定变量
  const form = ref({
  itemname: "",
  price: "",
  description: "",
  image: null,
  count:""
});

  // 打开弹窗
  const handleAddClick = () => {
  showDialog.value = true;
};

  // 处理图片上传
  const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
  form.value.image = file;
}
};

  // 提交商品信息
  const handleSubmit = () => {
  console.log("提交商品信息:", form.value);
  ElMessage({
  message: "商品信息提交成功！",
  type: "success",
});
  showDialog.value = false;
};
const submit = () => {
  axios.post("/item", {
    name: form.value.itemname,
    description:form.value.description ,
    count: form.value.count,
    img: form.value.image, // multiple
    price: form.value.price
  }).then((res) => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        ElMessage.success(t('sell.item_info_upload_success'))
      }
      else {
        ElMessage.warning(t('sell.item_info_upload_failed'))
      }
    }
    else {
      ElMessage.warning(t('sell.item_info_upload_failed'))
    }
  }).catch((res) => {
    ElMessage.warning(t('sell.item_info_upload_failed'))
    console.warn('请求出现异常')
  })
}
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <!-- 左侧商品列表 -->
      <div class="block-for-item">
        <h3>我卖过的商品</h3>
        <div class="item-list">
          <div v-for="(item, index) in soldItems" :key="index" class="item-card">
            <img :src="item.image" alt="商品图片" class="item-image" />
            <div class="item-info">
              <h4 class="item-name">{{ item.name }}</h4>
              <p class="item-price">价格: {{ item.price }}</p>
              <p class="item-description">{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 其他内容 -->
      <button class="add-button" @click="handleAddClick">+</button>
      <el-dialog v-model="showDialog" title="新增商品" width="400px">
        <div class="form-container">
          <el-input v-model="form.itemname" placeholder="请输入商品名称" />
          <el-input v-model="form.price" placeholder="请输入商品价格" />
          <el-input
              v-model="form.description"
              type="textarea"
              placeholder="请输入商品描述"
          />
          <input
              type="file"
              accept="image/*"
              @change="handleImageUpload"
              class="upload-input"
          />
        </div>
        <template #footer>
          <el-button @click="showDialog = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </div>
</template>



<style scoped>
.basic-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #CAD9F1;
}

.center-container {
  max-width: 1200px;
  min-width: 1200px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #CAD9F1;
}

 .add-button {
   position: fixed;
   bottom: 20px; /* 距离页面底部 20px */
   left: 50%; /* 水平居中 */
   transform: translateX(-50%); /* 修正水平居中偏移 */
   width: 60px;
   height: 60px;
   border-radius: 50%; /* 圆形 */
   background-color: #409eff; /* 按钮背景色 */
   color: white; /* 按钮文字颜色 */
   font-size: 30px; /* 字体大小 */
   border: none; /* 去掉边框 */
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 添加阴影 */
   cursor: pointer; /* 鼠标变为指针 */
   display: flex; /* 居中内容 */
   justify-content: center;
   align-items: center;
   transition: background-color 0.3s; /* 背景色变换过渡 */
 }

.add-button:hover {
  background-color: #66b1ff; /* 悬停背景色 */
}

.upload-input {
  display: block;
  margin-top: 10px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.block-for-item {
  position: absolute;
  top: 80px; /* 与 navigator-bar 的高度对齐 */
  left: 20px; /* 与页面左侧间距 */
  width: 300px; /* 固定宽度 */
  bottom: 20px; /* 与页面底部间距 */
  background-color: #fff; /* 背景色 */
  padding: 20px; /* 内部内容的边距 */
  border-radius: 12px; /* 边框圆角 */
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  overflow-y: auto; /* 启用滚动条 */
}
.item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.item-card {
  display: flex;
  gap: 10px;
  align-items: center;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-size: 14px;
  font-weight: bold;
}

.item-price {
  font-size: 12px;
  color: #409eff;
}

.item-description {
  font-size: 12px;
  color: #666;
}
</style>
