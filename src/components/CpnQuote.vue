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
      return require(`@/assets/img/${this.quoteData.src}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.quote {
  width: 100%;
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
    width: 800px;
    margin: 0 30px;
    padding-bottom: 80px;

    h2 {
      font-family: "Courier New", monospace;
      padding-bottom: 10px;
      font-size: 16px;
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

  @media (max-width: 1200px) {
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;

    .avt-auth {
      img {
        height: 300px;

        @media (max-width: 600px) {
          height: 150px;
        }
      }
    }

    .quote-text {
      width: 80vw;
      padding: 0 10px;

      @media (max-width: 600px) {
        h2 {
          font-family: "Courier New", monospace;
          padding-bottom: 5px;
          font-size: 10px;
        }

        p {
          text-align: center;
          padding-left: 0;
          font-family: Garamond, serif;
          font-weight: bold;
          font-size: 6px;
        }

        p.auth {
          font-size: 8px;
        }
      }
    }
  }
}
</style>