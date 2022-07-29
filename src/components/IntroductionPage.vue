<template>
  <div class="introduction-page">
    <div class="made-in-vn">
      <img src="@/assets/MadeInVN-Logo.png" alt="" />
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
      <CpnQuote
        class="quote"
        v-for="quote in listQuote"
        :key="quote.id"
        :quoteData="quote"
      />
    </div>
  </div>
</template>

<script>
import CpnCard from "./CpnCard.vue";
import CpnQuote from "./CpnQuote.vue";
import jsonListCards from "@/assets/json/card.json";
import jsonListQuotes from "@/assets/json/quotes.json";
export default {
  name: "IntroductionPage",
  components: {
    CpnCard,
    CpnQuote,
  },
  data() {
    return {
      listCard: jsonListCards,
      listQuote: jsonListQuotes,
    };
  },
};
</script>

<style lang="scss" scoped>
.introduction-page {
  background-color: #ffffff;
  height: 100vh;
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
  }
}
</style>