<template>
  <div class="course">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">{{ course.title }}</h1>
      </div>
    </div>
    <section class="section">
      <div class="container">
        <div class="columns content">

          <!-- Menu -->
          <div class="column is-2">
            <h2>Table of contents</h2>

            <ul>
              <li
                v-for="lesson in lessons"
                v-bind:key="lesson.id">
                <a @click="activeLesson = lesson">{{ lesson.title }}</a>
                </li>
 
            </ul>
          </div>
          <div class="column is-10">
            <!-- to check wether the user is authenticated or not -->
            <template v-if="$store.state.user.isAuthenticated">
            
              <template v-if="activeLesson">
                  <h2>{{ activeLesson.title }}</h2>
                  {{ activeLesson.long_description }}
              </template>
              <template v-else>
                <h2>Introduction</h2>
                {{ course.long_description }}               
              </template>
            </template>

            <template v-else>
              <div>
                <h2>Restricted access</h2>
                <p>You need to have an account to continue!</p>
              </div>
            </template>
          </div>
          
          <!-- end of Content-->
        </div>
        <!-- end of columns -->
      </div>
      <!-- end of container -->
    </section>
  </div>
</template>
<script>
import axios from 'axios'

export default {
    data() {
        return {
            course: {},
            lessons: [],
            activeLesson: null
        }
    },
    mounted() {
        console.log('mounted')
        
        // we get the slug from router
        const slug = this.$route.params.slug

        axios
            // use single back quote to use variables
            .get(`/api/v1/courses/${slug}`)
            .then(response => {
                console.log(response.data)

                this.course = response.data.course
                this.lessons = response.data.lessons
            })
    }
}
</script>