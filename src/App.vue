<template>
  <section class="app-container">
    <Login v-if="!loggedInUser" @userLoad="userData" />
    <section v-else>
      {{ loggedInUser }}
    </section>
  </section>
  <Loading v-if="loading" />
</template>

<script>
import { ref } from 'vue'
import Login from './components/Login'
import Loading from './components/Loading'

export default {
  name: 'App',
  components: {
    Login,
    Loading
  },

  setup() {
    let loggedInUser = ref()
    let loading = false;

    function userData(user) {
      loggedInUser.value = {...user.value.user}
    }

    return {
      loggedInUser,
      userData,
      loading
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
