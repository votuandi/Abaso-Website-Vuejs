import {
    createRouter,
    createWebHistory
} from "vue-router"

import HomePage from "../components/HomePage.vue"
import ProductsPage from "../components/ProductsPage.vue"
import ServicesPage from "../components/ServicesPage.vue"
import BlogsPage from "../components/BlogsPage.vue"
import ContactUsPage from "../components/ContactUsPage.vue"
import ProductDetailPage from "@/components/ProductDetailPage.vue"
import AdminPage from "@/components/AdminPage.vue"

const routes = [{
        path: "/",
        name: "Home",
        component: HomePage
    },
    {
        path: "/products",
        name: "Products",
        component: ProductsPage
    },
    {
        path: "/services",
        name: "Services",
        component: ServicesPage
    },
    {
        path: "/blogs",
        name: "Blogs",
        component: BlogsPage
    },
    {
        path: "/",
        name: "ContactUs",
        component: ContactUsPage
    }, {
        path: "/products/:productId",
        name: "ProductDetail",
        component: ProductDetailPage
    },
    {
        path: "/admin",
        name: "Admin",
        component: AdminPage
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router