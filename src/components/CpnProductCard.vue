<template>
  <div class="product-card">
    <div class="card-info">
      <div class="card-img">
        <img :src="getSrc" />
      </div>
      <div class="info">
        <h2 class="name">{{ cardData.name }}</h2>
        <ul>
          <li class="prices">
            <h3 class="origin-price">
              {{ formatPrice[0] }}
            </h3>
            <h3 class="final-price">
              {{ formatPrice[1] }}
            </h3>
          </li>
          <li>
            <span class="rating">
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
              <i class="fa fa-star"></i>
            </span>
          </li>
        </ul>
      </div>

      <p></p>
    </div>

    <div class="card-description">
      <ul class="list-card-detail">
        <li v-for="(intro, ind) in cardData.intro" :key="ind">{{ intro }}</li>
      </ul>

      <div class="view-detail">
        <h4 class="cta-text">
          <i class="fa fa-cart-plus"></i>
          Xem chi tiết
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //   beforeMount() {
  //     console.log(this.cardData);
  //   },
  name: "CpnCard",
  props: {
    cardData: {
      type: Object,
      default: null,
    },
  },
  computed: {
    getSrc() {
      return require(`@/assets/img/${this.cardData.src}`);
    },
    formatPrice() {
      let op = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.cardData.price.origin);

      let fp = new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "VND",
      }).format(this.cardData.price.final);

      return [op, fp];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@splidejs/splide/dist/css/themes/splide-default.min.css";
@import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
@import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";

.product-card {
  width: 400px;
  height: 100%;
  max-width: 700px;
  min-height: 530px;
  background: white;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 5px;
  box-shadow: 3px 5px 6px -3px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin: 15px 0;
  transition: all 0.4s ease-in 0.2s;
  z-index: 100;
  &:hover {
    width: 700px;
    .card-description {
      opacity: 1;
      right: 0%;
    }
  }

  .card-info {
    // background: red;
    transition: all 0.6s ease-in 0.2s;
    position: absolute;
    left: 0%;
    top: 0;
    bottom: 0;
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .card-img {
      //   background-color: #d5685e;
      width: 400px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease-in 0.2s;
      img {
        width: 400px;
        height: auto;
      }
    }
    .info {
      //   background-color: #65bcb6;
      padding-left: 25px;
      display: flex;
      flex-direction: column;
      margin-top: 20px;

      .name {
        font-family: Verdana, sans-serif;
        font-size: 40px;
        font-weight: 900;
        line-height: 1;
        color: darkolivegreen;
        margin: 0;
      }

      ul {
        list-style: none;

        .prices {
          // background-color: #d5685e;

          .origin-price {
            font-family: "Roboto", sans-serif;
            color: #666;
            font-weight: 400;
            font-size: 16px;
            margin-top: 10px;
            text-decoration-line: line-through;
          }
          .final-price {
            font-family: "Roboto", sans-serif;
            color: red;
            font-weight: 600;
            font-size: 26px;
            margin-bottom: 10px;
          }
        }
      }

      .rating i {
        color: #d5685e;
        font-size: 14px;
      }
    }
  }

  .card-description {
    //background: red;
    transition: all 0.5s ease-in 0.1s;
    position: absolute;
    right: -100%;
    opacity: 0;
    top: 0;
    bottom: 0;
    width: 270px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px 10% 0;

    .list-card-detail {
      li {
        font-family: Verdana, sans-serif;
        font-weight: 100;
        margin-bottom: 15px;
        line-height: 1.5;
        word-spacing: 1px;
      }
    }

    p {
      text-align: center;
      padding: 0 10px;
      color: #666;
      font-weight: 300;
      font-size: 14px;
    }

    .view-detail {
      background: #65bcb6;
      padding: 8px 15px;
      margin: 8px 0 0 0;
      border-radius: 0px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      vertical-align: middle;
      &:hover {
        background: darken(#65bcb6, 10%);
      }
      h4 {
        margin: 0;
        color: white;
        pading: 10px;
        i {
          margin-right: 4px;
        }
      }
    }
  }
}

@keyframes slide-in {
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>