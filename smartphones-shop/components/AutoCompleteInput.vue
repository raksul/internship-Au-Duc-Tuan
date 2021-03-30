<template>
  <div class="autocomplete">
    <label>{{ label }}</label>
    <div>
      <input
        v-model="search"
        type="text"
        :class="{ invalid: !isValid }"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        @focus="onChange"
        @blur="onOutFocus"
      />
      <ul v-show="isOpen" class="autocomplete-results">
        <li
          v-for="(result, index) in results"
          :key="index"
          class="autocomplete-result"
          :class="{ 'is-active': index === selectedIndex }"
          @touchend="setResult(result)"
          @mousedown="setResult(result)"
        >
          {{ result.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      required: false,
      default: () => [],
    },
    init: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      search: '',
      selectedOption: {},
      results: [],
      isOpen: false,
      selectedIndex: 0,
      isValid: true,
    }
  },
  created() {
    // map the initial value with the component
    // mainly for modify function
    if (this.init) {
      this.search = this.init.value
      this.selectedOption = this.init
      this.$emit('input', this.selectedOption)
    }
  },
  methods: {
    filterResults() {
      this.results = this.items.filter((item) =>
        item.value.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    onChange() {
      this.filterResults()

      // automatically choose the first suggested result
      // if user's input can fetch data
      if (this.results.length > 0) {
        this.selectedIndex = 0
      }
      this.isOpen = true

      this.$emit('input', this.selectedOption)
    },

    // set the autocomplete result when user click on a suggested row
    setResult(result) {
      this.search = result.value
      this.selectedOption = result
      this.isOpen = false
    },

    // handling the event when user press arrow down key
    onArrowDown() {
      if (this.selectedIndex < this.results.length - 1) {
        // move the current highlighted result down 1 row
        this.selectedIndex = this.selectedIndex + 1
      } else {
        // move back to the top when the current highlighted result at bottom
        this.selectedIndex = 0
      }
    },

    // handling the event when user press arrow up key
    onArrowUp() {
      if (this.selectedIndex > 0) {
        // move the current highlighted current result up 1 row
        this.selectedIndex = this.selectedIndex - 1
      } else {
        // move to the bottom when the current highlighted result at top
        this.selectedIndex = this.results.length - 1
      }
    },

    // set the autocomplete result when user
    // use up/down arrow key to select a suggested row
    // and press Enter
    onEnter() {
      this.search = this.results[this.selectedIndex].value
      this.selectedOption = this.results[this.selectedIndex]
      this.selectedIndex = 0
      this.isOpen = false
      this.$emit('input', this.selectedOption)
      this.selectedOption = {}
    },

    // handling the event when user tab/click/deselect the input
    onOutFocus() {
      // automatically filter suggestions with user's current input
      this.filterResults()
      // check if the user's current input can fetch any suggested data or not
      if (this.results.length === 0) {
        this.isValid = false
        this.isOpen = false

        this.selectedOption = {}
        this.$emit('input', {})
      } else {
        this.isValid = true
        // automatically select an suggestion with user's current input
        this.onEnter()
      }
    },
  },
}
</script>

<style scoped>
.autocomplete {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.autocomplete > label {
  max-width: 30%;
  min-width: 30%;
  /* width: 700px; */
}
.autocomplete > div {
  max-width: 70%;
  min-width: 70%;
}
.invalid {
  border: 2px solid #e91e63 !important;
}
.autocomplete > div > input {
  position: relative;
  font-size: 16px;
  max-width: 100%;
  min-width: 100%;
  padding: 7px 25px;
  border: 1px solid black;
  border-radius: 10px;
}

.autocomplete > div > input:focus {
  outline: none;
  border: 2.5px solid #3fc2b2;
}

.autocomplete-results {
  position: absolute;
  z-index: 10;
  padding: 4px 10px;
  max-width: 100%;
  min-width: 100%;
  margin: 0;
  border: 0.5px solid grey;
  border-top: none;
  background-color: #fff;
  overflow: auto;
}

.autocomplete-result {
  font-size: 17px;
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #3fc2b2;
  color: white;
}
</style>
