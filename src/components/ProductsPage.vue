<template>
  <div class="products-page">
    <div class="search-n-filter">
      <div class="seach-bar">
        <input
          type="text"
          class="inp-search"
          placeholder="Search..."
          v-model="inpSearchContent"
        />
        <button class="btn-search" v-on:click="sendSearchContent">
          <font-awesome-icon class="icon-search" icon="search" color="#fff" />
        </button>
      </div>

      <div class="filters">
        <div class="price-filter">
          <button
            v-for="(item, ind) in priceChecklist"
            :key="ind"
            :class="{ 'checked-price': item.isChecked }"
            @click="onCheckPrice(ind)"
          >
            {{ item.text }}
          </button>
        </div>
      </div>
    </div>

    <div class="products-container">
      <CpnSmallProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
        :pdData="product"
        @click="gotoDetail()"
      />
    </div>
  </div>
</template>

<script>
import jsonProducts from "@/assets/json/products.json";
import CpnSmallProductCard from "./CpnSmallProductCard.vue";
import jsonFilters from "@/assets/json/filter.json";
import { toRaw } from "@vue/reactivity";
import backendUrl from "@/configs/backendUrl";
import axios from "axios";
export default {
  name: "ProductsPage",
  components: { CpnSmallProductCard },
  async beforeMount() {
    await axios.get(backendUrl.urls.GET_ALL_PRODUCTS_PATH_FULL).then((res) => {
      this.getListProduct(res.data);
    });
  },
  data() {
    return {
      priceChecklist: jsonFilters.prices,
      listProduct: jsonProducts,
      filteredProducts: [],
    };
  },
  methods: {
    getListProduct(_products) {
      this.listProduct = _products;
    },
    onCheckPrice(ind) {
      this.priceChecklist[ind].isChecked = !this.priceChecklist[ind].isChecked;
      this.setFilteredProducts();
    },
    setFilteredProducts() {
      //List Selected Prices
      let selectedPrices = JSON.parse(JSON.stringify(this.priceChecklist))
        .filter((p) => p.isChecked == true)
        .map((p) => p.value);

      if (selectedPrices.length === 0) {
        this.filteredProducts = this.listProduct;
        return;
      }
      this.filteredProducts = this.listProduct
        .filter((p) => this.filterByPrice(selectedPrices, p))
        .map((p) => JSON.parse(JSON.stringify(p)));
    },
    filterByPrice(filter, product) {
      product = JSON.parse(JSON.stringify(product));
      const finalPrice = this.getFinalPrice(product.sub);
      let isTrue = false;
      filter.forEach((p) => {
        if (
          (finalPrice[0] > p[0] && finalPrice[0] < p[1]) ||
          (finalPrice[1] > p[0] && finalPrice[1] < p[1])
        ) {
          isTrue = true;
        }
      });
      return isTrue;
    },
    getFinalPrice(subs) {
      console.log(subs);
      let finalPrices = subs.map((s) => s.final_price);
      return [Math.min(...finalPrices), Math.max(...finalPrices)];
    },
    gotoDetail() {
      console.log(toRaw(this.$refs.goToDetail));
    },
  },
};
</script>

<style lang="scss" scoped>
.products-page {
  background-color: #fff;
  // height: 100vh;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 90px 0;

  .search-n-filter {
    // background-color: #00bfff;
    // height: 500px;
    width: 100vw;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;

    .seach-bar {
      height: 36px;
      width: 260px;
      background-color: #fff;
      border-radius: 36px;
      border: 1px solid rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: stretch;
      padding: 0.1875rem;

      &:focus-within {
        background-color: #fff;
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 4px 8px 0 rgba(0, 0, 0, 0.19);
      }

      .inp-search {
        font-size: 14px;
        width: 90%;
        padding-left: 10px;
        border: 1px solid rgba(255, 255, 255, 0);
        border-radius: 20px;

        &:focus {
          outline: none !important;
          // background-color: rgba(0, 0, 0, 0.03);
        }
      }

      .btn-search {
        // background-color: #1e90ff;
        background-color: #fff;
        width: 36px;
        border: 1px solid #fff;
        border-radius: 20px;
        font-size: 14px;
        font-weight: bold;

        .icon-search {
          color: rgba(0, 0, 0, 0.8);
        }

        &:hover {
          background-color: #97d18c;
          .icon-search {
            color: #fff;
          }
        }

        &:active {
          box-shadow: inset -2px -2px 3px rgba(255, 255, 255, 0.6),
            inset 2px 2px 3px rgba(0, 0, 0, 0.6);
        }
      }
    }

    .filters {
      width: 100vw;
      padding: 20px 0;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .price-filter {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        button {
          height: 28px;
          width: 100px;
          margin: 0 5px;
          border: 1px;
          border-radius: 10px;

          &:hover {
            box-shadow: inset -1px -1px 2px rgba(255, 255, 255, 0.6),
              inset 1px 1px 2px rgba(0, 0, 0, 0.3);
          }
        }

        .checked-price {
          background-color: #a8e89b;
        }
      }
    }
  }

  .products-container {
    // background-color: blueviolet;
    width: 80vw;
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 30px 0;

    .product-card {
      margin: 10px;

      &:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
          0 6px 20px 0 rgba(0, 0, 0, 0.19);
      }
    }
  }
}
</style>