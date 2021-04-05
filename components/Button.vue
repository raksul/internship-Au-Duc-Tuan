<template>
  <div class="btn-container">
    <button class="btn" :class="type" @click="$emit('clicked')">
      <span class="base-layer"></span>
      <span class="upper-layer">
        <fa v-if="icon" :icon="icon" />
      </span>
    </button>
    <span class="side-label">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'default',
    },
    label: {
      type: String,
      default: '',
    },
  },
}
</script>

<style>
.btn-container {
  display: flex;
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
  --bg-btn-secondary: #3aa3ff;
  --bg-btn-default: #3aa3ff;
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

.primary span {
  font-size: 25px;
  background-color: var(--bg-btn-primary);
}

.danger span {
  font-size: 20px;
  background-color: var(--bg-btn-danger);
}

.secondary span {
  font-size: 20px;
  background-color: var(--bg-btn-secondary);
}

.default span {
  font-size: 20px;
  background-color: var(--bg-btn-default);
}

.btn span {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  clip-path: polygon(10% 0%, 100% 0%, 90% 100%, 0% 100%);
}

.upper-layer {
  display: grid;
  place-items: center;
  transform: translate(var(--translate), var(--translate));
  transition: transform 0.2s ease-in-out;
}

.base-layer {
  opacity: 0.6;
}

.btn:hover > .upper-layer {
  transform: translate(calc(var(--translate) / 2), calc(var(--translate) / 2));
}

.btn:active > .base-layer {
  transform: translate(0, 0);
}
</style>
