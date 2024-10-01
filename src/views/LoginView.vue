<script setup>
import { reactive } from "vue";
import { useI18n } from "vue-i18n";
import { ElMessage } from "element-plus";

import axios from "axios";
import router from "@/router/index.js";

const { t, locale } = useI18n(); // 解构出t函数和locale属性
// t函数用于获取当前语言环境下的文本；locale属性用于获取当前语言环境

const form = reactive({
  username:"",
  password:"",
  verifyPassword:""
}) // 创建响应式对象，作为登录和注册时的表单数据

const change = () => {
  /**
   * 切换语言环境
   */
  locale.value = locale.value === "en" ? "zh" : "en";
}

const handleLoginClick = () => {
  /**
   * 处理登录按钮点击事件
   */
  if(form.username === "" || form.password === "" || form.verifyPassword === ""){
    // 如果用户名或密码为空，则提示用户输入
    ElMessage.error(t("login.input_empty"))
    return;
  }

  else if (form.password !== form.verifyPassword){
    // 如果两次输入的密码不一致，则提示用户
    ElMessage.error(t("login.password_not_match"))
    return;
  }

  axios.post("/user/login",{
    username: form.username,
    password: form.password,
    confirm_password: form.verifyPassword
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

const handleRegisterClick = () => {
  /**
   * 处理注册按钮点击事件
   */
  if(form.username === "" || form.password === "" || form.verifyPassword === ""){
    // 如果用户名或密码为空，则提示用户输入
    ElMessage.error(t("login.input_empty"))
  }
  else if (form.password !== form.verifyPassword){
    // 如果两次输入的密码不一致，则提示用户
    ElMessage.error(t("login.password_not_match"))
  }

  axios.post("/user/register",{
    username: form.username,
    password: form.password,
    confirm_password: form.verifyPassword
  }).then(res => {
    if(res.status === 200){
      // 请求成功根据返回的code判断注册是否成功
      if (res.data.code === 101){
        // 如果返回的code为101，则表示用户已存在
        ElMessage.error(t("login.user_exist"))
      }
      else if (res.data.code === 102){
        // 如果返回的code为102，则表示因其他错误导致注册失败
        ElMessage.success(t("login.register_failed"))
      }
      else if (res.data.code === 0){
        // 注册成功
        ElMessage.success(t("login.register_success"))
      }
    }
    else{
      ElMessage.error(t("login.register_failed"))
    }
  }).catch(res => {
    console.log(res)
    ElMessage.error(t("login.register_failed"))
  })
}
</script>

<template>
  <el-button @click="change">{{ t("login.language_button") }}</el-button>
  <el-card style="width: 350px; margin: 100px auto">
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
      <el-form-item>
        <el-button type="primary" @click="handleLoginClick">{{t('login.login_button')}}</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>

</style>