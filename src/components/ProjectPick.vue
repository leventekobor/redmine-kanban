<template>
  <article>
    <form @submit.prevent="getUser">
      <h1>Beállítások</h1>
      <p>Válassz projektet!</p>
      <div>
        <input type="text" @change="serachProjects($event)">
        <select id="selectProjectList" v-model="selectedProject">
          <option v-for="project in projects" :key="project.id" :value="project"> {{ project.name }} </option>
        </select>
        <div>
          {{ selectedProject }}
        </div>
      </div>
      <button>Kiválasztás</button>
    </form>
  </article>
</template>

<script>
import { ref, onMounted  } from 'vue'
import RedmineService from '@/services/RedmineService.js'
import { useStore } from "vuex"


export default {
  name: "ProjectPick",
  setup() {
    let projects = ref()
    let selectedProject = ref()
    const store = useStore()

    async function getProjects() {
      let response = (await RedmineService.getProjects(store.state.user.api_key, 0)).data
      projects.value = response.projects
      if(response.total_count > 100) {
        const iterations = Math.ceil(response.total_count / 100)
        for(let i = 1; i < iterations; i++) {
          response = (await RedmineService.getProjects(store.state.user.api_key, (i * 100))).data
          projects.value = [...projects.value, response.projects]
        }
      }
    }

    function serachProjects(event) {
      console.log(event.target.value)
      projects.value = projects.value.filter(i => i.name.includes(event.target.value))
    }

    onMounted(getProjects) 

    return {
      projects,
      selectedProject,
      serachProjects
    }
  }
}
</script>

<style>

</style>
