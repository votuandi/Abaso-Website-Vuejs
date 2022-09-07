<template>
  <div class="admin-page">
    <div class="admin-menu">
      <div class="memu-title">
        <h1>ADMIN</h1>
        <button
          class="show-more"
          @click="
            {
              this.showMoreMenu = !this.showMoreMenu;
            }
          "
        >
          <font-awesome-icon class="icon-more" icon="bars" />
        </button>
      </div>
      <div class="menu-items" v-show="showMoreMenu">
        <button
          :class="{ selected: this.selectedItem === 0 }"
          @click="onSelectItem(0)"
        >
          Quản lý sản phẩm
        </button>
        <button
          :class="{ selected: this.selectedItem === 1 }"
          @click="onSelectItem(1)"
        >
          Quản lý blogs</button
        ><button
          :class="{ selected: this.selectedItem === 2 }"
          @click="onSelectItem(2)"
        >
          Quản lý Q&A
        </button>
      </div>
    </div>
    <div class="admin-workspace">
      <AdminProductManager v-if="this.selectedItem === 0" />
      <AdminBlogManager v-if="this.selectedItem === 1" />
      <AdminQAManager v-if="this.selectedItem === 2" />
    </div>
  </div>
</template>

<script>
import AdminProductManager from "./AdminProductManager.vue";
import AdminBlogManager from "./AdminBlogManager.vue";
import AdminQAManager from "./AdminQAManager.vue";
export default {
  name: "AdminPage",
  data() {
    return {
      showMoreMenu: false,
      selectedItem: 0,
    };
  },
  methods: {
    onSelectItem(_value) {
      this.selectedItem = _value;
    },
  },
  components: { AdminProductManager, AdminBlogManager, AdminQAManager },
};
</script>

<style lang="scss" scoped>
.admin-page {
  background-color: #fff;
  height: 100%;
  width: 100vw;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 75px 0 0 0;

  .admin-menu {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .memu-title {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      .show-more {
        background-color: #fff;
        margin-left: 10px;
        font-size: 20px;
        height: 30px;
        width: 30px;
        border: 0px;

        .icon-more {
          color: #666;

          &:hover {
            color: rgb(218, 218, 218);
            cursor: pointer;
          }
        }
      }
    }

    .menu-items {
      width: 100vw;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      button {
        height: 28px;
        width: 150px;
        margin: 0 10px;
        border: 1px;
        border-radius: 10px;

        &:hover {
          box-shadow: inset -1px -1px 2px rgba(255, 255, 255, 0.6),
            inset 1px 1px 2px rgba(0, 0, 0, 0.3);
        }
      }
      .selected {
        background-color: #a8e89b;
      }
    }
  }

  .admin-workspace {
    width: 100vw;
  }
}
</style>