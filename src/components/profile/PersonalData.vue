<script setup>
  import { onMounted, ref, reactive} from "vue";
  import { useI18n } from "vue-i18n";

  // 组件事件与属性定义
  const props = defineProps({
    username: String,
    email: String,
    student_id: String,
    contact: String,
    facauty: String, // 院系
    dormitory: String,
    componentKey: Number,
  });

  const emits = defineEmits([
    "updateSuccess",
  ])

  // 组件全局变量定义
  const { t } = useI18n(); // 解构出t函数，t函数用于获取当前语言环境下的文本
  let isEdit = ref(false); // 是否进入个人信息编辑状态

  const origin_form = reactive({
    username: "",
    email: "",
    student_id: "",
    contact: "",
    facauty: "",
    dormitory: "",
  })

  const modify_form = reactive({
    username: "",
    email: "",
    student_id: "",
    contact: "",
    facauty: "",
    dormitory: "",
  })

  // 组件全局函数定义
  onMounted(() => {
    origin_form.username = props.username
    origin_form.email = props.email
    origin_form.student_id = props.student_id
    origin_form.contact = props.contact
    origin_form.facauty = props.facauty
    origin_form.dormitory = props.dormitory

    modify_form.username = props.username
    modify_form.email = props.email
    modify_form.student_id = props.student_id
    modify_form.contact = props.contact
    modify_form.facauty = props.facauty
    modify_form.dormitory = props.dormitory
  });

  const handleEdit = () => {
    isEdit.value = true
  }

  const handleSave = () => {
    isEdit.value = false
  }

  const handleCancel = () => {
    isEdit.value = false
    modify_username.value = origin_username.value
    modify_email.value = origin_email.value
    modify_student_id.value = origin_student_id.value
    modify_contact.value = origin_contact.value
    modify_facauty.value = origin_facauty.value
    modify_dormitory.value = origin_dormitory.value
  }
</script>

<template>
  <div class="personal-data-container">
    <div class="personal-data-title">
      <h2>{{ t("profile.personal_data_title") }}</h2>
    </div>
    <div class="profile-data-functional-block">
      <div v-if="isEdit">
        <el-button type="primary" @click="handleSave">{{ t("profile.save_button") }}</el-button>
        <el-button @click="handleCancel">{{ t("profile.cancel_button") }}</el-button>
      </div>
      <div v-else>
        <el-button type="primary" @click="handleEdit">{{ t("profile.edit_button") }}</el-button>
      </div>
    </div>
    <div class="profile-detail-block">
      <div v-if="isEdit" class="edit-selector">

      </div>
      <div v-else class="edit-selector">
        <el-form :model="origin_form" label-position="top">
          <el-form-item :label="t('profile.username')">
            <el-input v-model="origin_form.username" disabled/>
          </el-form-item>
          <el-form-item :label="t('profile.email')">
            <el-input v-model="origin_form.email" disabled/>
          </el-form-item>
          <el-form-item :label="t('profile.student_id')">
            <el-input v-model="origin_form.student_id" disabled/>
          </el-form-item>
          <el-form-item :label="t('profile.contact')">
            <el-input v-model="origin_form.contact" disabled/>
          </el-form-item>
          <el-form-item :label="t('profile.facauty')">
            <el-input v-model="origin_form.facauty" disabled/>
          </el-form-item>
          <el-form-item :label="t('profile.dormitory')">
            <el-input v-model="origin_form.dormitory" disabled/>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.personal-data-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.personal-data-title {
  width: 100%;
  display: flex;
  justify-content: center;
}

.profile-data-functional-block {
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
}

.personal-data-title h2 {
  font-size: 28px;
  font-weight: 800;
  margin-top: 20px;
  margin-bottom: 20px;
}

.profile-detail-block {
  margin-top: 5%;
  margin-left: 15%;
  margin-right: 15%;
  width: 70%;
}

.edit-selector {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
