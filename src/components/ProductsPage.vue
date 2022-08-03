<template>
  <div class="porducts-page">
    <CpnProductCard :cardData="cardData"></CpnProductCard>
  </div>
</template>

<script>
import jsonProducts from "@/assets/json/products.json";
import CpnProductCard from "./CpnProductCard.vue";
export default {
  name: "ProductsPage",
  components: {
    CpnProductCard,
  },
  data() {
    return {
      cardData: jsonProducts[0].sub[0],
    };
  },
};
</script>

<style>
video {
  width: 100vw;
}
</style>