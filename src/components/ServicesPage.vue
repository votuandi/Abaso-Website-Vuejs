<template>
  <div class="services-page">
    <tool-page></tool-page>
  </div>
</template>

<script>
// import ServicesMenu from "./ServicesMenu.vue";
import ToolPage from "./ToolPage.vue";
export default {
  name: "ServicesPage",
  components: {
    // ServicesMenu,
    ToolPage,
  },
};
</script>

<style>
.services-page {
  padding-top: 78px;
}
</style>