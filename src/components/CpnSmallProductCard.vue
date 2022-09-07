<template>
  <div class="s-product-card">
    <router-link
      ref="goToDetail"
      class="nav-link"
      :to="{
        name: 'ProductDetail',
        params: { productId: pdData.id.toString() },
      }"
      ><div class="image">
        <img :src="getSrc" alt="" />
      </div>
      <div class="texts">
        <h2>{{ `${pdData.name} ${pdData.version ? pdData.version : ""}` }}</h2>
        <div class="prices">
          <h3 class="origin-price">{{ getPrices[0] }}</h3>
          <h3 class="final-price">{{ getPrices[1] }}</h3>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SmallProductCard",
  props: {
    pdData: {
      type: Object,
      default: null,
    },
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(price);
    },
  },
  computed: {
    getSrc() {
      return require(`@/assets/img/${this.pdData.sub[0].src}`);
    },
    getPrices() {
      let originPrices = this.pdData.sub.map((s) => s.price.origin);
      let finalPrices = this.pdData.sub.map((s) => s.price.final);
      let op = `${this.formatPrice(
        Math.min(...originPrices)
      )} ~ ${this.formatPrice(Math.max(...originPrices))}`;
      let fp = `${this.formatPrice(
        Math.min(...finalPrices)
      )} ~ ${this.formatPrice(Math.max(...finalPrices))}`;
      return [op, fp];
    },
  },
};
</script>

<style lang="scss" scoped>
.s-product-card {
  background-color: #fff;
  height: 340px;
  width: 240px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  text-decoration-line: none;

  .nav-link {
    text-decoration: none;

    .image {
      // background-color: burlywood;
      width: 240px;
      height: 240px;
      position: relative;
      display: flex;
      border-radius: 5px;

      img {
        width: 240px;
        height: 240px;
        border-radius: 5px;
      }
    }

    .texts {
      // background-color: blue;
      width: 240px;
      height: 100px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px 10px 5px 10px;

      h2 {
        font-family: Verdana, sans-serif;
        font-size: 18px;
        font-weight: 600;
        line-height: 1;
        color: darkolivegreen;
        margin: 0;
        text-align: center;
        text-decoration: none;
      }

      .prices {
        .origin-price {
          font-family: "Roboto", sans-serif;
          color: #666;
          font-weight: 400;
          font-size: 14px;
          margin-top: 10px;
          text-decoration-line: line-through;
        }
        .final-price {
          font-family: "Roboto", sans-serif;
          color: red;
          font-weight: 600;
          font-size: 17px;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>