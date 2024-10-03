<script setup>
import { ref } from 'vue'

let activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  /**
   * 处理菜单选择事件
   * @param {string} key 被选中菜单项的index e.g. '1'
   * @param {string} keyPath 被选中菜单项的index路径 e.g. ['2', '2-1']
   */
  console.log(key, keyPath)
}
</script>

<template>
  <el-menu
      :default-active="activeIndex"
      class="navigation-bar"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
  >
    <el-menu-item index="1">Processing Center</el-menu-item>
    <el-menu-item index="2">Info</el-menu-item>
    <el-menu-item index="3">Orders</el-menu-item>
  </el-menu>
</template>

<style>

</style>
