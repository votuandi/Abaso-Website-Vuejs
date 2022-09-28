<template>
  <div class="login">
    <img src="@/assets/img/logo_small_1.png" alt="" />
    <div class="form">
      <input type="text" placeholder="User Name" v-model="input.username" />
      <input type="password" placeholder="Password" v-model="input.password" />
      <button class="btn-login btn-color" @click="login()">Log In</button>
    </div>
  </div>
</template>

<script>
import bcrypt from "bcryptjs";
import axios from "axios";
import backendUrl from "@/configs/backendUrl";
// import * as dotenv from "dotenv";
// dotenv.config();
export default {
  name: "LogIn",
  data() {
    return {
      input: {
        username: "",
        password: "",
      },
    };
  },
  async beforeCreate() {
    let jwt = localStorage.getItem("jwt");
    await axios
      .post(backendUrl.urls.VERITY_TOKEN_FULL_PATH, {
        token: jwt,
      })
      .then((res) => {
        console.log(res);
        if (res.data.isTrueToken) {
          this.$router.push({ name: "Admin" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(jwt);
  },
  methods: {
    async login() {
      var hashPassword = await bcrypt.hash(
        this.input.password,
        process.env.SALT
      );
      await axios
        .post(backendUrl.urls.LOGIN_FULL_PATH, {
          username: this.input.username,
          password: hashPassword,
        })
        .then((res) => {
          if (res.status != null && res.data.user != null) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("jwt", res.data.token);
            console.log("Login Succesfully!");
            this.$router.push({ name: "Admin" });
          } else {
            alert("Đăng nhập không thành công!");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 20rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    input {
      width: 20vw;
      padding: 0.7rem 1rem;
      border: 0.5px solid #177a7c;
      border-radius: 1rem;
      font-size: 14px;
      margin: 0.25rem 0;

      &:focus {
        background-color: #30dd8962;
      }
    }

    .btn-login {
      width: 20vw;
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
        #25aae1,
        #40e495,
        #30dd8a,
        #2bb673
      );
      box-shadow: 0 4px 15px 0 rgba(49, 196, 190, 0.75);
    }
  }
}
</style>