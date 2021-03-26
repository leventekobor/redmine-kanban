<template>
  <article class="full-screen">
    <form @submit.prevent="addProject">
      <h1>Beállítások</h1>
      <p>Válassz projektet!</p>
      <div>
        <Multiselect required v-model="selectedProject" label="name" trackBy="name" :searchable="true"  :minChars="1" :options="projectsOrdered"/>
      </div>
      <button>Kiválasztás</button>
    </form>
  </article>
</template>

<script>
import { ref, onMounted } from 'vue'
import RedmineService from '@/services/RedmineService.js'
import Multiselect from '@vueform/multiselect'
import { useStore } from "vuex"

export default {
  name: "ProjectPick",
  components: {
    Multiselect
  },
  setup(_, { emit }) {
    let projects = ref()
    let projectsOrdered = ref()
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
      projectsOrdered.value = projects.value.map(({ id, name }) => ({ value:id, name:name }))
    }

  /*
    async function getProjectQueries() {
      let response = (await RedmineService.getProjectQueries(store.state.user.api_key, 0)).data
      queires.value = response.queries
      if(response.total_count > 100) {
        const iterations = Math.ceil(response.total_count / 100)
        for(let i = 1; i < iterations; i++) {
          response = (await RedmineService.getProjectQueries(store.state.user.api_key, (i * 100))).data
          queires.value = [...queires.value, response.queires]
        }
      }
      queires.value = queires.value.filter(i => i.project_id === selectedProject.value)
      console.log(queires.value)
    }
    */

    function addProject() {
      store.commit({
        type: 'addProject',
        payload: projects.value.filter(i => i.id === selectedProject.value)[0]
      })
      emit('increaseStepCount', 2);
    }

    onMounted(getProjects) 

    return {
      projectsOrdered,
      selectedProject,
      addProject
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css">


</style>
