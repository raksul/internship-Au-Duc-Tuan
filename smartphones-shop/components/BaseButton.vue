<template>
  <div class="button-container">
    <div class="button -shadow">
      <fa icon="plus-square" />
    </div>
    <div>Register Product</div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.button {
  width: 55px;
  height: 38px;
  border: 1.5px solid black;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
}
</style>
