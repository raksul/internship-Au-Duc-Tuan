<template>
  <div class="button-container">
    <button class="btn btn-primary">
      <span></span>
      <span><fa :icon="icon" /></span>
    </button>
    <span class="side-label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: false,
      default: '',
    },
  },
}
</script>

<style>
.button-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.side-label {
  font-size: 25px;
}
:root {
  --bg-body: #1a1a2e;
  --bg-btn-primary: #44cec0;
  --bg-btn-danger: #e91e63;
  --color-btn: #fff;
}

.btn {
  --btn-height: 40px;
  --translate: -10px;
  height: var(--btn-height);
  width: calc(var(--btn-height) * 2.7);
  color: var(--color-btn);
  border: none;
  outline: none;
  font-size: 45px;
  cursor: pointer;
  position: relative;
  background-color: transparent;
  margin-right: 10px;
}
.btn-primary span {
  font-size: 25px;
  background-color: var(--bg-btn-primary);
}

.btn-danger span {
  background-color: var(--bg-btn-danger);
}

.btn span {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
}

.btn > span:nth-child(2) {
  display: grid;
  place-items: center;
  transform: translate(var(--translate), var(--translate));
  transition: transform 0.2s ease-in-out;
}

.btn > span:nth-child(1) {
  opacity: 0.6;
}

.btn:hover > span:nth-child(2) {
  transform: translate(calc(var(--translate) / 2), calc(var(--translate) / 2));
}

.btn:active > span:nth-child(2) {
  transform: translate(0, 0);
}
</style>

<!-- <div class="button-container">
  <div class="button -shadow">
    <fa icon="plus-square" />
  </div>
  <div>Register Product</div>
</div> -->

<!-- .button {
  width: 55px;
  height: 38px;
  border: 1.5px solid black;
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
} -->
