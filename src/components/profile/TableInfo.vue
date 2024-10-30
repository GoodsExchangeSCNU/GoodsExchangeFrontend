<script setup>
import {ref, defineProps, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router/index.js";
import axios from "@/axios_client/index.js";

import FormatObject from "@/utils/format.js";

// 组件全局属性事件定义
const props = defineProps({
  isSell: Boolean
})

// 组件全局变量定义
const backend_tableData = ref([]);
const { t } = useI18n();
let tableData = ref([]);

// 组件全局函数定义
const handleGoSell = () => {
  router.push('/sell')
}

const handleGoBuy = () => {
  router.push('/home')
}

onMounted(() => {
  if (props.isSell) {
    axios.get('/user/record/sell').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          backend_tableData.value = res.data.data
          tableData.value = FormatObject.formattedTransactionRecord(backend_tableData.value)
        } else {
          console.warn('获取销售记录失败')
        }
      } else {
        console.warn('获取销售记录失败')
      }
    }).catch(res => {
      console.warn('获取销售记录失败')
      console.warn(res)
    })
  }
  else {
    axios.get('/user/record/buy').then(res => {
      if (res.status === 200) {
        if (res.data.code === 0) {
          tableData.value = res.data.data
          tableData.value = FormatObject.formattedTransactionRecord(backend_tableData.value)
        } else {
          console.warn('获取购买记录失败')
        }
      } else {
        console.warn('获取购买记录失败')
      }
    }).catch(res => {
      console.warn('获取购买记录失败')
      console.warn(res)
    })
  }
})
</script>

<template>
  <el-table :data="tableData" stripe border style="width: 100%" scrollbar-always-on>
    <el-table-column fixed prop="name" label="Name" width="100" sortable/>
    <el-table-column prop="picture" label="Picture" width="200" sortable/>
    <el-table-column prop="price" label="Price" width="100" sortable/>
    <el-table-column prop="buyer" label="Buyer" width="100" sortable/>
    <el-table-column prop="seller" label="Seller" width="100" sortable/>
    <el-table-column prop="state" label="State" width="150" sortable/>
    <el-table-column fixed="right" prop="operation" label="Operation" width="200" sortable/>
    <template v-slot:empty>
      <div style="text-align: center; padding: 20px; color: #999;">
        <p>{{t('saleInfo.table_info_empty')}}</p>
      </div>
      <div class="empty-navigator">
        <el-button type="primary" @click="handleGoSell">{{t('saleInfo.navigator_to_sell')}}</el-button>
        <el-button type="primary" @click="handleGoBuy">{{t('saleInfo.navigator_to_buy')}}</el-button>
      </div>
    </template>
  </el-table>

</template>

<style scoped>
.empty-navigator {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
</style>