import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView'
import AnimalsView from '@/views/AnimalsView'
import AdoptionView from '@/views/AdoptionView'
import AnimalView from '@/views/AnimalView'
import AboutUsView from '@/views/AboutUsView'
import AdminView from '@/views/AdminView'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/animals',
    name: 'animals',
    component: AnimalsView
  },
  {
    path: '/adoption',
    name: 'adoption',
    component: AdoptionView,

  },  
  
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,

  },  
  {
    path: '/animals/:id',
    name: 'animal',
    component: AnimalView,    
    props: true
  },
  {
    path: '/about-us',
    name: 'about-us',
    component: AboutUsView
  },
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
