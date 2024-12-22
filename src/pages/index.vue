
<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-card style="font-size:14px">
                    <template #header>
                        <div class="card-header">
                            <div class="icon">
                                <!--1.使用图片标签插入assets文件下images的icon.jpg图片-->



                            </div>
                            <span>系统管理员</span>
                        </div>
                    </template>
                    <p>登录时间：2024-11-11 09:00:00</p>
                    <p>登录地点：广州</p>
                </el-card>
            </el-col>
                <el-col :span="18">
                    <el-card style="font-size:14px">
                        <template #header>
                            <div class="card-header">
                                <span>6月统计信息</span>
                            </div>
                        </template>
                        <div class="list">
                            <div class="item">
                                <div class="left">
                                    <el-icon :size="50" color="#fff"> 
                                        <Tickets />
                                    </el-icon>
                                </div>
                                <div class="right">
                                    <div>500</div>
                                    <div>商品数量（个）</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <!--2.参考效果图编写对应的图标尺寸为50，颜色为#fff-->



                                </div>
                                <div class="right">
                                    <div>20</div>
                                    <div>商品分类数量（个）</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="left">
                                    <!--参考效果图编写对应的图标设置图标尺寸50，颜色#fff-->



                                </div>
                                <div class="right">
                                    <div>121</div>
                                    <div>用户访问次数（次）</div>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-col>
        </el-row>
        <el-row :gutter="20" style="margin-top:20px">
            <el-col :span="12">
                <el-card style="font-size:14px">
                    <template #header>
                        <div class="card-header">
                            <span>2024年月度销售额</span>
                            <div class="card-title">
                                <img src="../assets/images/icon1.jpg" alt />
                                <span>销售额</span>
                            </div>
                        </div>
                    </template>
                    <div class="dataImg">
                        <img src="../assets/images/img1.jpg" alt />
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="font-size:14px">
                    <template #header>
                        <div class="card-header">
                            <span>2024年订单数量</span>
                            <div class="card-title">
                                <img src="../assets/imager/icon2.jpg" alt />
                                <span>订单总数</span>
                            </div>
                        </div>
                    </template>
                    <div class="dataImg">
                        <img src="../assets/images/img2.jpg" alt />
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script setup>
</script>
<style scoped>
.card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.icon {
    width: 50px;
    height: 50px;
    border-radius: 8px;
    border: 1px solid #ddd;
    overflow: hidden;
}
.icon img {
    width: 100%;
    height: 100%;
}
.left {
    width: 50px;
    height: 80px;
}
.item:nth-child(1) .left {
    background-color: #eead0e;
}
.item:nth-child(2) .left {
    background-color: #ab82ff;
}
.item:nth-child(3) .left {
    background-color: #63b8ff;
}
.list {
    display: flex;
    justify-content: space-around;
    padding-bottom: 20px;
}
.item {
    display: flex;
    align-items: center;
}
.right {
    text-align: center;
    font-size: 12px;
    line-height: 20px;
    margin-left: 20px;
    width: 90px;
}
.dataImg img {
    width: 100%;
}
.card-title {
    display: flex;
    align-items: center;
}
</style>