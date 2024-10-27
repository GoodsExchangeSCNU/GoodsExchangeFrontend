<script setup>
import {computed, onMounted, ref} from "vue";
import axios from "@/axios_client/index.js";
import {ElMessage} from "element-plus";
import { useI18n } from "vue-i18n";

// 组件全局变量定义
let username = ref("");
let email = ref("");
let student_id = ref("");
let contact = ref("");
let facauty = ref(""); // 院系
let dormitory = ref("");
let avatar_char = computed(() => username.value.slice(0, 2).toUpperCase());
const { t } = useI18n(); // 解构出t函数，t函数用于获取当前语言环境下的文本

// 组件全局函数定义
onMounted(() => {
  axios.get("/user/info").then(res => {
    if(res.status === 200){
      if (res.data.code === 0) {
        username.value = res.data.data.username;
        email.value = res.data.data.email;
        student_id.value = res.data.data.student_id;
        contact.value = res.data.data.contact;
        facauty.value = res.data.data.facauty;
        dormitory.value = res.data.data.dormitory;
      }
      else{
        console.warn("获取用户信息失败")
      }
    }
    else{
      console.warn("获取用户信息失败")
    }
  }).catch(res => {
    console.warn("获取用户信息失败")
    console.warn(res)
  })
});
</script>

<template>
  <div class="center-container">
    <div class="left-container">
      <div class="avatar-info">
        <el-avatar :size="100" shape="square" class="avatar">{{avatar_char}}</el-avatar>
        <h3>{{username}}</h3>
      </div>
      <div class="link-container">
        <div class="personal-info">
          <h4>{{t("profile.personal_info_title")}}</h4>
        </div>
      </div>
    </div>
    <div class="empty-container"></div>
    <div class="right-container">

    </div>
  </div>
</template>

<style scoped>
.center-container{
  display: flex;
  flex-direction: row;
  justify-content: flex-start; /* 水平居左 */
  align-items: flex-start; /* 垂直居上 */
  height: 100vh;
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 50px;
}

.avatar-info {
  display: flex;
  flex-direction: row;
  align-items: flex-start; /* 垂直居上 */
  margin-bottom: 50px;
}

.avatar {
  font-size: 40px;
  background-color: #79b7f8;
  color: #ffffff;
}

h3 {
  margin-left: 20px;
  font-size: 32px;
  font-weight: bold;
}

h4 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 5px;
  margin-left: 5px;
}

.left-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 水平居左 */
  align-items: flex-start; /* 垂直居上 */
  width: 23%;
  height: 100%;
}

.empty-container {
  width: 2%;
}

.right-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 水平居左 */
  align-items: flex-start; /* 垂直居上 */
  width: 75%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.link-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 水平居左 */
  align-items: flex-start; /* 垂直居上 */
}
</style>
