<template>
  <section class="app-container">
    <Login v-if="!loggedInUser" @userLoad="userData" />
    <section v-else>
      {{ loggedInUser }}
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'
import Login from './components/Login'

export default {
  name: 'App',
  components: {
    Login
  },

  setup() {
    let loggedInUser = ref()

    function userData(user) {
      loggedInUser.value = {...user.value.user}
    }

    return {
      loggedInUser,
      userData
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background: linear-gradient(116.82deg, #36B342 0%, rgba(0, 0, 0, 0.37) 100%);
}

.app-container {
  display: inline-block;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin: 10rem;
}
</style>
