<template>
  <div class="gradient">
    <div class="header">
      <div></div>
      <nuxt-link to="/"
        ><img src="@/assets/smartphone.png" alt="logo" class="logo" />
      </nuxt-link>
      <fa icon="cog" class="setting-icon" />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.header {
  width: 90%;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  display: flex;
  flex-direction: row;
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
