<template>
    <article>
        <ProjectPick/>
    </article>
    <article>
        <QueriesPick/>
    </article>
</template>

<script>
import ProjectPick from '@/components/ProjectPick'
import QueriesPick from '@/components/QueriesPick'

export default {
  name: "Setup",
  components: {
    ProjectPick,
    QueriesPick
  },
  setup() {


    return {
        
    }
  }
}
</script>

<style src="@vueform/multiselect/themes/default.css">
article {
    margin: 12px;
}
</style>
