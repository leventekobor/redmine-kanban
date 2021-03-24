<template>
  <Login v-if="stepCount === 0" @increaseStepCount="newStepCount"/>
  <ProjectPick v-if="stepCount === 1"/>
</template>

<script>
import { ref } from 'vue'
import Login from '@/components/Login'
import ProjectPick from '@/components/ProjectPick'


export default {
  name: "Setup",
  components: {
    Login,
    ProjectPick
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
