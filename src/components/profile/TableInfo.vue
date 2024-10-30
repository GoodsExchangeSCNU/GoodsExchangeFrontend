<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";

// 组件全局变量定义
const tableData = ref([{
  name: 'Apple',
  picture: 'https://element-plus.gitee.io/zh-CN/element-plus/assets/logo.82b9c7a5.svg',
  price: 5,
  buyer: 'Tom',
  seller: 'Jerry',
  state: 'Sold'
}])
const { t } = useI18n();
</script>

<template>
  <el-table :data="tableData" stripe style="width: 100%">
    <el-table-column fixed prop="name" label="Name" width="150"/>
    <el-table-column prop="name" label="Picture" width="200"/>
    <el-table-column prop="price" label="Price" width="100"/>
    <el-table-column prop="buyer" label="Buyer" width="100"/>
    <el-table-column prop="seller" label="Seller" width="100"/>
    <el-table-column prop="state" label="State" width="150"/>
    <el-table-column fixed="right" prop="operation" label="Operation" width="200"/>
  </el-table>
</template>

<style scoped>

</style>