<template>
  <div>
    <Sidebar />
    <!-- Main Content -->
    <div
      class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0"
    >
      <!-- Top Section -->
      <section
        class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row"
      >
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden"> </a>
          <div class="text-[32px] font-semibold text-dark">
            Transaksi Gaji Dosen Tetap
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <div class="relative">
              <input
                type="text"
                name=""
                id=""
                class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full pr-10"
                placeholder="Search ..."
              />
              <img
                src="../../../assets/img/ic_search.png"
                alt="Search Icon"
                class="absolute inset-y-0 right-0 flex items-center my-auto mr-[20px]"
              />
            </div>
          </form>
        </div>
        <div class="ml-auto">
          <!-- <Dropdown /> -->
          <MonthYearDropdown />
        </div>
      </section>
      <!-- End of Top Section -->
      <section class="pt-[50px]">
        <div class="">
          <div>
            <div class="card min-h-[730px] max-w-[1078px]"></div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Dropdown from '~/components/dropdown.vue'
import MonthYearDropdown from '~/components/month-year-dropdown.vue'
import Sidebar from '~/components/Sidebar.vue' // Impor komponen Sidebar

export default {
  name: 'Index',
  components: {
    Sidebar,
    Dropdown,
    MonthYearDropdown, // Daftarkan komponen Sidebar di sini
  },
  // Logika dan konten halaman
  methods: {
    handleSelectClick() {
      // Get the selected values from the MonthYearDropdown component
      const selectedMonth = this.$refs.dropdown.selectedMonth
      const selectedYear = this.$refs.dropdown.selectedYear

      // Implement the action you want to perform when "Pilih" button is clicked
      console.log('Selected month:', selectedMonth)
      console.log('Selected year:', selectedYear)
    },
  },
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
