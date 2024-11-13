<script setup>
import {defineProps, onMounted, onUnmounted, ref} from 'vue'
import WebSocketService from "@/socket_client/socket.js";

// 组件全局属性事件定义
const props = defineProps({
  item_id: String,
  room_id: String,
  key: Number,
})

// 组件全局变量定义
let chatMessage = ref([]);

// 组件全局函数定义
const handleChatMessage = (data) => {
  console.log(data);
  if (data.history_messages) {
    chatMessage.value = data.history_messages;
  }
};

const handleReceiveMessage = (data) => {
  if (data.data) {
    if (data.data.room_id === props.room_id) {
      let temp_message_obj = {
        sender: data.data.sender,
        content: data.data.content,
      }
      chatMessage.value.push(temp_message_obj);
    }
  }
};

onMounted(() => {
  WebSocketService.fetchMessage(props.room_id);
  WebSocketService.on("FetchMessage", handleChatMessage);
  WebSocketService.on("ReceiveMessage", handleReceiveMessage);
})

onUnmounted(() => {
  WebSocketService.off("FetchMessage", handleChatMessage);
  WebSocketService.off("ReceiveMessage", handleReceiveMessage);
})
</script>

<template>
  <div class="chat-message-component">

  </div>
</template>

<style scoped>

</style>