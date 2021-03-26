<template>
  <section class="app-container">
    <h1>Kanban board</h1>
    <div class="kanban">
      <div>
      <h3>Draggable 1</h3>
      <draggable
        class="list-group"
        :list="list1"
        group="people"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </draggable>
      </div>
      <div>
      <h3>Draggable 2</h3>
      <draggable
        class="list-group"
        :list="list2"
        group="people"
        @change="log"
        itemKey="name"
      >
        <template #item="{ element, index }">
          <div class="list-group-item">{{ element.name }} {{ index }}</div>
        </template>
      </draggable>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue'
import draggable from 'vuedraggable'
import RedmineService from '@/services/RedmineService.js'
import { useStore } from "vuex"

export default {
  name: "Kanban",
  components: {
    draggable,
  },
  setup() {
    const store = useStore()
    let list1 = ref([
        { name: "John", id: 1 },
        { name: "Joao", id: 2 },
        { name: "Jean", id: 3 },
        { name: "Gerard", id: 4 }
      ])

    let list2 = ref([
        { name: "Juan", id: 5 },
        { name: "Edgard", id: 6 },
        { name: "Johnson", id: 7 }
      ])

    function log(evt) {
      window.console.log(evt);
    }

    async function getIssuesForProject(){
      //getIssuesForProject
      let response = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.project.query_id, store.state.project.id)).data
      console,log(response)
      
    }

    onMounted(getIssuesForProject)


    return {
      list1,
      list2,
      log
    }
  }
}
</script>

<style>
.kanban {
  display: flex;
}
</style>
