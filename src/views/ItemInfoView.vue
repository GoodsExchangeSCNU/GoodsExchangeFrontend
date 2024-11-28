<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
let search_item_id = ref(""); // 被用户点击的商品id

onMounted(() => {
  search_item.value = route.params.itemid;
});
</script>

<template>

</template>

<style scoped>

</style>