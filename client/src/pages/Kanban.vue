<template>
  <section class="app-container">
    <h1>Kanban board</h1>
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
              <div class="title">{{ element.subject }}</div>
              <div>Szerző: {{ element.author.name }} </div>
              <div v-if="element?.assigned_to?.name">Felelős: {{ element.assigned_to.name }} </div>
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
import { useStore } from "vuex"

export default {
  name: "Kanban",
  components: {
    draggable
  },
  setup() {
    let uniqueStatusNamesWithIds
    let originalIssues
    const store = useStore()
    let issuesByStatus = ref([])

    function log() {
      //window.console.log(evt)
    }

    async function getIssuesForProject(){
      let response = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.project.query_id, store.state.project.id)).data
      originalIssues = response.issues

      const uniqueStatusNames = response.issues.reduce((acc, curr) => {
        return acc.includes(curr.status.name) ? acc : [...acc, curr.status.name]
      }, []);

      issuesByStatus.value = uniqueStatusNames.map(name => response.issues.filter(i => i.status.name === name));
      

      uniqueStatusNamesWithIds = response.issues.reduce((acc, curr) => {
        return acc.some(i => i.id === curr.status.id) ? acc : [...acc, curr.status]
      }, []);

      console.log(issuesByStatus.value)
    }

    async function add(event){
      const movedTo = event.to.parentNode.firstElementChild.textContent
      const movedTitle = event.item.innerText.split("Szerző")[0]
      const newStatusId = uniqueStatusNamesWithIds.find(i => i.name === movedTo).id
      const originaIssue = originalIssues.find(i => i.subject === movedTitle)
      
      let response = (await RedmineService.updateIssueStatus(store.state.user.api_key, originaIssue.id, newStatusId)).data
      console.log(response)
    }

    onMounted(getIssuesForProject)

    return {
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
  height: 100%;
  width: 250px;
  margin: 10px;
  padding: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: move;
  display: flex;
  flex-direction: column;
}

.list-item > div {
  padding-bottom: 5px;
}

.title {
  font-size: 17px;
  font-weight: 600;
}

</style>
