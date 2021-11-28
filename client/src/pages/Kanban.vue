<template>
  <section class="app-container">
    <h1>Kanban board</h1>
    <div class="kanban">
      <div v-for="status in columnConfig" :key="status.id">
        <h2 class="status-name">{{ status.name }}</h2>
        <draggable
                class="list-group"
                :list="getLimitedList(issuesByStatus[status.name])"
                @change="log"
                @add="add"
                itemKey="id"
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
      const issueIdRegex = /\d+/
      const store = useStore()
      const columnConfig = ref([])
      const wipLimit = ref()
      const fallbackColumnConfig = ["Új", "Folyamatban", "Megoldva"]
      const fallbackWipLimit = 20

      let issuesForProject = []
      let issuesByStatus = ref()

      function log() {
        //window.console.log(evt)
      }

      async function setupColumnConfig() {
        let redmineStatuses
        let configIssue
        let columnNames
        let wipLimitFromConfig
        try {
          redmineStatuses = (await RedmineService.getRedmineStatuses(store.state.user.api_key)).data.issue_statuses
          configIssue = (await RedmineService.getKanbanConfig(store.state.user.api_key, store.state.project.id)).data.issues[0]
          let config = JSON.parse(configIssue.description).config
          columnNames = config.columns || fallbackColumnConfig
          wipLimitFromConfig = config.WIP || fallbackWipLimit
        } catch (error) {
          columnNames = fallbackColumnConfig
          wipLimitFromConfig = fallbackWipLimit
        }
        columnConfig.value = redmineStatuses.filter(status => columnNames.includes(status.name))
        wipLimit.value = wipLimitFromConfig
      }
      async function getIssuesForProject() {
        issuesForProject.value = (await RedmineService.getIssuesForProject(store.state.user.api_key, store.state.query.id, store.state.project.id)).data.issues
        issuesByStatus.value = lodash.groupBy(issuesForProject.value, 'status.name')
      }

      async function add(event){
        const movedTo = event.to.parentNode.firstElementChild.textContent
        const movedId = parseInt(event.item.innerText.match(issueIdRegex)[0])
        const newStatus = columnConfig.value.find(i => i.name === movedTo)
        const originalIssue = issuesForProject.value.find(i => i.id === movedId)
        originalIssue.status = newStatus
        issuesByStatus.value = lodash.groupBy(issuesForProject.value, 'status.name')
        await RedmineService.updateIssueStatus(store.state.user.api_key, originalIssue.id, newStatus.id)
      }

      function getLimitedList(issueList){
        if (issueList && issueList.length > wipLimit.value) {
          return issueList.slice(0, wipLimit.value)
        } else {
          return issueList
        }
      }

      onMounted(() => {
        setupColumnConfig()
        getIssuesForProject()
      })

      return {
        log,
        add,
        issuesByStatus,
        columnConfig,
        getLimitedList
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
