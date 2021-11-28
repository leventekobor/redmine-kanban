<template>
  <section class="app-container">
    <h1>A keresett oldal nem található!</h1>
    <img width="400" height="400" src="../../public/not-found.svg" alt="">
  </section>
</template>

<script>
export default {
  name: "NotFound",
  data() {
    return {
    
    }
  }
}
</script>

<style>
.app-container {
  display: inline-block;
  border-radius: 10px;
  padding: 20px;
  margin: 5rem;
}

img {
  position:relative;
  width:100%;
  height: 100%
}

h1 {
  margin-bottom: 25px;
}
</style>
