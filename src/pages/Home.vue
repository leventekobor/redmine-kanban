<template>
  <section class="app-container">
    <Setup v-if="!loggedInUser" @userLoad="userData" />
    <section v-else>
      {{ loggedInUser }}
    </section>
  </section>
</template>

<script>
import { ref } from 'vue'
import Setup from '@/components/Setup'


export default {
  components: {
    Setup
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
.app-container {
  display: inline-block;
  background: #FFFFFF;
  border-radius: 10px;
  padding: 20px;
  margin: 5rem;
}
</style>
