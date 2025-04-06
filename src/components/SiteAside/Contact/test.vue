<template>
  <div class="test-container">
    <Contact />
  </div>
</template>

<script>
import Contact from "./";
export default {
  components: {
    Contact,
  },
};
</script>

<style scoped>
.test-container {
  width: 400px;
  height: 600px;
  border: 2px solid red;
  margin: 0 auto;
}
</style>