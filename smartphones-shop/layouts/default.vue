<template>
  <div>
    <Header />
    <div class="container">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
html {
  -webkit-text-size-adjust: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  line-height: 1.5;
}
.container {
  width: 90%;
  margin: auto;
}
.gradient {
  background: linear-gradient(to bottom right, #a8fff6, #16c0b0);
  box-shadow: 0 8px 20px -6px grey;
}
.-shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.info-column1 {
  width: 10%;
}
.info-column2 {
  width: 20%;
}
.info-column3 {
  width: 30%;
}

/* For responsive */
@media screen and (max-width: 710px) {
  .product-card-img {
    display: none;
  }
  .product-card {
    justify-content: center;
  }
  .product-card-info {
    width: 100%;
    margin-bottom: 17px;
  }
  .side-label {
    display: none;
  }
  .info-column3 {
    width: 40%;
  }
  .info-column1 {
    width: 20%;
  }
  .header-container > div {
    display: none;
  }
  .hide {
    display: none;
  }
}
</style>
