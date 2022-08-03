<template>
  <div class="services-menu">
    <ul>
      <li>
        <div class="sv-image">
          <img src="@/assets/img/ABS-SSM01.jpg" alt="" />
        </div>
        <div class="sv-label">
          <p class="label-text-1">Hướng dẫn sử dụng</p>
          <p class="label-text-2">Máy chà láng bánh kem</p>
          <p class="label-text-3">Model ABS - SSM01</p>
        </div>
      </li>
      <li>
        <div class="sv-image">
          <img src="@/assets/img/ABS-SSM02.jpg" alt="" />
        </div>
        <div class="sv-label">
          <p class="label-text-1">Hướng dẫn sử dụng</p>
          <p class="label-text-2">Máy chà láng bánh kem</p>
          <p class="label-text-3">Model ABS - SSM02</p>
        </div>
      </li>
      <li>
        <router-link class="label-link" :to="{ name: 'Services' }">
          <div class="sv-image">
            <img src="@/assets/img/tool-text2stl.png" alt="" />
          </div>
          <div class="sv-label">
            <p class="label-text-1">Trãi nghiệm</p>
            <p class="label-text-2">Khắc chữ 3D</p>
            <p class="label-text-1">Lên mặt bánh</p>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ServicesMenu",
};
</script>

<style lang="scss" scoped>
.services-menu {
  position: relative;
  background-color: #fff;
  max-width: 100vw;
  height: 250px;
  align-items: center;
  padding-top: 40px;

  ul {
    list-style: none;
    width: 100%;
    padding-left: 15vw;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    .label-link {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-decoration: none;
    }

    li {
      height: 200px;
      width: 300px;
      min-width: 200px;
      margin: 0 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      border-radius: 10px;

      .sv-image {
        display: flex;
        align-items: center;

        img {
          height: 200px;
          border-radius: 10px;
        }
      }

      .sv-label {
        align-self: flex-start;
        margin: 10px 2px 2px 2px;

        p {
          color: #26787c;
          margin: 5px 0;
        }

        .label-text-1 {
          font-size: 12px;
          font-weight: 500;
        }

        .label-text-2 {
          font-size: 20px;
          font-weight: 600;
        }

        .label-text-3 {
          font-size: 10px;
          font-weight: 500;
          padding-left: 30px;
        }
      }
      -webkit-animation-name: slideInUp;
      animation-name: slideInUp;
      -webkit-animation-duration: 2s;
      animation-duration: 2s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
    }
    @-webkit-keyframes slideInUp {
      0% {
        -webkit-transform: translateY(20%);
        transform: translateY(20%);
        visibility: visible;
      }
      20% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }
    @keyframes slideInUp {
      0% {
        -webkit-transform: translateY(20%);
        transform: translateY(20%);
        visibility: visible;
      }
      20% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
      }
    }

    li:hover {
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2),
        0 6px 20px 0 rgba(0, 0, 0, 0.19);
    }
  }
}
</style>