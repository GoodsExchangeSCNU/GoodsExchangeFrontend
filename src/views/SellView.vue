<script setup>

  import { ref, reactive } from "vue";
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
  const form = reactive({
  itemname: "",
  price: 0,
  description: "",
  count: 0
});
  let formData  = new FormData()

  // 打开弹窗
  const handleAddClick = () => {
  showDialog.value = true;
};

  // 处理图片上传
  const handleImageUpload = (event) => {
    console.log(event.target.files)
    let file = event.target.files
    for(let i=0;i<file.length;i++) {
      formData.append('img', file[i])
    }
};

  // 提交商品信息
  const handleSubmit = () => {
  console.log("提交商品信息:", form);
  submit()
  form.price = 0
  form.itemname = ""
  form.count = 0
  form.description = ""
  formData = new FormData()
  showDialog.value = false
};

const submit = () => {
  formData.append('name', form.itemname)
  formData.append('description', form.description)
  formData.append('count', form.count)
  formData.append('price', form.price)
  axios.post("/item/", formData,{
    headers: {
      'content-type': 'multipart/form-data'
    }
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

const handleCloseDialog = () => {
  form.price = 0
  form.itemname = ""
  form.count = 0
  form.description = ""
  formData = new FormData()
  showDialog.value = false
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
      <!-- 右侧内容-->
      <div class="block-for-calendar">
        <div class = "Text-for-item">
        <h3>{{t('sell.Itemdetail')}}</h3>
        <div class="calendar" v-tooltip="calendarTooltip">
          <div class="calendar-header">
            <span>2024年 11月</span>
          </div>
          <div class="calendar-grid">
            <div class="day" v-for="(day, index) in daysInMonth" :key="index">{{ day }}</div>
          </div>
        </div>
          </div>
      </div>
      <!-- 其他内容 -->
      <button class="add-button" @click="handleAddClick">+</button>
      <el-dialog
          v-model="showDialog"
          title="新增商品"
          width="400px"
          @close="handleCloseDialog"
          @closed="handleCloseDialog"
      >
        <div class="form-container">
          <span>{{t('sell.name')}}</span>
          <el-input v-model="form.itemname" placeholder="请输入商品名称" />
          <span>{{t('sell.price')}}</span>
          <el-input v-model="form.price" placeholder="请输入商品价格" />
          <span>{{t('sell.number')}}</span>
          <el-input v-model="form.count" placeholder="请输入物品数量" />
          <span>{{t('sell.description')}}</span>
          <el-input
              v-model="form.description"
              type="textarea"
              placeholder="请输入商品描述"
          />
          <span>{{t('sell.img')}}</span>
          <input
              type="file"
              multiple
              name = "img"
              @change="handleImageUpload"
              class="upload-input"
          />
        </div>
        <template #footer>
          <el-button @click="handleCloseDialog">取消</el-button>
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
.block-for-calendar {
  width:800px;
  margin-left: 20px;
  background-color: #eef1f6;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  height: 90%; /* 保持与左侧一致 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.Text-for-item{
  text-align: center;
  font-size: 30px;

}

.calendar {
  position: relative;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  width: 100%;
  height: 80%;
}

.calendar-header {
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
  padding: 10px;
}

.day {
  padding: 10px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.day:hover {
  background-color: #d0e4fc;
  cursor: pointer;
}

/* 鼠标悬停时日历的浮动效果 */
.calendar:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
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
  margin-right: auto;
  top: 80px; /* 与 navigator-bar 的高度对齐 */
  left: 20px; /* 与页面左侧间距 */
  width: 300px; /* 固定宽度 */
  height:90%;
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
