<template>
  <div class="drop-down" :style="cssVars" @click="changeShowItems">
    <button class="btnLabel">
      {{ selectedItem == null ? label : listItems[selectedItem] }}
    </button>
    <ul class="list-items" v-if="showItems">
      <li
        v-for="(item, ind) in listItems"
        :key="ind"
        :class="classSelect(ind)"
        @click="selectItem(ind)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CpnDropdown",
  props: {
    label: {
      type: String,
      default: null,
    },
    listItems: {
      type: Object,
      default: null,
    },
    svName: {
      type: String,
      default: null,
    },
    color: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      showItems: false,
      selectedItem: null,
    };
  },
  methods: {
    changeShowItems() {
      this.showItems = !this.showItems;
    },
    selectItem(ind) {
      this.selectedItem = ind;
      if (this.svName) {
        this.$emit(this.svName, ind);
      }
    },
    classSelect(ind) {
      return { selected: ind === this.selectedItem };
    },
  },
  computed: {
    cssVars() {
      return {
        "--color": this.color,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;
  width: 270px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  .btnLabel {
    background-color: var(--color);
    position: relative;
    padding: 6px 12px;
    border: 0.5px solid #fff;
    border-radius: 20px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }

  ul {
    position: relative;
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;

    li {
      background-color: #fff;
      width: 90%;
      margin: 1px 0;
      padding: 5px 12px;
      border: 0.2px solid rgba(#666, 0.5);
      border-radius: 10px;
      font-size: 16px;
      text-align: center;
    }

    .selected {
      background-color: rgba($color: #000000, $alpha: 0.25);
    }

    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
}
</style>