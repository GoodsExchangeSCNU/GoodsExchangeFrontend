<script setup>
import {ref, defineProps, onMounted} from "vue";
import {useI18n} from "vue-i18n";
import router from "@/router/index.js";
import axios from "@/axios_client/index.js";
import FormatObject from "@/utils/format.js";
import StateIcon from "@/components/profile/StateIcon.vue";
import { Picture, Loading } from "@element-plus/icons-vue";

// 组件全局属性事件定义
const props = defineProps({
  isSell: Boolean
})

// 组件全局变量定义
const backend_tableData = ref([]);
const { t } = useI18n();
let tableData = ref([]);
let viewerVisible = ref(false);
let picture_list_data = ref([]);

// 组件全局函数定义
const handleGoSell = () => {
  router.push('/sell')
}

const handleGoBuy = () => {
  router.push('/home')
}

function sellInfoAxios() {
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

function purchaseInfoAxios() {
  axios.get('/user/record/buy').then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        backend_tableData.value = res.data.data
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

function tableInfoRefresh() {
  if (props.isSell) {
    sellInfoAxios()
  }
  else {
    purchaseInfoAxios()
  }
}

const event_change_reject = (trade_id) => {
  console.log('reject')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 4
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('拒绝交易成功')
        tableInfoRefresh()
      } else {
        console.warn('拒绝交易失败')
      }
    } else {
      console.warn('拒绝交易失败')
    }
  }).catch(res => {
    console.warn('拒绝交易失败')
    console.warn(res)
  })
}

const event_change_purchase = (trade_id) => {
  console.log('purchase')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 2
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('购买请求成功')
        tableInfoRefresh()
      } else {
        console.warn('购买请求失败')
      }
    } else {
      console.warn('购买请求失败')
    }
  }).catch(res => {
    console.warn('购买请求失败')
    console.warn(res)
  })
}

const event_change_withdrawn = (trade_id) => {
  console.log('withdrawn')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 0
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('撤销交易成功')
        tableInfoRefresh()
      } else {
        console.warn('撤销交易失败')
      }
    } else {
      console.warn('撤销交易失败')
    }
  }).catch(res => {
    console.warn('撤销交易失败')
    console.warn(res)
  })
}

const event_change_shipped = (trade_id) => {
  console.log('shipped')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 6
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('确认发货成功')
        tableInfoRefresh()
      } else {
        console.warn('确认发货失败')
      }
    } else {
      console.warn('确认发货失败')
    }
  }).catch(res => {
    console.warn('确认发货失败')
    console.warn(res)
  })
}

const event_change_agree = (trade_id) => {
  console.log('agreed')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 3
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('同意交易成功')
        tableInfoRefresh()
      } else {
        console.warn('同意交易失败')
      }
    } else {
      console.warn('同意交易失败')
    }
  }).catch(res => {
    console.warn('同意交易失败')
    console.warn(res)
  })
}

const event_change_not_received = (trade_id) => {
  console.log('not_received')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 3
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('确认未发货成功')
        tableInfoRefresh()
      } else {
        console.warn('确认未发货失败')
      }
    } else {
      console.warn('确认未发货失败')
    }
  }).catch(res => {
    console.warn('确认未发货失败')
    console.warn(res)
  })
}

const event_change_completed = (trade_id) => {
  console.log('completed')
  axios.put("/trade/update", {
    trade_id: trade_id,
    state: 5
  }).then(res => {
    if (res.status === 200) {
      if (res.data.code === 0) {
        console.log('确认收货成功')
        tableInfoRefresh()
      } else {
        console.warn('确认收货失败')
      }
    } else {
      console.warn('确认收货失败')
    }
  }).catch(res => {
    console.warn('确认收货失败')
    console.warn(res)
  })
}

const imageViewerVisible = (data_index) => {
  picture_list_data.value = tableData.value[data_index].picture_list
  viewerVisible.value = true
}

onMounted(() => {
  tableInfoRefresh()
})
</script>

