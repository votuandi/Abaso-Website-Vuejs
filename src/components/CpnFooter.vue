<template>
  <div class="footer">
    <ul class="info">
      <li>
        <p class="title">SERVICES</p>
        <p>FAQs</p>
        <p>Contact</p>
      </li>
      <li>
        <p class="title">COMPANY</p>
        <p>Hotline: <br />03666 96 008 - 094 79 150 79</p>
        <p>FB: www.facebook.com/abaso.vn</p>
        <p>Email: info@abaso.vn</p>
        <p>Address: <br />66I, Gò Cát, Phú Hữu, TP Thủ Đức, Hồ Chí Minh</p>
      </li>
      <li class="big-info">
        <p class="title">CÔNG TY TNHH GIẢI PHÁP TỰ ĐỘNG HÓA LÀM BÁNH ABASO</p>
        <p>
          Chúng tôi với hi vọng mang đến các giải pháp hữu ích giúp quý khách
          hàng là yêu thích công việc làm bánh có thể dễ dàng tiếp cận công việc
          kinh doanh cửa hàng bánh một cách dễ dàng và ít tốn sức lực nhất.
        </p>
        <p class="title">© 2022 Abaso Company. All rights reserved</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "CpnFooter",
};
</script>

<style lang="scss" scoped>
.footer {
  width: 100vw;
  background-color: #fff;
  border-top: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px 20px 250px 20px;

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style: none;

    p {
      margin-bottom: 15px;
      line-height: 1.5;

      &.title {
        font-weight: 600;
      }
    }

    .big-info {
      width: 30vw;
    }
  }

  @media (max-width: 900px) {
    padding: 50px 20px 50px 20px;
    .info {
      flex-direction: column;
      li {
        width: 90vw;
        margin-bottom: 30px;
        p {
          line-height: 1.2;
        }
        &.big-info {
          width: 90vw;
        }
      }
    }
  }
}
</style>