<template>
  <div class="app">
    <CpnNavigation />
    <router-view />
    <CpnFooter />
  </div>
</template>

<script>
import CpnNavigation from "./components/CpnNavigation.vue";
import CpnFooter from "./components/CpnFooter.vue";
export default {
  name: "App",
  components: {
    CpnNavigation,
    CpnFooter,
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
  width: 100vw;
  position: relative;
  // background-color: red;
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  overflow-x: hidden;

  CpnFooter {
    z-index: 100;
  }
}
</style>