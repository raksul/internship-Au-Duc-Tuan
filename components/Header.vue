<template>
  <div class="gradient">
    <div class="header">
      <nuxt-link to="/"
        ><img src="~/assets/smartphone.png" alt="logo" class="logo" />
      </nuxt-link>
    </div>
  </div>
</template>

<style>
.header {
  max-width: 1024px;
  margin: auto auto 30px auto;
  justify-content: center;
  align-items: center;
  display: flex;
  padding: 7px 10px;
}
.logo {
  width: 57px;
  height: 57px;
  transition: all 0.6s linear;
}
.logo:hover {
  transform: scale(1.15);
}
.setting-icon {
  font-size: 33px;
  color: rgb(0, 0, 0);
}
.setting-icon:hover {
  cursor: pointer;
}
</style>
