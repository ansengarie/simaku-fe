<template>
  <div class="select-dropdown">
    <select
      v-model="selectedOption"
      @change="handleOptionChange"
      class="dropdown-select rounded-xl w-[200px] text-center"
    >
      <option value="">Periode Penggajian</option>
      <option value="option1">1 - 2023</option>
      <option value="option2">Option 2</option>
      <option value="option3">Option 3</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '',
    }
  },
  methods: {
    handleOptionChange() {
      // Implement any action you want when an option is selected
      console.log('Selected option:', this.selectedOption)
    },
  },
}
</script>

<style scoped>
/* Add your styling for the dropdown */
</style>
