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
                <a @click="setActiveLesson(lesson)">{{ lesson.title }}</a>
                </li>
 
            </ul>
          </div>
          <div class="column is-10">
            <!-- to check wether the user is authenticated or not -->
            <template v-if="$store.state.user.isAuthenticated">
            
              <template v-if="activeLesson">
                  <h2>{{ activeLesson.title }}</h2>
                  {{ activeLesson.long_description }}
                  <hr>

                  <article 
                  class="media box"
                  v-for="comment in comments"
                  v-bind:key="comment.id">
                    <div class="media-content">
                      <div class="content">
                        <p>
                          <strong>{{ comment.name }}</strong> {{ comment.created_at }}
                        </p>
                          {{ comment.content }}

                      </div>
                    </div>
                  </article>

                  <form v-on:submit.prevent="submitComment()">
                    <div class="field">
                      <label class="label" for="">Name</label>
                      <div class="control">
                        <input type="text" class="input" v-model="comment.name">
                      </div>
                    </div>

                    <div class="field">
                      <label class="label" for="">Content</label>
                      <div class="control">
                        <textarea class="textarea" v-model="comment.content"></textarea>
                      </div>
                    </div>

                    <div 
                      class="notification is-danger"
                      v-for="error in errors"
                      v-bind:key="error"
                      >
                      {{ error }}

                    </div>

                    <div class="field">
                      <div class="control">
                        <button class="button is-link">Submit</button>
                      </div>
                    </div>  


                  </form>


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
            comments: [],
            errors: [],
            activeLesson: null,
            comment: {
              name: '',
              content: '',
            }
        }
    },
    async mounted() {
        console.log('mounted')
        
        // we get the slug from router
        const slug = this.$route.params.slug

        await axios
            // use single back quote to use variables
            .get(`/api/v1/courses/${slug}`)
            .then(response => {
                console.log(response.data)

                this.course = response.data.course
                this.lessons = response.data.lessons
            })

            // to edit page title 
            document.title = this.course.title + ' | Studynet'
    },
    methods: {
      submitComment() {
        console.log('submitComment')
        // in every submit we need to clean this
        this.errors = []

        if (this.comment.name === '') {
          this.errors.push('The name must be filled out')
        }
        if (this.comment.content === '') {
          this.errors.push('The content must be filled out')
        }

        if (!this.errors.length){
            axios
            .post(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/`, this.comment)
            .then(response => {
              this.comment.name = ''
              this.comment.content = ''
              // this line added to show newly added comment
              this.comments.push(response.data)
              // alert('The comment was added')
            })
            .catch(error => {
              console.log(error)
            })
            }
      },
      setActiveLesson(lesson) {
        this.activeLesson = lesson

        this.getComments() 
      }, getComments() {
           axios
            .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/get-comments/`)
            .then(response => {
              console.log(response.data)

              this.comments = response.data
            })
        }
    },
}
</script>