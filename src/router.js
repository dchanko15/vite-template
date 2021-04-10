import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/stats',
            name: 'Statistics',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
           // component: () => import(/* webpackChunkName: "Stats" */ './views/Stat.vue')
        },
        {
            path: '/innerMargins',
            name: 'TaskTemplates',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
           // component: () => import(/* webpackChunkName: "Scripts" */ './views/InnerMargins.vue')
        },
        {
          path: '/itemNames',
          name:  'Item Names',
         //   component: ()=> import(/* webpackChunkName: "Scripts" */ './views/ItemNames.vue')
        }
    ]
})
