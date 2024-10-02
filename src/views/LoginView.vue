<script setup>
import { ref } from 'vue'
import { useI18n } from "vue-i18n";

import RegisterBlock from '@/components/login/RegisterBlock.vue'
import LoginBlock from '@/components/login/LoginBlock.vue'

const { t, locale } = useI18n(); // 解构出t函数和locale属性
// t函数用于获取当前语言环境下的文本；locale属性用于获取当前语言环境

let slide_tip = false
let ref_style = ref({
  transform: 'translateX(0%)'
})
let show_change = ref(false)
let loading_tip = ref(false)

function loading_seconds(seconds) {
  setTimeout(function () {
    loading_tip.value = false
  }, seconds * 1000);
}

function waiting_change(seconds) {
  setTimeout(function () {
    show_change.value = !show_change.value
  }, seconds * 1000)
}

const change_style = () => {
  loading_tip.value = true
  waiting_change(0.2)
  slide_tip = !slide_tip
  ref_style.value.transform = slide_tip ? 'translateX(80%)' : 'translateX(0%)'

  loading_seconds(0.4)
}
</script>

<template>
  <div class="center-container">
    <div class="slogan-container">
      <div class="slogan">Buy or sell second-hand goods</div>
      <div class="slogan">Go on GoodsExchange!!!!!!!!!!</div>
    </div>
    <div class="functional-container">
      <div class="form-box" :style="ref_style" v-loading=loading_tip element-loading-background="#83A7EA">
        <div class="register-box" v-show=show_change>
          <h1>register</h1>
          <RegisterBlock />
        </div>
        <div class="login-box" v-show=!show_change>
          <h1>login</h1>
          <LoginBlock />
        </div>
      </div>
      <!-- 左右显示内容 -->
      <div class="con-box left">
        <h2>{{ t("login.welcome") }}
          <div><span>{{ t("login.website_name") }}</span></div>
        </h2>
        <p> </p>
        <img src="@\assets\login_img.jpg" alt="Website icon">
        <p>{{ t("login.has_account") }}</p>
        <button id="login" @click="change_style">{{ t("login.go_login") }}</button>
      </div>
      <div class="con-box right">
        <h2>{{ t("login.welcome") }}
          <div><span>{{ t("login.website_name") }}</span></div>
        </h2>
        <p> </p>
        <img src="@\assets\login_img.jpg" alt="Website icon">
        <p>{{ t("login.no_account") }}</p>
        <button id="register" @click="change_style">{{ t("login.go_register") }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.slogan-container {
  display: flex;
  flex-direction: column;
  margin: auto 5% auto auto;
}

.slogan {
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 20px;
  background: #8e9aaf;
  -webkit-background-clip: text;
  color: transparent;
  text-align: center;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  animation: pulse 2s infinite;
}

/* 定义渐变颜色的动画 */
@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.center-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #CAD9F1;
}

.functional-container {
  background-color: #ffffff;
  margin: auto auto auto 5%;
  width: 650px;
  height: 415px;
  border-radius: 5px;
  /* 阴影 */
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
  /* 相对定位 */
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.form-box {
  /* 绝对定位 */
  position: absolute;
  top: -10%;
  left: 5%;
  background-color: #83A7EA;
  width: 320px;
  height: 500px;
  border-radius: 5px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  /* 动画过渡 加速后减速 */
  transition: 0.5s ease-in-out;
}


.register-box,
.login-box {
  /* 弹性布局 垂直排列 */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

h1 {
  text-align: center;
  margin-bottom: 25px;
  /* 大写 */
  text-transform: uppercase;
  color: #fff;
  /* 字间距 */
  letter-spacing: 5px;
}

.con-box {
  width: 50%;
  /* 弹性布局 垂直排列 居中 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* 绝对定位 居中 */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.con-box.left {
  left: -2%;
}

.con-box.right {
  right: -2%;
}

.con-box h2 {
  color: #8e9aaf;
  font-size: 25px;
  font-weight: bold;
  letter-spacing: 3px;
  text-align: center;
  margin-bottom: 4px;
}

.con-box p {
  font-size: 12px;
  letter-spacing: 2px;
  color: #8e9aaf;
  text-align: center;
}

.con-box span {
  color: #83A7EA;
}

.con-box img {
  width: 150px;
  height: 150px;
  opacity: 0.9;
  margin: 40px 0;
}

.con-box button {
  margin-top: 3%;
  background-color: #fff;
  color: #83A7EA;
  border: 1px solid #83A7EA;
  padding: 6px 10px;
  border-radius: 5px;
  letter-spacing: 1px;
  outline: none;
  cursor: pointer;
}

.con-box button:hover {
  background-color: #83A7EA;
  color: #fff;
}
</style>