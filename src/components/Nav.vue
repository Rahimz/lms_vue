<template>

  <nav class="navbar is-info" role="navigation" aria-label="main navigation" style="min-height: 5rem;">
    <div class="navbar-brand">
      <router-link class="navbar-item is-size-4" to="/">StudyNet</router-link>
    </div>
    
    <div id="navbar-item" class="navbar-menu">
      <div class="navbar-start">
        <router-link  to="/" class="navbar-item">Home</router-link>
        <router-link  to="/about" class="navbar-item">About</router-link>
        <router-link  to="/courses" class="navbar-item">Courses</router-link>
    </div>
      
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <template v-if="$store.state.user.isAuthenticated">
              <router-link to="/dashboard/my-account" class="button is-info">My account</router-link>
            </template>
            <template v-else>
              <div>
                <router-link class="button is-primary" to="/sign-up"><strong>Sign up</strong></router-link>
                <router-link class="button is-light" to="/log-in">Log in</router-link>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>    
  </nav>
  
</template>