<template>
  <div class="month-year-dropdown">
    <select
      v-model="selectedOption"
      class="p-1 border border-black rounded-full"
    >
      <option value="">Periode Penggajian</option>
      <option
        v-for="(option, index) in periodOptions"
        :value="option"
        :key="index"
      >
        {{ option }}
      </option>
    </select>
    <button
      @click="handleSelectionChange"
      class="px-4 py-2 mt-2 text-sm rounded-full w-[65px] btn btn-primary ml-[7px]"
      style="font-size: 12px !important; padding: 6px 12px !important"
    >
      Pilih
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '',
      periodOptions: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      years: [],
    }
  },
  mounted() {
    // Get current year and month
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    // Generate years dynamically, up to current year
    for (let year = currentYear - 10; year <= currentYear; year++) {
      this.years.push(year)
    }

    // Generate period options dynamically, up to current month and year
    this.periodOptions = this.years
      .flatMap((year) =>
        this.months.map((month, index) => {
          if (year === currentYear && index + 1 > currentMonth) {
            return null
          }
          return `${month} ${year}`
        })
      )
      .filter((option) => option !== null)
      .reverse() // Reverse the array to have latest period on top
  },
  methods: {
    handleSelectionChange() {
      // Implement any action you want when "Pilih" button is clicked
      console.log('Selected period:', this.selectedOption)
    },
  },
}
</script>

<style scoped>
/* Add your styling for the dropdown */
</style>
