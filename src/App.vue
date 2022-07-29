<template>
  <div class="app">
    <CpnNavigation />
    <router-view />
  </div>
</template>

<script>
import CpnNavigation from "./components/CpnNavigation.vue";
export default {
  name: "App",
  components: {
    CpnNavigation,
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.app {
  min-height: 100vh;
  position: relative;
  background-color: #f1f1f1;
}
.container {
  // padding: 0 20px;
  max-width: 1140px;
  margin: 0 auto;
}
</style>