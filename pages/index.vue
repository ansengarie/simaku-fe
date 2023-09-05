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
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Dosen Tetap
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalAktifDosenTetap }}
                </div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Dosen Luar Biasa
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalAktifDosenLuarBiasa }}
                </div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Karyawan
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalAktifKaryawan }}
                </div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue' // Impor komponen Sidebar
import axios from 'axios' // Impor library axios

export default {
  // middleware: 'authenticated',
  name: 'Index',
  data() {
    return {
      totalAktifDosenTetap: 0, // Inisialisasi data sebagai null
      totalAktifDosenLuarBiasa: 0, // Inisialisasi data sebagai null
      totalAktifKaryawan: 0, // Inisialisasi data sebagai null
    }
  },
  components: {
    Sidebar, // Daftarkan komponen Sidebar di sini
  },
  mounted() {
    this.fetchDosenTetapData()
    this.fetchDosenLuarBiasaData()
    this.fetchKaryawanData()
    if (localStorage.getItem('token') == null) this.$router.push('/auth/login')
  },
  methods: {
    // cekToken() {
    //   if (localStorage.getItem('token') == null) {
    //     this.$router.push('/auth/login')
    //   }
    // },
    async fetchDosenTetapData() {
      console.log('Token:', this.token)
      console.log(localStorage.getItem('token'), 'ini token')
      try {
        const response = await this.$axios.get('dosentetap', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log('Dosen Tetap data response:', response)
        // Lakukan sesuatu dengan data yang diterima, misalnya menyimpannya dalam data komponen
        this.totalAktifDosenTetap = response.data.data.total
      } catch (error) {
        console.error('Error fetching Dosen Tetap data:', error)
      }
    },

    async fetchDosenLuarBiasaData() {
      console.log('Token:', this.token)
      console.log(localStorage.getItem('token'), 'ini token')
      try {
        const response = await this.$axios.get('/dosenlb', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log('Dosen Tetap data response:', response)
        // Lakukan sesuatu dengan data yang diterima, misalnya menyimpannya dalam data komponen
        this.totalAktifDosenLuarBiasa = response.data.data.total
      } catch (error) {
        console.error('Error fetching Dosen Tetap data:', error)
      }
    },

    async fetchKaryawanData() {
      console.log('Token:', this.token)
      console.log(localStorage.getItem('token'), 'ini token')
      try {
        const response = await this.$axios.get('/karyawan', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log('karyawan response:', response)
        // Lakukan sesuatu dengan data yang diterima, misalnya menyimpannya dalam data komponen
        this.totalAktifKaryawan = response.data.data.total
      } catch (error) {
        console.error('Error fetching Karyawan:', error)
      }
    },
  },
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
