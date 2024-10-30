<script setup>
import { useI18n } from "vue-i18n";

// 组件全局变量定义
const { t } = useI18n();
</script>

<template>
  <div class="purchase-info-container">
    <div class="purchase-data-title">
      <h2>{{ t("profile.purchase_info_title") }}</h2>
    </div>
  </div>
</template>

<style scoped>
.purchase-info-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.purchase-data-title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.purchase-data-title h2 {
  font-size: 28px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>