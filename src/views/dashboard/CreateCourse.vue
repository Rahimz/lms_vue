<template>
  <div class="about">
    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Create Course</h1>       
      </div>      
    </div>
    <section class="section">
      <form action="" v-on:submit.prevent="submitForm">
        <div class="field">
          <div class="field">
            <label for="">Title</label>
            <input type="text" v-model="form.title" class="input" name="" id="">
          </div>

          <div class="field">
            <label for="">Short description</label>
            <textarea type="text" v-model="form.short_description" class="input" name="" id=""></textarea>
          </div>

          <div class="field">
            <label for="">Long description</label>
            <textarea type="text" v-model="form.long_description" class="input" name="" id=""></textarea>
          </div>

          <div class="field">
            <div class="select is-multiple">
              <select multiple size="10" v-model="form.categories">
                <option 
                  v-for="category in categories"
                  v-bind:key="category.id"                  
                  v-bind:value="category.id"
                >
                  {{ category.title }}
                </option>
               
             
              </select>
            </div>
          </div>

          <button class="button is-success">Submit</button>
        </div>
      </form>
    </section>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
       form: {
        title: '',
        short_description: '',
        long_description: '',
        categories: []
      },
      categories: [],
    }
  },
  mounted() {
    this.getCategories()

    
  },
  methods: {
    getCategories() {
      console.log("getCategories")

      axios 
          .get('courses/get_categories/')
          .then(response => {
            console.log(response.data)
            this.categories = response.data
          })

    }, 
    submitForm () {
      console.log("submitForm")
      console.log(this.form)

      axios
        .post('courses/create/', this.form)
        .then(response => {
          console.log(response.data)
        })
        .catch(error => {
          console.log('error: ', error)
        })
    }
  }
}
</script>