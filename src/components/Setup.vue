<template>
  <Login v-if="stepCount === 0" @increaseStepCount="newStepCount"/>
  <ProjectPick v-if="stepCount === 1" @increaseStepCount="newStepCount"/>
  <QueriesPick v-if="stepCount === 2" @increaseStepCount="newStepCount"/>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
import Login from '@/components/Login'
import ProjectPick from '@/components/ProjectPick'
import QueriesPick from '@/components/QueriesPick'


export default {
  name: "Setup",
  components: {
    Login,
    ProjectPick,
    QueriesPick
  },
  setup() {
    const router = useRouter()
    let stepCount = ref(0)

    function newStepCount(count) {
      stepCount.value = count
    }

    watch(stepCount, (currentValue) => {
      if (currentValue === 3) {
        router.push('Kanban')
      }
    })

    return {
      stepCount,
      newStepCount
    }
  }
}
</script>

<style>

</style>
