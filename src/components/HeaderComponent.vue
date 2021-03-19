<template>
  <header>
    <div class="info" v-if="user.firstname">
      <span class="small-text">Név:</span>
      <span class="large-text">{{ user.lastname + " " + user.firstname }}</span>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useStore } from "vuex"

export default {
  name: 'Header',
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);

    console.log(user)
    return {
      user
    }
  }
}
</script>

<style>
header {
  background-color: white;
  height: 45px;
  display: flex;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.small-text {
  font-size: 14px;
  font-weight: 400;
}

.large-text {
  font-size: 18px;
  font-weight: 700;
}
</style>
