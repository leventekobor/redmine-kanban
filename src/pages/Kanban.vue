<template>
  <section class="app-container">
    <h1>Kanban board</h1>
    <loading v-if="loading"/>
    <div class="kanban">
      <div v-for="(issues) in issuesByStatus" :key="issues">
        <h2>{{ issues[0].status.name }}</h2>
        <draggable
          class="list-group"
          :list="issues"
          @change="log"
          @add="add"
          itemKey="subject"
          group="issues"
        >
          <template #item="{ element }">
            <div class="list-item">
              {{ element.subject }}
              <div><b>Szerző:</b> {{ element.author.name }} </div>
            </div>
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
import Loading from '@/components/Loading'
import { useStore } from "vuex"

export default {
  name: "Kanban",
  components: {
    draggable,
    Loading
  },
  setup() {
    let uniqueStatusNamesWithIds
    let originalIssues
    const store = useStore()
    let loading = ref(false)
    let issuesByStatus = ref([])
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

    function log() {
      //window.console.log(evt)
    }

    async function getIssuesForProject(){
      loading.value = true
      let response = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.project.query_id, store.state.project.id)).data
      originalIssues = response.issues

      const uniqueStatusNames = response.issues.reduce((acc, curr) => {
        return acc.includes(curr.status.name) ? acc : [...acc, curr.status.name]
      }, []);

      issuesByStatus.value = uniqueStatusNames.map(name => response.issues.filter(i => i.status.name === name));
      

      uniqueStatusNamesWithIds = response.issues.reduce((acc, curr) => {
        return acc.some(i => i.id === curr.status.id) ? acc : [...acc, curr.status]
      }, []);
    
      loading.value = false
    }

    async function add(event){
      const movedTo = event.to.parentNode.firstElementChild.textContent
      const movedTitle = event.item.innerText
      const newStatusId = uniqueStatusNamesWithIds.find(i => i.name === movedTo).id
      const originaIssue = originalIssues.find(i => i.subject === movedTitle)
      
      let response = (await RedmineService.updateIssueStatus(store.state.user.api_key, originaIssue.id, newStatusId)).data
      console.log(response)
    }

    onMounted(getIssuesForProject)

    return {
      list1,
      list2,
      log,
      add,
      issuesByStatus
    }
  }
}
</script>

<style>
.kanban {
  display: flex;
}

.list-item {
  background: rgba(0, 0, 0, 0.04);
  box-shadow: 3px 3px 7px 0px rgb(0 0 0 / 35%);
  border-radius: 10px;
  height: 50px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  cursor: move;
  display: flex;
  flex-direction: column;
}

</style>
