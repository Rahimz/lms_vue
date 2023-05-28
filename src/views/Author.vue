<template>
    <div class="courses">
      <div class="hero is-info">
        <div class="hero-body has-text-centered">
          <h1 class="title">{{ created_by.first_name + ' ' + created_by.last_name }}</h1>
        </div>
      </div>
      <section class="section">
        <div class="container">
            <div class="columns is-multiline">
                <div 
                    class="column is-4"
                    v-for="course in courses"
                    v-bind:key="course.id"
                    >
                    <CourseItem :course="course"/>
                </div>
                    
                

                <div class="column is-12">
                    <nav class="pagination">
                    <a href="" class="pagination-previous">Previous</a>
                    <a href="" class="pagination-next">Next</a>
                    <ul class="pagination-list">
                        <li><a href="" class="pagination-link is-current">1</a></li>
                        <li><a href="" class="pagination-link">2</a></li>
                        <li><a href="" class="pagination-link">3</a></li>
                    </ul>
                    </nav>
                </div>

            </div>
          
          
        </div>
        <!-- end of container -->
      </section>
    </div>
  </template>
  <script>
  import axios from 'axios'
  import CourseItem from '@/components/CourseItem.vue'
  
  export default {
      data() {
          return {
              courses: [],
              created_by: {},
 
  
          };
      },
      components: {
        CourseItem
      },
      async mounted() {
          console.log("mounted");
          
        //   document.title = 'Courses | StudyNet'
  

            this.getCourses()
          
          
      },
      methods: {

        getCourses() {
          console.log('params' + ' '+  `${this.$route.params.id}`);
          axios
              .get(`courses/get_author_courses/${this.$route.params.id}/`) // this endpint does not work because of a 500 error              
              .then(response => {
                console.log(response.data)
              

              this.courses = response.data.courses
              this.created_by = response.data.created_by
          })
        }
      },
      
  }
  </script>