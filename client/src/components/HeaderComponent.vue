<template>
  <header>
    <router-link :to="{name: 'Login'}">
      <div class="info" v-if="user.firstname">
        <span class="small-text">Név:</span>
        <span class="large-text">{{ user.lastname + " " + user.firstname }}</span>
      </div>
      <span class="Large-text info" v-else>Home</span>
    </router-link>

    <router-link :to="{name: 'ProjectPick'}">
      <div class="info" v-if="project.name">
        <span class="small-text">Projekt:</span>
        <span class="large-text">{{ project.name }}</span>
      </div>
    </router-link>

    <router-link :to="{name: 'QueryPick'}">
      <div class="info" v-if="query.name">
        <ico class="small-text">Lekérdezés:</ico>
        <span class="large-text">{{ query.name }}</span>
      </div>
    </router-link>

  </header>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex"

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    const project = computed(() => store.state.project);
    const query = computed(() => store.state.query);
    return {
      user,
      project,
      query
    }
  }
}
</script>

<style>
header {
  background-color: white;
  height: 45px;
  display: flex;
}

.info {
  height: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-right: 15px;
  margin-left: 30px;
}

.small-text {
  font-size: 14px;
  font-weight: 400;
}

.large-text {
  font-size: 18px;
  font-weight: 700;
}
</style>