<template>
  <div class="tableInfo-pictureViewer">
    <el-table :data="tableData" stripe border style="width: 100%" scrollbar-always-on>
      <el-table-column fixed prop="name" :label="t('saleInfo.name_col_table')" width="100" sortable/>
      <el-table-column prop="picture" :label="t('saleInfo.picture_col_table')" width="200" sortable>
        <template #default="scope">
          <div class="image-preview">
            <el-image
                style="width: 150px; height: 100px"
                :src="scope.row.picture"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                fit="cover"
                @click="imageViewerVisible(scope.$index)"
            >
              <template #error>
                <div class="image-slot">
                  <el-icon><Picture /></el-icon>
                  <div>{{t("saleInfo.picture_load_failed")}}</div>
                </div>
              </template>
              <template #placeholder>
                <div class="image-slot">
                  <el-icon><Loading /></el-icon>
                  <div>{{t("saleInfo.picture_on_loading")}}</div>
                </div>
              </template>
            </el-image>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="price" :label="t('saleInfo.price_col_table')" width="100" sortable/>
      <el-table-column prop="buyer" :label="t('saleInfo.buyer_col_table')" width="100" sortable/>
      <el-table-column prop="seller" :label="t('saleInfo.seller_col_table')" width="100" sortable/>
      <el-table-column prop="id" :label="t('saleInfo.id_col_table')" width="100" sortable/>
      <el-table-column fixed="right" prop="state" :label="t('saleInfo.state_col_table')" width="150" sortable>
        <template #default="scope">
          <StateIcon :state="scope.row.state" />
        </template>
      </el-table-column>
      <el-table-column fixed="right" prop="operation" :label="t('saleInfo.operation_col_table')" width="300" sortable>
        <template #default="scope">
          <template v-if="scope.row.state === 0">
            <div>{{t("sellInfo.event_operation_None")}}</div>
          </template>
          <template v-if="(scope.row.state === 1) && (props.isSell)">
            <el-button @click="event_change_reject(scope.row.id)" type="danger">{{t("saleInfo.event_operation_reject")}}</el-button>
          </template>
          <template v-if="(scope.row.state === 1) && (!props.isSell)">
            <el-button @click="event_change_purchase(scope.row.id)" type="success">{{t("saleInfo.event_operation_purchase")}}</el-button>
            <el-button @click="event_change_withdrawn(scope.row.id)" type="info">{{t("saleInfo.event_operation_withdrawn")}}</el-button>
          </template>
          <template v-if="(scope.row.state === 2) && (props.isSell)">
            <el-button @click="event_change_reject(scope.row.id)" type="danger">{{t("saleInfo.event_operation_reject")}}</el-button>
            <el-button @click="event_change_agree(scope.row.id)" type="success">{{t("saleInfo.event_operation_agree")}}</el-button>
          </template>
          <template v-if="(scope.row.state === 2) && (!props.isSell)">
            <el-button @click="event_change_withdrawn(scope.row.id)" type="info">{{t("saleInfo.event_operation_withdrawn")}}</el-button>
          </template>
          <template v-if="(scope.row.state === 3) && (props.isSell)">
            <el-button @click="event_change_shipped(scope.row.id)" type="primary">{{t("saleInfo.event_operation_shipped")}}</el-button>
          </template>
          <template v-if="(scope.row.state === 3) && (!props.isSell)">
            <div>{{t("saleInfo.event_operation_None")}}</div>
          </template>
          <template v-if="scope.row.state === 4">
            <div>{{t("saleInfo.event_operation_None")}}</div>
          </template>
          <template v-if="scope.row.state === 5">
            <div>{{t("saleInfo.event_operation_None")}}</div>
          </template>
          <template v-if="(scope.row.state === 6) && (props.isSell)">
            <div>{{t("saleInfo.event_operation_None")}}</div>
          </template>
          <template v-if="(scope.row.state === 6) && (!props.isSell)">
            <el-button @click="event_change_not_received(scope.row.id)" type="danger">{{t("saleInfo.event_operation_not_received")}}</el-button>
            <el-button @click="event_change_completed(scope.row.id)" type="success">{{t("saleInfo.event_operation_received")}}</el-button>
          </template>
        </template>
      </el-table-column>
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
    <el-image-viewer
        v-if="viewerVisible"
        :close-on-press-escape="true"
        :initial-index="0"
        :infinite="true"
        :z-index="2000"
        :url-list="picture_list_data"
        @close="viewerVisible = false" />
  </div>
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
