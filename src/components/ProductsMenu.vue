<template>
  <div class="products-menu">
    Products Menu
    <ul>
      <li></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductsMenu",
};
</script>

<style lang="scss" scoped>
.products-menu {
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: #fff;
  max-width: 100vw;
  height: 200px;
  align-items: center;
  justify-content: center;

  ul {
    list-style: none;
  }
}
</style>