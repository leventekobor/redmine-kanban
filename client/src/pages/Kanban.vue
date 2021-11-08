<template>
  <section class="app-container">
    <h1>Kanban board</h1>
    <div class="kanban">
      <div v-for="status in columnConfig" :key="status.id">
        <h2 class="status-name">{{ status.name }}</h2>
        <draggable
          class="list-group"
          :list="issuesForProject.filter(issue => issue.status.id === status.id)"
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
    let issuesForProject = ref([])
    const store = useStore()
    // let issuesByStatus = ref([])
    let columnConfig = ref([])
    function log() {
      //window.console.log(evt)
    }
    async function setupColumnConfig() {
      let redmineStatuses = (await RedmineService.getKanbanConfigStatuses(store.state.user.api_key)).data.issue_statuses
      let configIssue = (await RedmineService.getKanbanConfig(store.state.user.api_key, store.state.project.id)).data.issues[0]
      let columnNames = JSON.parse(configIssue.description).config.columns;
      columnConfig.value = redmineStatuses.filter(status => columnNames.includes(status.name))
    }
    async function getIssuesForProject(){
      issuesForProject.value = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.query.id, store.state.project.id)).data.issues
      // issuesForProject.value = response.issues

      // originalIssues = response.issues
      //
      // const uniqueStatusNames = response.issues.reduce((acc, curr) => {
      //   return acc.includes(curr.status.name) ? acc : [...acc, curr.status.name]
      // }, []);
      //
      // issuesByStatus.value = uniqueStatusNames.map(name => response.issues.filter(i => i.status.name === name));
    }

    async function add(event){
      const movedTo = event.to.parentNode.firstElementChild.textContent
      const movedTitle = event.item.innerText.split("\n")[0]
      const newStatus = columnConfig.value.find(i => i.name === movedTo)
      const originalIssue = issuesForProject.value.find(i => i.subject === movedTitle)
      originalIssue.status = newStatus
      let response = (await RedmineService.updateIssueStatus(store.state.user.api_key, originalIssue.id, newStatus.id)).data
      console.log(response)
    }
    onMounted(() => {
      setupColumnConfig()
      getIssuesForProject()
    })

    return {
      log,
      add,
      issuesForProject,
      columnConfig
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

.status-name {
  margin: 30px;
}
</style>
