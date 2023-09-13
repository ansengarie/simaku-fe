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
          <div class="text-[32px] font-semibold text-dark">Overview</div>
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
                src="../assets/img/ic_search.png"
                alt="Search Icon"
                class="absolute inset-y-0 right-0 flex items-center my-auto mr-[20px]"
              />
            </div>
          </form>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Statistics</div>
            </div>
          </div>
        </div>
        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <StatCard title="Dosen Tetap" :total="totalAktifDosenTetap" />
          <StatCard
            title="Dosen Luar Biasa"
            :total="totalAktifDosenLuarBiasa"
          />
          <StatCard title="Karyawan" :total="totalAktifKaryawan" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue' // Impor komponen Sidebar

export default {
  name: 'Index',
  data() {
    return {
      totalAktifDosenTetap: 0,
      totalAktifDosenLuarBiasa: 0,
      totalAktifKaryawan: 0,
    }
  },
  components: {
    Sidebar, // Daftarkan komponen Sidebar di sini
    StatCard: () => import('~/components/StatCard.vue'), // Daftarkan komponen StatCard di sini
  },
  mounted() {
    this.fetchData('dosentetap', 'totalAktifDosenTetap')
    this.fetchData('dosenlb', 'totalAktifDosenLuarBiasa')
    this.fetchData('karyawan', 'totalAktifKaryawan')
  },
  methods: {
    async fetchData(endpoint, dataKey) {
      try {
        const response = await this.$axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this[dataKey] = response.data.data.total
      } catch (error) {
        console.error(`Error fetching ${dataKey}:`, error)
      }
    },
  },
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
