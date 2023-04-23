<template>
  <div class="about">
     <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">My account</h1>
       
      </div>
  </div>
    <section class="section">
      <button @click="logout()" class="button is-danger">Log out</button>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  mounted() {
    axios 
    .get('activities/get_active_courses/')
    .then(response => {
      console.log(response.data)
    })
  },
  methods: {
      async logout() {
          console.log('logout')

          await axios 
          .post('token/logout/')
          .then(response => {
            console.log('Logged out')
          })
          // reset tokens 
          axios.defaults.headers.common['Authorization'] = ""
          // remove token from old sessions
          localStorage.removeItem('token')

          this.$store.commit('removeToken')

          this.$router.push('/')
      }
  }
}
</script>