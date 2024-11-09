<script setup>
import { onMounted, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { RefreshRight, Search } from "@element-plus/icons-vue";
import WebSocketService from "@/socket_client/socket.js";

// 组件全局变量定义
const { t } = useI18n();
let avatar_char = computed(() => localStorage.getItem("username").slice(0, 2).toUpperCase());
let username = ref(localStorage.getItem("username"));
let search_input = ref("");
let roomList = ref([]);

// 组件全局函数定义
const handleChatroomList = (data) => {
  if (data.chatroomlist) {
    roomList.value = data.chatroomlist;
  }
};
WebSocketService.on("FetchChatroomlist", handleChatroomList);

onMounted(() => {
  WebSocketService.fetchAllChatrooms();
});

const fetch_room_list = () => {
  WebSocketService.fetchAllChatrooms();
};

const search_click = () => {
  console.log(search_input.value);
};
</script>

<template>
  <div class="basic-container">
    <div class="center-container">
      <div class="whole-chatroom-container">
        <div class="left-container">
          <div class="info-block">
            <div class="avatar-info">
              <el-avatar :size="80" shape="square" class="avatar">{{avatar_char}}</el-avatar>
              <h3>{{username}}</h3>
            </div>
            <div class="contact-search">
              <el-input v-model="search_input" style="width: 240px" :placeholder="t('chatroom.search_input_placeholder')">
                <template #prepend>
                  <el-button :icon="Search" @click="search_click"/>
                </template>
              </el-input>
            </div>
          </div>
          <div class="chat-room-list-block">
            <div class="room-list-top-bar">
              <p>{{t('chatroom.chat_room_top_bar')}}</p>
              <div class="gap" />
              <el-icon @click="fetch_room_list"><RefreshRight /></el-icon>
            </div>
            <div class="room-list">
              <el-scrollbar height="600px" class="room-list-scrollbar">
                <div v-for="room in roomList" :key="room.room_id">
                  <el-card>
                    <el-avatar :size="40" shape="square" class="small_avatar">{{room.seller.slice(0, 2).toUpperCase()}}</el-avatar>
                    <p>{{room.seller}}</p>
                    <el-button type="primary">{{t('chatroom.enter_chatroom')}}</el-button>
                  </el-card>
                </div>
              </el-scrollbar>
            </div>
          </div>
        </div>
        <div class="gap-block"></div>
        <div class="right-container">
          <div class="communicator-info-block">

          </div>
          <div class="chat-message-display-block">

          </div>
          <div class="input-block">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.basic-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: #CAD9F1;
}

.center-container{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  max-width: 1200px;
  min-width: 1200px;
  margin-top: 50px;
}

.whole-chatroom-container {
  width: 100%;
  height: 900px;
  display: grid;
  grid-template-columns: 28% 2% 70%;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.left-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.right-container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.1);
}

.info-block {
  display: flex;
  background-color: #a1c9ee;
  border-radius: 5px;
  flex-direction: column;
  width: 100%;
}

.avatar-info {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-top: 10px;
}

.avatar {
  font-size: 40px;
  background-color: #9c9ea1;
  color: #ffffff;
}

.small_avatar {
  font-size: 20px;
  background-color: #9c9ea1;
  color: #ffffff;

}

h3 {
  font-size: 20px;
  font-weight: bold;
  margin-left: 5px;
}

.contact-search {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 15px;
  margin-bottom: 10px;
}

.room-list-top-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: #e8e8e8;
  border-radius: 5px;
}

.room-list-top-bar p {
  font-size: 15px;
  font-weight: bold;
  margin-left: 10px;
}

.room-list-top-bar .gap {
  flex: 1;
}

.room-list-top-bar .el-icon {
  margin-right: 10px;
}

.room-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
}

.room-list-scrollbar {
  margin-left: 10px;
  margin-right: 10px;
  height: 600px;
}
</style>
