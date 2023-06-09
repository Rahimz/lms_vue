import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import About from '../views/AboutView.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'

import MyAccount from '../views/dashboard/MyAccount.vue'
import CreateCourse from '../views/dashboard/CreateCourse.vue'
import Courses from '../views/Courses.vue'
import Course from '../views/Course.vue'
import Author from '../views/Author.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/sign-up',
    name: 'signup',
    component: SignUp,
  },
  {
    path: '/log-in',
    name: 'login',
    component: LogIn,
  },
  {
    path: '/courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/courses/:slug',
    name: 'Course',
    component: Course
  },
  {
    path: '/authors/:id',
    name: 'Author',
    component: Author
  },
  {
    path: '/dashboard/my-account',
    name: 'MyAccount',
    component: MyAccount
  },
  {
    path: '/dashboard/create-course',
    name: 'CreateCourse',
    component: CreateCourse
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
