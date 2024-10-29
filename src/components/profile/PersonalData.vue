<script setup>
  import { ref } from "vue";

  // 组件事件与属性定义
  const props = defineProps({
    username: String,
    email: String,
    student_id: String,
    contact: String,
    facauty: String, // 院系
    dormitory: String,
  });

  const emits = defineEmits([
    "updateSuccess",
  ])

  // 组件全局变量定义

</script>

<template>
  <div class="personal-data-container">

  </div>
</template>

<style scoped>

</style>
