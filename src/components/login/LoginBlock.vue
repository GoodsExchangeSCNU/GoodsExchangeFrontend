<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

import axios from "axios";
import router from "@/router/index.js";

import PatternCheck from "@/utils/pattern.js";

const { t, locale } = useI18n(); // 解构出t函数和locale属性
// t函数用于获取当前语言环境下的文本；locale属性用于获取当前语言环境

const form = reactive({
  username:"",
  password:"",
}) // 创建响应式对象，作为登录和注册时的表单数据

const handleLoginClick = () => {
  /**
   * 处理登录按钮点击事件
   */
  if(form.username === "" || form.password === "" || form.verifyPassword === ""){
    // 如果用户名或密码为空，则提示用户输入
    ElMessage.error(t("login.input_empty"))
    return;
  }

  let username_res = PatternCheck.username_check(form.username)
  let password_res = PatternCheck.password_check(form.password)
  if (!username_res.valid){
    ElMessage.error(t(username_res.error))
    return;
  }
  if (!password_res.valid){
    ElMessage.error(t(password_res.error))
    return;
  }

  axios.post("/user/login",{
    username: form.username,
    password: form.password,
  }).then(res => {
    if(res.status === 200){
      // 请求成功保存返回的token数据并跳转到首页
      ElMessage.success(t("login.login_success"))
      localStorage.setItem("token",res.data.access)
      localStorage.setItem("refresh",res.data.refresh)
      router.push("/home")
    }
    else{
      // login登录API未自定义返回状态码，HTTP状态码非200时表示登录失败
      ElMessage.error(t("login.login_failed"))
    }
  }).catch(res => {
    console.log(res)
    ElMessage.error(t("login.login_failed"))
  })
}

const resetForm = () => {
  form.username = ""
  form.password = ""
}
</script>

<template>
  <el-card style="max-width: 350px">
    <el-form
        :model="form"
        label-width="auto"
    >
      <el-form-item :label="t('login.username_input')">
        <el-input v-model="form.username"/>
      </el-form-item>
      <el-form-item :label="t('login.password_input')">
        <el-input v-model="form.password" type="password"/>
      </el-form-item>
    </el-form>
    <div class="login-button">
      <el-button type="primary" @click="handleLoginClick">{{t('login.login_button')}}</el-button>
      <el-button type="primary" @click="resetForm">{{t('login.reset_button')}}</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.login-button {
  display: flex;
  justify-content: center;
}
</style>