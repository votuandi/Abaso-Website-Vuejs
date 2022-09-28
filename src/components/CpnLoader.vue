<template>
  <div class="bg">
    <div class="container">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CpnLoader",
};
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100vw;
  height: 100vh;
  background-color: #25222290;
  z-index: 50;
  overflow: hidden;

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    // flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    .loader {
      position: flex;
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #26787c;
      width: 120px;
      height: 120px;
      -webkit-animation: spin 2s linear infinite; /* Safari */
      animation: spin 2s linear infinite;
    }

    /* Safari */
    @-webkit-keyframes spin {
      0% {
        -webkit-transform: rotate(0deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes spin {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
}
</style>