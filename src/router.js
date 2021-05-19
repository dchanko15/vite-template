import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import sectorReg from './components/sectorReg.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/', name: 'home', component: Home
        },
        {
            path: '/reg', name: 'reg', component: sectorReg
        },
        {
            path: '/innerMargins', name: 'TaskTemplates',
        },
        {
            path: '/itemNames', name: 'Item Names',

        }
    ]
})
