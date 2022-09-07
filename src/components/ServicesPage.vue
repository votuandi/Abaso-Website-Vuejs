<template>
  <div class="services-page">
    <div class="dropdown">
      <CpnDropdown
        label="Chọn Dịch Vụ"
        :listItems="services"
        svName="selectedService"
        color="#65bcb6"
        v-on:selectedService="selectedService"
      />
    </div>
    <div class="services-container">
      <div class="empty" v-if="selectedSV == null"></div>
      <div class="hsds" v-if="selectedSV === 0">
        <HDSD />
      </div>
      <div class="csbh" v-if="selectedSV === 1">CHINH SACH BAO HANH</div>
      <div class="tool-kc" v-if="selectedSV === 2">
        <tool-page></tool-page>
      </div>
    </div>
  </div>
</template>

<script>
import ToolPage from "./ToolPage.vue";
import CpnDropdown from "./CpnDropdown.vue";
import HDSD from "./HDSD.vue";
export default {
  name: "ServicesPage",
  components: {
    ToolPage,
    CpnDropdown,
    HDSD,
  },
  data() {
    return {
      services: [
        "Hướng Dẫn Sử Dụng Máy",
        "Chính Sách Bảo Hành",
        "Tool Khắc Chữ 3D Lên Mặt Bánh",
      ],
      selectedSV: null,
    };
  },
  methods: {
    selectedService(ind) {
      this.selectedSV = ind;
    },
  },
};
</script>

<style lang="scss" scoped>
.services-page {
  padding-top: 80px;
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .dropdown {
    position: relative;
    align-items: center;
    justify-content: center;
    display: flex;
    width: 100vw;
    padding: 50px 10px 10px 10px;
    margin: 10px 50px;
  }

  .services-container {
    background-color: #fff;
    display: flex;
    width: 100vw;

    .empty {
      height: 500px;
    }

    .hdsd {
      height: 100vh;
      width: 100vw;
      align-items: center;
      justify-content: flex-start;
    }

    .csbh {
      height: 100vh;
      width: 100vw;
      text-align: center;
    }
  }
}
</style>