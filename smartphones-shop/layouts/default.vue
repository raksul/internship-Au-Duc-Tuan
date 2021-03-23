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
  width: 95%;
  margin: auto;
}
.gradient {
  background: linear-gradient(to right, #16c0b0, #84cf6a);
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
  margin: 15px 0;
}
</style>
