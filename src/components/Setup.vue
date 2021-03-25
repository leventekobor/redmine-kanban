<template>
  <Login v-if="stepCount === 0" @increaseStepCount="newStepCount"/>
  <ProjectPick v-if="stepCount === 1" @increaseStepCount="newStepCount"/>
  <QueriesPick v-if="stepCount === 2"/>
</template>

<script>
import { ref } from 'vue'
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
    let stepCount = ref(0)

    function newStepCount(count) {
      stepCount.value = count
    }


    return {
      stepCount,
      newStepCount
    }
  }
}
</script>

<style>

</style>
