<template>
  <div class="product-container">
    <div class="product-card">
      <div class="card-img">
        <img
          src="https://bestof.nyc3.digitaloceanspaces.com/devsnap.me/sam/product-card-2.gif"
        />
      </div>

      <div class="card-info">
        <h2 class="name">
          Simple
          <br />
          Gray
        </h2>
        <div class="prices">
          <h3 class="price origin-price">$99.99</h3>
          <h3 class="price final-price">$99.99</h3>
        </div>
        <span class="rating">
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
          <i class="fa fa-star"></i>
        </span>
        <p></p>
      </div>

      <div class="card-description">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          viverra ornare eros in imperdiet.
        </p>

        <div class="prod-quant">
          <span>Quantity</span>
          <span class="prod-qty">
            <i class="fa fa-angle-left remove"></i>
            <span class="qty-value">
              <span>1</span>
            </span>
            <i class="fa fa-angle-right add"></i>
          </span>
        </div>

        <div class="prod-cta-order">
          <h4 class="cta-text">
            <i class="fa fa-cart-plus"></i>
            ADD TO CART
          </h4>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CpnTest",
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.product-container {
  width: 100%;
  height: auto;
  background: #eeeeee;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Roboto", sans-serif;
  font-weight: 300;
  overflow: auto;

  &:before {
    content: "";
    position: fixed;
    width: 650px;
    height: 800px;
    top: -100px;
    left: -140px;
    background: #d5685e;
    border-radius: 50%;
  }

  .product-card {
    width: 400px;
    height: 450px;
    max-width: 650px;
    min-height: 400px;
    max-height: 450px;
    background: white;
    box-shadow: 0px 5px 6px -3px rgba(0, 0, 0, 0.5);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px 0;
    transition: all 0.4s ease-in 0.2s;
    z-index: 999;
    &:hover {
      width: 650px;
      .card-img {
        right: 225px;
      }
      .card-description {
        opacity: 1;
        right: 0%;
      }
    }

    .card-img {
      width: 200px;
      height: 100%;
      position: absolute;
      right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.4s ease-in 0.2s;
      img {
        width: 250px;
        height: auto;
      }
    }

    .card-info {
      // background: red;
      transition: all 0.6s ease-in 0.2s;
      position: absolute;
      left: 0%;
      top: 0;
      bottom: 0;
      width: 200px;
      display: flex;
      padding-left: 25px;
      justify-content: center;
      flex-direction: column;
      .name {
        font-family: "Roboto", sans-serif;
        font-size: 56px;
        font-weight: 900;
        line-height: 1;
        color: #666;
        margin: 0;
      }
      .prices {
        display: flex;
        flex-direction: column;

        .price {
          background-color: red;
          font-family: "Roboto", sans-serif;
          color: #666;
          font-weight: 400;
          font-size: 16px;
          margin: 10px 0;
        }
        .origin-price {
          text-decoration-line: line-through;
        }
      }

      .rating i {
        color: #d5685e;
        font-size: 14px;
      }
    }

    .card-description {
      //background: red;
      transition: all 0.5s ease-in 0.1s;
      position: absolute;
      right: -100%;
      opacity: 0;
      top: 0;
      bottom: 0;
      width: 200px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding-right: 15px;
      p {
        text-align: center;
        padding: 0 10px;
        font-family: "Roboto", sans-serif;
        color: #666;
        font-weight: 300;
        font-size: 14px;
      }
      .prod-quant {
        border-top: 1px solid #d5685e;
        width: 60%;
        padding: 8px 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          font-size: 15px;
          font-weight: 400;
          color: #888;
          text-align: center;
        }
        .prod-qty {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 8px;
          i {
            font-size: 14px;
          }
          .add,
          .remove {
            cursor: pointer;
            transition: all 0.2s ease-in;
            background: #666;
            color: white;
            border: none;
            &:hover {
              background: #d5685e;
            }
          }
          .add {
            border-left: none;
            width: 25px;
            height: 25px;
            border-top-right-radius: 3px;
            border-bottom-right-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
          }
          .remove {
            border-top-left-radius: 3px;
            border-bottom-left-radius: 3px;
            border-right: none;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
          }
          .qty-value {
            background: #f6f6f6;
            border: 1px solid #d8d8d8;
            min-width: 40px;
            width: auto;
            height: 25px;
            //border-radius: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            margin: 0;
            span {
              color: #666;
              font-size: 14px;
              padding: 0;
              margin: 0;
            }
          }
        }
      }

      .prod-cta-order {
        background: #d5685e;
        padding: 8px 15px;
        margin: 8px 0 0 0;
        border-radius: 0px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
        vertical-align: middle;
        &:hover {
          background: darken(#d5685e, 10%);
        }
        h4 {
          margin: 0;
          color: white;
          pading: 10px;
          i {
            margin-right: 4px;
          }
        }
      }
    }
  }
}

@keyframes slide-in {
  0% {
    transform: rotateY(-90deg);
  }
  100% {
    transform: rotateY(0deg);
  }
}
</style>