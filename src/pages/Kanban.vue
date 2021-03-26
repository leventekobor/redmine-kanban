<template>
  <section class="app-container">
    <h1>Kanban board</h1>
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
  </section>
</template>

<script>
import { ref } from 'vue'
import draggable from 'vuedraggable'

export default {
  name: "Kanban",
  components: {
    draggable,
  },
  data() {
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


    return {
      list1,
      list2,
      log
    }
  }
}
</script>

<style>

</style>
