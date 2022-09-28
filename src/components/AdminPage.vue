<template>
  <div class="admin-page">
    <div class="admin-menu">
      <div class="menu-nav">
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
        <button class="btn-login btn-color" @click="logout()">Log Out</button>
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
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
export default {
  name: "AdminPage",
  data() {
    return {
      showMoreMenu: false,
      selectedItem: 0,
    };
  },
  async beforeCreate() {
    let jwt = localStorage.getItem("jwt");
    if (jwt.length == 0) {
      alert("Bạn chưa đăng nhập!");
      this.$router.push({ name: "LogIn" });
    } else {
      await axios
        .post(backendUrl.urls.VERITY_TOKEN_FULL_PATH, {
          token: jwt,
        })
        .then((res) => {
          console.log(res);
          if (res.data.isTrueToken) {
            console.log(`Hello Admin ${localStorage.getItem("user").username}`);
          } else {
            alert("Bạn chưa đăng nhập!");
            this.$router.push({ name: "LogIn" });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  methods: {
    onSelectItem(_value) {
      this.selectedItem = _value;
    },
    logout() {
      if (confirm("Bạn muốn đăng xuất?")) {
        localStorage.setItem("user", null);
        localStorage.setItem("jwt", "");

        this.$router.push({ name: "LogIn" });
      }
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

    .menu-nav {
      width: 100vw;
      display: flex;
      flex-direction: row;
      .memu-title {
        flex: 1 0 auto;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        align-self: center;

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
      .btn-login {
        width: fit-content;
        padding: 0.7rem 1rem;
        font-size: 14px;
        font-weight: 600;
        margin: 0.5rem 0;
        color: #fff;
        cursor: pointer;
        text-align: center;
        border: none;
        background-size: 300% 100%;
        border-radius: 50px;
        moz-transition: all 0.4s ease-in-out;
        -o-transition: all 0.4s ease-in-out;
        -webkit-transition: all 0.4s ease-in-out;
        transition: all 0.4s ease-in-out;
        margin-right: 2rem;

        &:hover {
          background-position: 100% 0;
          moz-transition: all 0.4s ease-in-out;
          -o-transition: all 0.4s ease-in-out;
          -webkit-transition: all 0.4s ease-in-out;
          transition: all 0.4s ease-in-out;
        }

        &:focus {
          outline: none;
        }
      }

      .btn-color {
        background-image: linear-gradient(
          to right,
          #fc6076,
          #ff9a44,
          #ef9d43,
          #e75516
        );
        box-shadow: 0 4px 15px 0 rgba(252, 104, 110, 0.75);
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