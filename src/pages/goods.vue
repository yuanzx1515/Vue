<template>
  <div>
    <!-- 新增商品按钮 -->
    <el-button type="primary" @click="openAddDialog">新增商品</el-button>

    <!-- 商品表格 -->
    <div class="goods_table">
      <el-table
          :data="tableData"
          style="width: 100%; margin-top: 20px;"
          row-key="id"
          border
          height="600"
      >
        <!-- 商品编号 -->
        <el-table-column prop="id" label="商品编号" />

        <!-- 商品名称 -->
        <el-table-column prop="name" label="商品名称" />

        <!-- 商品价格 -->
        <el-table-column prop="price" label="商品价格" />

        <!-- 商品库存 -->
        <el-table-column prop="stock" label="商品库存" />

        <!-- 商品简介 -->
        <el-table-column prop="description" label="商品简介" />

        <!-- 商品图片 -->
        <el-table-column label="商品图片">
          <template #default="{ row }">
            <img :src="row.image" alt="商品图片" class="goods-image" />
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button size="small" type="warning" @click="openEditDialog(row)">
              编辑
            </el-button>
            <el-button size="small" type="danger" @click="deleteGoods(row)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 编辑/新增商品弹窗 -->
    <el-dialog
        :title="dialogTitle"
        v-model="dialogVisible"
        width="40%"
        @close="resetForm"
    >
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入商品名称" />
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input type="number" v-model="form.price" placeholder="请输入商品价格" />
        </el-form-item>
        <el-form-item label="商品库存" prop="stock">
          <el-input type="number" v-model="form.stock" placeholder="请输入商品库存" />
        </el-form-item>
        <el-form-item label="商品简介" prop="description">
          <el-input v-model="form.description" type="textarea" placeholder="请输入商品简介" />
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-upload
              class="upload-demo"
              action=""
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :file-list="fileList"
              @change="handleImageChange"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
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

// 商品数据
const tableData = reactive([
  {
    id: 1,
    name: "加力果",
    price: 26.8,
    stock: 19,
    description: "加力果属于苹果的一种，提供营养纤维。",
    image: "/src/assets/images/goods1.jpg",
  },
  {
    id: 2,
    name: "陕西蜜梨",
    price: 6.9,
    stock: 30,
    description: "梨味美甘，富含营养成分。",
    image: "/src/assets/images/goods2.jpg",
  },
  {
    id: 3,
    name: "进口香蕉",
    price: 2,
    stock: 60,
    description: "香甜的香蕉，富含维生素。",
    image: "/src/assets/images/goods3.jpg",
  },
]);

// 弹窗显示状态
const dialogVisible = ref(false);
const dialogTitle = ref("");

// 表单数据
const form = reactive({
  id: null,
  name: "",
  price: null,
  stock: null,
  description: "",
  image: "",
});

// 表单校验规则
const rules = {
  name: [{ required: true, message: "商品名称不能为空", trigger: "blur" }],
  price: [{ required: true, message: "商品价格不能为空", trigger: "blur" }],
  stock: [{ required: true, message: "商品库存不能为空", trigger: "blur" }],
  description: [{ required: true, message: "商品简介不能为空", trigger: "blur" }],
  image: [{ required: true, message: "请上传商品图片", trigger: "change" }],
};

// 表单引用
const formRef = ref(null);

// 图片文件列表
const fileList = ref([]);

// 打开新增弹窗
const openAddDialog = () => {
  dialogTitle.value = "新增商品";
  resetForm();
  dialogVisible.value = true;
};

// 打开编辑弹窗
const openEditDialog = (row) => {
  dialogTitle.value = "编辑商品";
  form.id = row.id;
  form.name = row.name;
  form.price = row.price;
  form.stock = row.stock;
  form.description = row.description;
  form.image = row.image;
  dialogVisible.value = true;
};

// 重置表单
const resetForm = () => {
  form.id = null;
  form.name = "";
  form.price = null;
  form.stock = null;
  form.description = "";
  form.image = "";
  fileList.value = [];
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
        const index = tableData.findIndex((item) => item.id === form.id);
        if (index > -1) {
          tableData[index] = { ...form };
        }
      } else {
        // 新增
        const newId = Math.max(...tableData.map((item) => item.id)) + 1;
        tableData.push({ ...form, id: newId });
      }
      dialogVisible.value = false;
    }
  });
};

// 图片处理
const handleImageChange = (file) => {
  form.image = URL.createObjectURL(file.raw);
};

const handlePictureCardPreview = () => {
  console.log("预览图片功能暂未实现");
};

const handleRemove = () => {
  form.image = "";
};
</script>

<style scoped>
.goods_table {
  margin-top: 20px;
}

.dialog-footer {
  text-align: right;
}

.goods-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
}
</style>