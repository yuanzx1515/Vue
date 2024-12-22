import { createRouter, createWebHistory } from "vue-router";

// 引入页面组件
import Category from '../pages/category.vue';
import Goods from '../pages/goods.vue';
import Me from '../pages/me.vue';
import Index from '../pages/index.vue';

const routes = [
    {
        path: "/", // 默认首页路径
        name: "1",
        component: Index,
    },
    {
        path: "/category", // 分类管理页面
        name: "2",
        component: Category,
    },
    {
        path: "/goods", // 商品管理页面
        name: "3",
        component: Goods,
    },
    {
        path: "/me", // 个人中心页面
        name: "4",
        component: Me,
    },
];

const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 history 模式
    routes,
});

export default router;