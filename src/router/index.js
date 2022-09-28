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
import BlogDetailPage from "@/components/BlogDetailPage.vue"
import AdminPage from "@/components/AdminPage.vue"
import LoginPage from "@/components/LoginPage.vue"

const routes = [{
        path: "/",
        name: "Home",
        component: HomePage,
        meta: {
            title: "Abase Home Page"
        }
    },
    {
        path: "/products",
        name: "Products",
        component: ProductsPage,
        meta: {
            title: "Products"
        }
    },
    {
        path: "/services",
        name: "Services",
        component: ServicesPage,
        meta: {
            title: "Services"
        }
    },
    {
        path: "/blogs",
        name: "Blogs",
        component: BlogsPage,
        meta: {
            title: "Blogs"
        }
    },
    {
        path: "/faqs",
        name: "ContactUs",
        component: ContactUsPage,
        meta: {
            title: "Contact Us"
        }
    },
    {
        path: "/products/:productId",
        name: "ProductDetail",
        component: ProductDetailPage,
        meta: {
            title: "Product"
        }
    },
    {
        path: "/blog/:blogId",
        name: "BlogDetailPage",
        component: BlogDetailPage,
        meta: {
            title: "Blog Content"
        }
    },
    {
        path: "/admin",
        name: "Admin",
        component: AdminPage,
        meta: {
            title: "Abaso Admin"
        }
    },
    {
        path: "/login",
        name: "LogIn",
        component: LoginPage,
        meta: {
            title: "Log In"
        }
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    next()
})

export default router