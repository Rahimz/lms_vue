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

                  <template v-if="activeLesson.lesson_type === 'quiz'">
                    <h3>{{ quiz.question }}</h3>
                    <div class="control">
                      <label for="" class="radio">
                        <input type="radio" :value="quiz.op1" v-model="selectedAnswer"> {{ quiz.op1 }}
                      </label>
                    </div>
                    <div class="control">
                      <label for="" class="radio">
                        <input type="radio" :value="quiz.op2" v-model="selectedAnswer"> {{ quiz.op2 }}
                      </label>
                    </div>
                    <div class="control">
                      <label for="" class="radio">
                        <input type="radio" :value="quiz.op3" v-model="selectedAnswer"> {{ quiz.op3 }}
                      </label>
                    </div>
                    <div class="control mt-4">
                      <button class="button is-info" @click="submitQuiz">Submit</button>
                    </div>

                    <template v-if="quizResult == 'correct'">
                      <div class="notification is-success mt-4">
                        Correct :-D
                      </div>
                    </template>

                    <template v-if="quizResult == 'incorrect'">
                      <div class="notification is-danger mt-4">
                        Not Correct :-( Please try again
                      </div>
                    </template>
                  </template>

                  <template v-if="activeLesson.lesson_type === 'article'">
                    
                    <CourseComment
                      v-for="comment in comments"
                      v-bind:key="comment.id"
                      v-bind:comment="comment"
                      />                   
                  
                  <!--comment  form was here  -->
                  <AddComment 
                   v-bind:course="course"
                   v-bind:activeLesson="activeLesson"                   
                   v-on:submitComment="submitComment" 
                  />
                  <!-- the last line is listener to emit function -->
              </template>
                

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

import CourseComment from '@/components/CourseComment'

import AddComment from '@/components/AddComment.vue'

export default {
  components:{
    CourseComment,
    AddComment, 
  }, 
  data() {
      return {
          course: {},
          lessons: [],
          comments: [],
          errors: [],
          quiz: [],
          selectedAnswer: [],
          activeLesson: null,
          quizResult: null,
          // comment: {
          //   name: '',
          //   content: '',
          // }
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
    submitComment(comment) {
      this.comments.push(comment)
    },

    submitQuiz() {
      this.quizResult = null
      
      if (this.selectedAnswer) {
        if (this.selectedAnswer === this.quiz.answer) {
          this.quizResult = 'correct'
        } else {
          this.quizResult = 'incorrect'
        }

      }else {
        alert('Select answer first')
      }
    },
    
    setActiveLesson(lesson) {
      this.activeLesson = lesson

      if (lesson.lesson_type === 'quiz') {
        this.getQuiz()
      } else {
        this.getComments()
      }
      
    },
    getQuiz() {
      axios
          .get(`/api/v1/courses/${this.course.slug}/${this.activeLesson.slug}/get-quiz/`)
          .then(response => {              
            console.log(response.data)

            this.quiz = response.data
          })
    },
    getComments() {
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