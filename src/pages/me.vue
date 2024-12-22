<template>
  <div class="center">
    <!-- 1.按照效果图编写个人中心页面结构 -->
    <div class="info-container">
      <el-row>
        <el-col :span="12">
          <p><strong>工号：</strong>{{ form.id }}</p>
          <p><strong>姓名：</strong>{{ form.name }}</p>
          <p><strong>性别：</strong>{{ form.gender }}</p>
          <p><strong>电话：</strong>{{ form.phone }}</p>
          <p><strong>籍贯：</strong>{{ form.hometown }}</p>
          <p><strong>部门：</strong>{{ form.department }}</p>
        </el-col>
        <el-col :span="12">
          <p><strong>出生日期：</strong>{{ form.birthday }}</p>
          <p><strong>邮箱：</strong>{{ form.email }}</p>
          <p><strong>学历：</strong>{{ form.education }}</p>
          <p><strong>职务：</strong>{{ form.position }}</p>
          <p><strong>入职时间：</strong>{{ form.hireDate }}</p>
          <p><strong>备注：</strong>{{ form.remark }}</p>
        </el-col>
      </el-row>
      <div class="buttons">
        <el-button type="primary" @click="editInfo">修改</el-button>
        <el-button type="success" @click="goBack">返回</el-button>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog title="修改个人信息" v-model="dialogVisible" width="50%">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="form.phone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="籍贯" prop="hometown">
          <el-input v-model="form.hometown" placeholder="请输入籍贯" />
        </el-form-item>
        <el-form-item label="职务" prop="position">
          <el-input v-model="form.position" placeholder="请输入职务" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEdit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 表单数据
const form = reactive({
  id: "042004",
  name: "袁智新",
  gender: "男",
  phone: "15812937040",
  email: "yuanzx1515@gmail.com",
  hometown: "广东",
  department: "研发部",
  position: "组长",
  birthday: "2004-10-7",
  education: "专科",
  hireDate: "2023-02-02",
  remark: "帅哥",
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
  phone: [{ required: true, message: "电话不能为空", trigger: "blur" }],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  gender: [{ required: true, message: "性别不能为空", trigger: "change" }],
};

// 弹窗显示状态
const dialogVisible = ref(false);

// 修改信息方法
const editInfo = () => {
  dialogVisible.value = true;
};

// 提交修改
const submitEdit = () => {
  const formRef = ref(null);
  formRef.value?.validate((valid) => {
    if (valid) {
      dialogVisible.value = false;
      console.log("个人信息已更新：", form);
    }
  });
};

// 返回按钮方法
const goBack = () => {
  console.log("返回按钮点击");
};
</script>

<style scoped>
.center {
  width: 80%;
  margin: 20px auto;
  display: flex;
}
/* 2.按照效果图编写个人中心页面样式 */
.info-container {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-container p {
  margin: 8px 0;
  font-size: 16px;
}

.buttons {
  text-align: center;
  margin-top: 20px;
}

.buttons .el-button {
  margin: 0 10px;
}

.dialog-footer {
  text-align: right;
}
</style>