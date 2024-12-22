<template>
  <div>
    <!-- 新增分类按钮 -->
    <el-button type="primary" @click="openAddDialog">新增分类</el-button>

    <!-- 分类表格 -->
    <div class="category_table">
      <el-table
          :data="tableData"
          style="width: 100%; margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          height="700"
      >
        <!-- 分类名称 -->
        <el-table-column prop="name" label="分类名称" />

        <!-- 分类级别 -->
        <el-table-column label="分级类别">
          <template #default="{ row }">
            <span>{{ row.pid === 0 ? "一级分类" : "二级分类" }}</span>
          </template>
        </el-table-column>

        <!-- 分类编号 -->
        <el-table-column prop="id" label="分类编号" />

        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="warning" @click="openEditDialog(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteCategory(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑/新增分类弹窗 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="30%"
        @close="resetForm"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="分类级别" prop="pid">
          <el-select v-model="form.pid" placeholder="请选择分类级别">
            <el-option :value="0" label="一级分类"></el-option>
            <el-option :value="1" label="二级分类"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

// 分类数据
const tableData = reactive([
  {
    id: 1,
    name: "潮流女装",
    pid: 0,
    children: [
      { id: 2, name: "羽绒服", pid: 1 },
      { id: 3, name: "毛呢大衣", pid: 1 },
      { id: 4, name: "连衣裙", pid: 1 },
    ],
  },
  {
    id: 5,
    name: "食品",
    pid: 0,
    children: [
      { id: 6, name: "休闲零食", pid: 5 },
      { id: 7, name: "新鲜果蔬", pid: 5 },
      { id: 8, name: "饮料汽水", pid: 5 },
      { id: 9, name: "四级茗茶", pid: 5 },
      { id: 10, name: "粮油调味", pid: 5 },
    ],
  },
]);

// 弹窗的显示状态
const dialogVisible = ref(false);
const dialogTitle = ref("");

// 表单数据
const form = reactive({
  id: null,
  name: "",
  pid: null,
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: "分类名称不能为空", trigger: "blur" }],
  pid: [{ required: true, message: "请选择分类级别", trigger: "change" }],
};

// 表单引用
const formRef = ref(null);

// 打开新增弹窗
const openAddDialog = () => {
  dialogTitle.value = "新增分类";
  resetForm();
  dialogVisible.value = true;
};

// 打开编辑弹窗
const openEditDialog = (row) => {
  console.log("打开编辑弹窗", row); // 调试信息
  dialogTitle.value = "编辑分类";
  form.id = row.id;
  form.name = row.name;
  form.pid = row.pid;
  dialogVisible.value = true;
};

// 重置表单
const resetForm = () => {
  form.id = null;
  form.name = "";
  form.pid = null;
  if (formRef.value) {
    formRef.value.resetFields();
  }
};

// 提交表单
const submitForm = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      if (form.id) {
        // 编辑
        const category = findCategoryById(tableData, form.id);
        if (category) {
          category.name = form.name;
          category.pid = form.pid;
          console.log("分类更新成功：", category);
        }
      } else {
        // 新增
        const newId = Math.max(...getAllIds(tableData)) + 1;
        tableData.push({ id: newId, name: form.name, pid: form.pid, children: [] });
        console.log("分类新增成功：", form);
      }
      dialogVisible.value = false;
    }
  });
};

// 删除分类
const deleteCategory = (row) => {
  console.log("删除分类被触发", row); // 调试信息
  const parent = tableData.find((item) => item.id === row.pid);
  if (parent && parent.children) {
    parent.children = parent.children.filter((child) => child.id !== row.id);
  } else {
    const index = tableData.findIndex((item) => item.id === row.id);
    if (index > -1) {
      tableData.splice(index, 1);
    }
  }
};

// 根据 ID 查找分类
const findCategoryById = (categories, id) => {
  for (const category of categories) {
    if (category.id === id) {
      return category;
    }
    if (category.children) {
      const result = findCategoryById(category.children, id);
      if (result) {
        return result;
      }
    }
  }
  return null;
};

// 获取所有分类 ID
const getAllIds = (categories) => {
  const ids = [];
  for (const category of categories) {
    ids.push(category.id);
    if (category.children) {
      ids.push(...getAllIds(category.children));
    }
  }
  return ids;
};
</script>

<style scoped>
.category_table {
  margin-top: 10px;
}

.dialog-footer {
  text-align: right;
}
</style>