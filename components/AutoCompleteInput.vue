<template>
  <div class="autocomplete">
    <label>{{ label }}</label>
    <div>
      <input
        v-model="search"
        type="text"
        class="autocomplete-input"
        :class="{ invalid: !isValid }"
        @input="onChange"
        @keydown.down="onArrowDown"
        @keydown.up="onArrowUp"
        @keydown.enter="onEnter"
        @focus="onChange"
        @blur="onOutFocus"
        @keydown.esc="onEsc"
      />
      <ul v-show="isOpen" class="autocomplete-results">
        <li
          v-for="(result, index) in results"
          :key="result.id"
          class="autocomplete-result"
          :class="{ active: index === selectedIndex }"
          @touchend="setResult(result, index)"
          @mousedown="setResult(result, index)"
        >
          {{ result.value }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Option } from '~/types/index'

export default {
  props: {
    label: {
      type: String,
      default: '',
    },
    items: {
      type: Array as () => Array<Option>,
      default: () => [],
    },
    value: {
      type: Object as () => Option,
      default: () => {},
    },
  },
  data() {
    return {
      search: '',
      selectedOption: {} as Option,
      results: [] as Option[],
      isOpen: false,
      selectedIndex: 0,
      isValid: true,
    }
  },
  watch: {
    selectedOption(oldOption, newOption): void {
      this.$emit('input', this.selectedOption)
    },
  },
  created(): void {
    // map the initial value with the component
    // mainly for modify function
    if (this.value) {
      this.selectedOption = this.value
      this.search = this.selectedOption.value
    }
  },
  methods: {
    filterResults(): void {
      this.results = this.items.filter((item: Option) =>
        item.value.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    onChange(): void {
      // avoid annoying user when typing
      this.isValid = true

      this.filterResults()

      // automatically choose the first suggested result
      // if user's input can fetch data
      if (this.results.length > 0) {
        this.selectedIndex = 0
        this.isOpen = true
      }
    },

    // set the autocomplete result when user click on a suggested row
    setResult(result: Option, index: number): void {
      this.selectedIndex = index
      this.search = result.value
      this.selectedOption = result
      this.isOpen = false
    },

    // handling the event when user press arrow down key
    onArrowDown(): void {
      if (this.selectedIndex < this.results.length - 1) {
        // move the current highlighted result down 1 row
        this.selectedIndex = this.selectedIndex + 1
      } else {
        // move back to the top when the current highlighted result at bottom
        this.selectedIndex = 0
      }
    },

    // handling the event when user press arrow up key
    onArrowUp(): void {
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
    onEnter(): void {
      this.search = this.results[this.selectedIndex]?.value
      this.selectedOption = this.results[this.selectedIndex]
      this.selectedIndex = 0
      this.isOpen = false
    },

    // handling the event when user tab/click/deselect the input
    onOutFocus(): void {
      // check if the user's current input can fetch any suggested data or not
      if (this.results.length === 0) {
        this.isValid = false
        this.reset()
      } else {
        this.isValid = true
        // automatically select an suggestion with user's current input
        // if they click somewhere else or tab away
        this.onEnter()
      }
    },

    onEsc(): void {
      this.isOpen = false
      this.results = [] as Option[]
    },

    reset(): void {
      this.isOpen = false
      this.results = [] as Option[]
      this.selectedIndex = 0
      this.selectedOption = {} as Option
    },
  },
}
</script>

<style scoped>
.autocomplete {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
.autocomplete > label {
  flex-basis: 30%;
}
.autocomplete > div {
  flex-basis: 70%;
}
.autocomplete-input.invalid {
  border: 2px solid #e91e63;
}
.autocomplete-input {
  position: relative;
  font-size: 16px;
  max-width: 100%;
  min-width: 100%;
  padding: 7px 25px;
  border: 1px solid black;
  border-radius: 10px;
}

.autocomplete-input:focus {
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

.autocomplete-result.active,
.autocomplete-result:hover {
  background-color: #3fc2b2;
  color: white;
}
</style>
