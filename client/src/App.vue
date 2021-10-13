<template>
  <HeaderComponent v-if="user.firstname"/>
  <div>
    <router-view/>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent'
import { computed } from 'vue'
import { useStore } from "vuex"

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    
    return {
      user
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
  background: linear-gradient(100deg, #36B342 0%, rgba(0, 0, 0, 0.37) 100%);
}

</style>
