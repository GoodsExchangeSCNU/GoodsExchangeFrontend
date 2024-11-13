<script setup>
import { ref } from 'vue';
import data from 'emoji-mart-vue-fast/data/all.json';
import 'emoji-mart-vue-fast/css/emoji-mart.css';
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src';

// 定义 i18n 配置
const emojiI18n = {
  search: '搜索',
  notfound: '没有找到表情',
  categories: {
    search: '搜索结果',
    recent: '经常使用',
    smileys: '表情与情感',
    people: '人物与身体',
    nature: '动物与自然',
    foods: '食物与饮料',
    activity: '活动',
    places: '旅行与地理',
    objects: '物品',
    symbols: '符号标志',
    flags: '旗帜',
    custom: '自定义',
  }
};

const emojiIndex = new EmojiIndex(data);
const showEmojiPicker = ref(false); // 控制表情选择器的显示状态
const inputText = ref(''); // 绑定文本输入框的内容

// 处理选择表情
const handleEmoji = (emoji) => {
  inputText.value += emoji.native; // 将表情的 Unicode 字符添加到输入框内容中
};

// 切换表情选择器的显示状态
const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value;
};
</script>

<template>
  <div class="text-editor">
    <!-- 文本输入框 -->
    <textarea
        v-model="inputText"
        placeholder="请输入消息..."
        rows="4"
        class="text-input"
    ></textarea>

    <!-- 表情选择器按钮 -->
    <button @click="toggleEmojiPicker" class="emoji-button">😊 表情</button>

    <!-- 表情选择器，使用 v-if 控制显示状态 -->
    <div v-if="showEmojiPicker" class="emoji-picker">
      <Picker
          :data="emojiIndex"
          :emojiSize="18"
          :showPreview="false"
          :infiniteScroll="false"
          :i18n="emojiI18n"
          set="apple"
          @select="handleEmoji"
      />
    </div>
  </div>
</template>

<style scoped>
.text-editor {
  position: relative;
  max-width: 500px;
  margin: 0 auto;
}

.text-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
}

.emoji-button {
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

.emoji-picker {
  position: absolute;
  bottom: 60px;
  left: 0;
  right: 0;
  z-index: 100;
}
</style>
