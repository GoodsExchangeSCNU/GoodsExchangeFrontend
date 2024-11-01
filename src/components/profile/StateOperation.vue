<script setup>
import {ref, defineProps} from "vue";

// 组件全局属性事件定义
const props = defineProps({
  state: Number
})

// 组件全局变量定义

// 组件全局函数定义
</script>

<template>
  <div class="op-button-block">
    <div v-if="props.state === 0" class="active-op-state">

    </div>
    <div v-else-if="props.state === 1" class="active-op-state">

    </div>
    <div v-else-if="props.state === 2" class="active-op-state">

    </div>
    <div v-else-if="props.state === 3" class="active-op-state">

    </div>
    <div v-else-if="props.state === 4" class="active-op-state">

    </div>
    <div v-else-if="props.state === 5" class="active-op-state">

    </div>
    <div v-else-if="props.state === 6" class="active-op-state">

    </div>
  </div>
</template>

<style scoped>
.op-button-block {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>