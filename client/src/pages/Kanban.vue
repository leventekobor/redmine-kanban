<template>
  <section class="app-container">
    <h1>Kanban board</h1>
    <div class="kanban">
      <div v-for="status in columnConfig" :key="status.id">
        <h2 class="status-name">{{ status.name }}</h2>
        <draggable
                class="list-group"
                :list="issuesByStatus[status.name]"
                @change="log"
                @add="add"
                itemKey="subject"
                group="issues"
        >
          <template #item="{ element }">
            <div class="list-item">
              <div class="title">#{{ element.id }}</div>
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
  import lodash from "lodash"

  export default {
    name: "Kanban",
    components: {
      draggable
    },
    setup() {
      let issuesForProject = []
      let issuesByStatus = ref()
      const store = useStore()
      let columnConfig = ref([])
      const fallbackColumnConfig = ["Új", "Folyamatban", "Megoldva"]

      function log() {
        //window.console.log(evt)
      }

      async function setupColumnConfig() {
        let redmineStatuses
        let configIssue
        let columnNames
        try {
          redmineStatuses = (await RedmineService.getRedmineStatuses(store.state.user.api_key)).data.issue_statuses
          configIssue = (await RedmineService.getKanbanConfig(store.state.user.api_key, store.state.project.id)).data.issues[0]
          columnNames = JSON.parse(configIssue.description).config.columns
        } catch (error) {
          columnNames = fallbackColumnConfig
        }
        columnConfig.value = redmineStatuses.filter(status => columnNames.includes(status.name))
      }
      async function getIssuesForProject() {
        issuesForProject.value = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.query.id, store.state.project.id)).data.issues
        issuesByStatus.value = lodash.groupBy(issuesForProject.value, 'status.name')
      }

      async function add(event){
        const movedTo = event.to.parentNode.firstElementChild.textContent
        const movedTitle = event.item.innerText.split("Szerző")[0].trim()
        const newStatus = columnConfig.value.find(i => i.name === movedTo)
        const originalIssue = issuesForProject.value.find(i => i.subject === movedTitle)
        originalIssue.status = newStatus
        issuesByStatus.value = lodash.groupBy(issuesForProject.value, 'status.name')
        await RedmineService.updateIssueStatus(store.state.user.api_key, originalIssue.id, newStatus.id)
      }
      onMounted(() => {
        setupColumnConfig()
        getIssuesForProject()
      })

      return {
        log,
        add,
        issuesByStatus,
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
