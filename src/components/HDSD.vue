<template>
  <div class="hdsd">
    <div class="dropdown">
      <CpnDropdown
        label="Chọn Máy"
        :listItems="machines.map((m) => m.name)"
        svName="selectMachine"
        color="#65bcb6"
        v-on:selectMachine="selectMachine"
      />
    </div>
    <div class="content" v-if="selectedMachine != null">
      <splide class="splider" :options="options">
        <splide-slide
          class="slider"
          v-for="(img, ind) in getListMachinePhotos()"
          :key="ind"
          c
        >
          <img :src="img" alt="" />
        </splide-slide>
      </splide>
    </div>
  </div>
</template>

<script>
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import CpnDropdown from "./CpnDropdown.vue";
import jsonHDSD from "@/assets/json/hdsd.json";
export default {
  name: "HDSD",
  beforeMount() {},
  components: {
    CpnDropdown,
    Splide,
    SplideSlide,
  },
  data() {
    return {
      machines: jsonHDSD,
      selectedMachine: null,
      options: {
        rewind: true,
        width: "600px",
        gap: "1rem",
        loop: true,
        padding: 0,
        arrows: false,
      },
    };
  },
  methods: {
    selectMachine(ind) {
      this.selectedMachine = ind;
    },
    getListMachinePhotos() {
      var machine = this.machines[this.selectedMachine];
      var photoFiles = [...Array(machine.amountPhoto).keys()].map((m) =>
        require(`@/assets/img/HDSD/${machine.code}-${m}.jpg`)
      );
      return photoFiles;
    },
  },
};
</script>

<style lang="scss" scoped>
.hdsd {
  width: 100vw;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .content {
    align-items: center;
    justify-content: center;

    .splider {
      // background-color: aqua;
      width: 100vw;
      padding: 3rem 0 !important;

      .slider {
        align-items: center;
        justify-content: center;
        img {
          width: 500px;

          @media (max-width: 500px) {
            width: 100vw;
          }
        }
      }
    }
  }
}
</style>