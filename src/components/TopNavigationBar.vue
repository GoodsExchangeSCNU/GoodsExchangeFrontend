<script setup>
import {onMounted, onBeforeUnmount, ref, computed, watch, nextTick} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ElMessage } from "element-plus";

import axios from "axios";

// 组件全局变量定义
const { t, locale } = useI18n(); // 解构出t函数和locale属性
// t函数用于获取当前语言环境下的文本；locale属性用于获取当前语言环境
const router = useRouter(); // 创建 router 实例，用于路由跳转
const username = ref('') // 从后端获取的用户名
const avatar_char = computed(() => {
  return username.value.slice(0, 2).toUpperCase(); // 用户名前两位字符大写作为头像
}); // 头像内字符

// 组件全局函数定义
const handleSelect = (key, keyPath) => {
  /**
   * 处理菜单选择事件
   * @param {string} key 被选中菜单项的index e.g. ['1']
   * @param {string} keyPath 被选中菜单项的index路径 e.g. ['2', '2-1']
   */
  const routes = {
    // 菜单项对应的路由
    ['1']: '/home',
    ['2']: '/sell',
    ['3']: '/message',
    ['4']: '/profile'
  };

  if (routes[key]) {
    router.push(routes[key]); // 导航到相应的路由
  }
  if (keyPath[1] === '6-1') {
    // 退出登录
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    router.push('/login');
  }
  else if (keyPath[1] === '6-2') {
    // 跳转到个人信息页面
    router.push('/profile');
  }
}

const change_language = () => {
  /**
   * 全应用范围内切换语言
   */
  if (locale.value === 'en') {
    locale.value = 'zh'
  } else {
    locale.value = 'en'
  }
}


watch(username, async (newVal) => {
  /**
   * 监控 username 的变化，当 username 变化时更新头像
   */
  await nextTick(); // 确保 DOM 更新
  console.log('Username updated:', newVal);
});

const handleStorageChange = (event) => {
  /**
   * 处理localStorage变化，监听token的变化，以及时请求数据来更新avatar
   */
  if (event.key !== 'token') {
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) {
        username.value = res.data.data.username
      }
      else {
        ElMessage.error(t('navigator.username_error'))
        username.value = '??'
      }
    }).catch(err => {
      console.log(err)
      ElMessage.error(t('navigator.username_error'))
      username.value = '??'
    })
  }
}

onMounted(() => {
  /**
   * 组件挂载时初始化
   */
  window.addEventListener('storage', handleStorageChange); // 监听localStorage变化，当token变化时更新用户名以更新avatar
  if (localStorage.getItem('token') === null) {
    // 未登录
    username.value = '??'
  }
  else {
    axios.get('/user/info').then(res => {
      if (res.data.code === 0) {
        // 获取用户名
        username.value = res.data.data.username
      }
      else {
        // 获取用户名失败
        ElMessage.error(t('navigator.username_error'))
        username.value = '??'
      }
    }).catch(err => {
      // 请求失败
      console.log(err)
      ElMessage.error(t('navigator.username_error'))
      username.value = '??'
    })
  }
})

onBeforeUnmount(() => {
  /**
   * 组件卸载时清理
   */
  window.removeEventListener('storage', handleStorageChange); // 移除监听
});
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
    <el-sub-menu index="6">
      <template #title>
        <el-avatar>{{ avatar_char }}</el-avatar>
      </template>
      <el-menu-item index="6-1">{{ t("navigator.logout")}}</el-menu-item>
      <el-menu-item index="6-2">{{ t("navigator.personal_info")}}</el-menu-item>
    </el-sub-menu>
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
