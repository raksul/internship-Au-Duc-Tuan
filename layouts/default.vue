<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

body {
  margin: 0;
  font-size: 16px;

  /* line-height: 1.5; */
}

a {
  text-decoration: none;
  color: black;
}

.container {
  max-width: 1024px;
  margin: auto;
}
.gradient {
  background: linear-gradient(to bottom right, #a8fff6, #16c0b0);
  box-shadow: 0 8px 20px -6px grey;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}

/* .row {
  display: flex;
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
} */

/* For responsive */

/* @media screen and (max-width: 710px) {
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
  .hide-desktop {
    display: none;
  }
} */
</style>
