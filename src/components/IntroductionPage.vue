<template>
  <div class="introduction-page">
    <div class="made-in-vn">
      <img src="@/assets/img/MadeInVN-Logo.png" alt="" />
      <h2>SẢN XUẤT TẠI VIỆT NAM</h2>
      <p>
        Máy móc được thiết kế và chế tạo bởi kỹ sư trẻ của ABASO, thiết kế hiện
        đại, lắp ráp tại ABASO nên có thể dễ dàng hỗ trợ khách hàng khi cần.
      </p>
    </div>
    <div class="cards">
      <CpnCard
        class="card"
        :class="{ 'middle-card': card.id % 2 === 0 }"
        v-for="card in listCard"
        :key="card.id"
        :cardData="card"
      />
    </div>
    <div class="quotes">
      <splide :options="options">
        <splide-slide v-for="quote in listQuote" :key="quote.id">
          <CpnQuote class="quote" :quoteData="quote" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import CpnCard from "./CpnCard.vue";
import CpnQuote from "./CpnQuote.vue";
import jsonListCards from "@/assets/json/card.json";
import jsonListQuotes from "@/assets/json/quotes.json";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
export default {
  name: "IntroductionPage",
  created() {
    this.checkScreen();
  },
  components: {
    CpnCard,
    CpnQuote,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      listCard: jsonListCards,
      listQuote: jsonListQuotes,
      options: {
        rewind: true,
        width: "80vw",
        height: 300,
        gap: "1rem",
        loop: true,
        autoplay: true,
        arrows: false,
      },
    };
  },
  methods: {
    checkScreen() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth <= 1200) {
        this.options.height = 500;
        this.options.width = "100vw";
        return;
      }
      this.options.height = 300;
      this.options.width = "80vw";
      return;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@splidejs/splide/dist/css/themes/splide-default.min.css";
@import "@splidejs/splide/dist/css/themes/splide-sea-green.min.css";
@import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
.introduction-page {
  background-color: #ffffff;
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;

  .made-in-vn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 0;

    img {
      width: 220px;
      min-width: 100px;
    }

    h2 {
      font-family: "Times New Roman", Times, serif;
      font-weight: 500;
      margin: 10px 0;
    }

    p {
      font-family: "Trebuchet MS", sans-serif;
      text-align: center;
    }
  }

  .cards {
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    margin: 20px 0;

    .card:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }

    .middle-card {
      margin-top: 30px;
    }

    @media (max-width: 1200px) {
      flex-direction: column;
      .middle-card {
        margin: 30px 0;
      }
    }
  }
}
</style>