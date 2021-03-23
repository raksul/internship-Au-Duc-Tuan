<template>
  <div class="search -shadow">
    <input type="text" placeholder="Search..." />
    <fa icon="search" class="search-icon" />
  </div>
</template>

<script>
export default {}
</script>

<style>
.search {
  border: 1.5px solid black;
  border-radius: 10px;
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
}
.search input[type='text'] {
  border: none;
}
.search input[type='text']:focus {
  outline: none;
}
.search-icon:hover {
  cursor: pointer;
}
</style>
