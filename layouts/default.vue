<template>
  <div>
    <Header />
    <Nuxt class="container" />
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
}

a {
  text-decoration: none;
  color: black;
}

.container {
  max-width: 1024px;
  margin: auto;
  padding-left: 20px;
  padding-right: 20px;
}
.gradient {
  background: linear-gradient(to bottom right, #a8fff6, #16c0b0);
  box-shadow: 0 8px 20px -6px grey;
}
.shadow {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.13);
}

/* override the Toastification color */
.Vue-Toastification__toast--default {
  background-color: #2195f3e8;
  color: #fff;
}
.Vue-Toastification__toast--info {
  background-color: #2195f3e8;
  color: #fff;
}
.Vue-Toastification__toast--success {
  background-color: #4caf4fe1;
  color: #fff;
}
.Vue-Toastification__toast--error {
  background-color: #e91e63;
  color: #fff;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}
.col-md-1 {
  width: 10%;
}
.col-md-2 {
  width: 20%;
}
.col-md-3 {
  width: 30%;
}

/* For responsive */
@media screen and (max-width: 768px) {
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
  .col-xs-2 {
    width: 20%;
  }
  .col-xs-4 {
    width: 40%;
  }
  .hide-mobile {
    display: none;
  }
}
</style>
