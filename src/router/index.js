import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

import HomeView from '../views/HomeView.vue'
import MassagerView from '../views/MassagerView.vue'
import AdminView from '../views/AdminView.vue'
import LoginView from '../views/LoginView.vue'
import StandbyView from '../views/StandbyView.vue'
import DutyView from '../views/DutyView.vue'
import DutyDetailView from '../views/DutyDetailView.vue'
import Test from '../views/Test.vue'


let localUser;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path:'/massager',
      name:'massager',
      component: MassagerView,
      meta:{ requiresAuth:true}
    },
    {
      path:'/admin',
      name:'admin',
      component: AdminView,
      meta:{ requiresAuth:true}
    },
    {
      path:'/login',
      name:'login',
      component: LoginView
    },
    {
      path:'/standby',
      name:'standby',
      component: StandbyView
    },
    {
      path:'/duty',
      name:'duty',
      component: DutyView,
      meta:{ requiresAuth:true}
    },
    {
      path:'/dutyDetail/:id',
      name:'dutyDetail',
      component: DutyDetailView,
      meta:{ requiresAuth:true}
    },

  ]
})

async function getUser(next) {
	localUser = await supabase.auth.getSession();
	if (localUser.data.session == null) {
		next('/login')
	}
	else {
		next();
	}
}


router.beforeEach((to, from, next) => {
	if (to.meta.requiresAuth) {
		getUser(next);
	}
	else {
		next();
	}
})

export default router
