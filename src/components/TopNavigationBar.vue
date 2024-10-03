<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import {useI18n} from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t, locale } = useI18n(); // 解构出t函数和locale属性
// t函数用于获取当前语言环境下的文本；locale属性用于获取当前语言环境
const router = useRouter(); // 创建 router 实例


const handleSelect = (key, keyPath) => {
  /**
   * 处理菜单选择事件
   * @param {string} key 被选中菜单项的index e.g. ['1']
   * @param {string} keyPath 被选中菜单项的index路径 e.g. ['2', '2-1']
   */
  console.log(key, keyPath)
  const routes = {
    ['1']: '/home',
    ['2']: '/sell',
    ['3']: '/message',
    ['4']: '/profile'
  };

  if (routes[key]) {
    router.push(routes[key]); // 导航到相应的路由
  }
}

const change_language = () => {
  if (locale.value === 'en') {
    locale.value = 'zh'
  } else {
    locale.value = 'en'
  }
}
</script>

<template>
  <el-menu
    default-active="activeIndex"
    :ellipsis=false
    class="navigation-bar"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
  >
    <el-menu-item index="0" disabled>
      <span class="logo_word"> GoodsExchange </span>
    </el-menu-item>
    <el-menu-item index="1">{{ t("navigator.home_page") }}</el-menu-item>
    <el-menu-item index="2">{{ t("navigator.sell_page") }}</el-menu-item>
    <el-menu-item index="3">{{ t("navigator.chat_page") }}</el-menu-item>
    <el-menu-item index="4">{{ t("navigator.personal_page") }}</el-menu-item>
    <el-menu-item index="5" @click="change_language">
      {{ t("navigator.change_language") }}
    </el-menu-item>
  </el-menu>
</template>

<style>
.el-menu--horizontal > .el-menu-item:nth-child(5) {
  margin-right: auto;
}

.el-menu-item.is-disabled {
  color: white !important;
  opacity: 1 !important;
}

.logo_word {
  font-size: 20px;
  font-weight: bold;
}
</style>
