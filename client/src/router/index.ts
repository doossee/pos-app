import { useStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'

const beforeEnter = (to: any, __: any, next: any) => {
    const store = useStore();

    // Check if the user is logged in
    if (store.isLogged) {
        next('/login');
        return;
    }

    // Get the user's role from the store
    const userRole = store.user!.role;
    
    // Define the roles and their corresponding restricted routes
    const adminRoutes = ['/admin']; // Routes accessible only by admin
    const appRoutes = ['/app']; // Routes accessible only by app users

    // Check if the user is trying to access a restricted route
    if (adminRoutes.includes(to.path) && userRole !== 'admin') {
        next('/app'); // Redirect to an unauthorized page or any other appropriate route
    } else if (appRoutes.includes(to.path) && userRole !== 'app') {
        next('/admin'); // Redirect to an unauthorized page or any other appropriate route
    } else {
        next(); // Allow access to the route
    }
}

export default createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: () => import('../pages/login.vue') },
        { path: '/app', beforeEnter, component: () => import('../pages/mobile/index.vue'),
            children: [
                { path: '', component: () => import('../pages/mobile/order.vue') },
                { path: 'settings', component: () => import('../pages/mobile/settings.vue') },
            ]
        },
        { path: '/admin', beforeEnter, component: () => import('../pages/admin/index.vue'),
            children: [
                { path: '', component: () => import('../pages/admin/dashboard.vue') },
                { path: 'create-order', component: () => import('../pages/admin/create-order.vue') },
                { path: 'users', component: () => import('../pages/admin/users.vue') },
                { path: 'orders', component: () => import('../pages/admin/orders.vue') },
                { path: 'foods', component: () => import('../pages/admin/foods.vue') },
            ]
        },]
})