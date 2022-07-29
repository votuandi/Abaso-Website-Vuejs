<template>
  <div class="card">
    <div class="card-img">
      <img :src="getSrc" alt="" />
    </div>
    <div class="card-info">
      <h3>{{ cardData.title }}</h3>
      <p>{{ cardData.detail }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CpnCard",
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    getSrc() {
      return require(`@/assets/${this.cardData.src}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  height: 250px;
  width: 400px;
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;

  .card-img {
    display: flex;
    align-items: center;

    img {
      height: 250px;
      border-radius: 10px;
    }
  }

  .card-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 0 5px;

    h3 {
      font-weight: 500;
    }

    p {
      font-size: 15px;
    }
  }
}
</style>