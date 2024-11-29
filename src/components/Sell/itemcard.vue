<script setup>
import { useRouter } from 'vue-router';
import axios from "@/axios_client/index.js";
import {onMounted, ref, reactive, computed} from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router/index.js";
const props = defineProps({
  id: String
})

onMounted(() => {
  axios.get('/item', {
    params: {
      id: props.id
    }
  }).then(res => {

  }).catch(err => {

  })
})
</script>

<template>
<div class = "block-for-detail">
  <div class = "itemname">
  <p>{{itemname}}</p>
  </div>
  <div class = "price">
  <p>￥{{price}}</p>
  </div>
  <div class = "description">
  <p>{{description}}</p>
  </div>
  <div class = "block-for-comment">
    <div class = "message">
      <p>{{message}}</p>
    </div>
  </div>


</div>


</template>

<style scoped>

</style>