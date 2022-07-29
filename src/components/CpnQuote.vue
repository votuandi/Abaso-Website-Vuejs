<template>
  <div class="quote">
    <div class="avt-auth">
      <img :src="getSrc" alt="" />
    </div>
    <div class="quote-text">
      <h2>"{{ quoteData.quote }}"</h2>
      <p class="auth">- {{ quoteData.auth }} -</p>
      <p>{{ quoteData.pos }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CpnQuote",
  props: {
    quoteData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    getSrc() {
      return require(`@/assets/${this.quoteData.src}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.quote {
  width: 100vw;
  height: 400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .avt-auth {
    display: flex;
    align-items: center;

    img {
      height: 400px;
    }
  }

  .quote-text {
    width: 600px;
    margin: 0 40px;
    padding-bottom: 80px;

    h2 {
      font-family: "Courier New", monospace;
      padding-bottom: 10px;
    }

    p {
      text-align: center;
      padding-left: 35%;
      font-family: Garamond, serif;
      font-weight: bold;
    }

    p.auth {
      font-size: 18px;
    }
  }
}
</style>