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
          <div class="text-[32px] font-semibold text-dark">Dosen Tetap</div>
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
                src="~/assets/img/ic_search.png"
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
          <div class="flex items-center justify-end gap-6">
            <div>
              <nuxt-link to="dosen-tetap/create">
                <button
                  class="px-8 py-2 text-lg font-bold text-white rounded-full bg-primary w-190 h-46"
                >
                  Tambah Dosen Tetap
                </button>
              </nuxt-link>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  In Total
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalAktifDosenTetap }}
                </div>
              </div>
            </div>
          </div>

          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Active
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalDosenTetapAktif }}
                </div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Inactive
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">
                  {{ totalDosenTetapNonAktif }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <div class="">
          <div>
            <div class="card min-h-[468px] max-w-[1078px]">
              <div class="text-center">
                <table class="w-full h-full table-auto">
                  <thead>
                    <tr class="border-b">
                      <th class="px-4 py-2 font-head-tabel">No Pegawai</th>
                      <th class="px-4 py-2 font-head-tabel">Nama Lengkap</th>
                      <th class="px-4 py-2 font-head-tabel">Golongan</th>
                      <th class="px-4 py-2 font-head-tabel">Status</th>
                      <th class="px-4 py-2 font-head-tabel">Jabatan</th>
                      <th class="px-4 py-2 font-head-tabel">Bank</th>
                      <th class="px-4 py-2 font-head-tabel">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="pt-[16px]">
                    <!-- Gunakan v-for untuk mengulang data dari response -->
                    <tr
                      class="pt-[16px] border-b"
                      v-for="dosen in dosenTetapData"
                      :key="dosen.id"
                    >
                      <td class="py-[16px]">{{ dosen.no_pegawai }}</td>
                      <td>{{ dosen.nama }}</td>
                      <td>{{ dosen.golongan }}</td>
                      <td>
                        <!-- Gunakan v-bind untuk mengatur kelas sesuai dengan status -->
                        <p
                          :class="{
                            'bg-green-400 rounded-full w-[60px] m-auto text-green-700 font-bold':
                              dosen.status === 'AKTIF' ||
                              dosen.status === 'aktif' ||
                              dosen.status === 'Aktif',
                            'bg-red-400 rounded-full w-[110px] m-auto text-red-700 font-bold':
                              dosen.status === 'TIDAK AKTIF' ||
                              dosen.status === 'tidak aktif' ||
                              dosen.status === 'Tidak Aktif',
                          }"
                        >
                          {{ dosen.status }}
                        </p>
                      </td>
                      <td>{{ dosen.jabatan }}</td>
                      <td>{{ dosen.nama_bank }}</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link
                            :to="{
                              name: 'manage-pegawai-dosen-tetap-edit',
                              params: { id: dosen.id },
                            }"
                          >
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] col-span-1"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-between mt-auto px-[25px] py-[25px]">
                <p class="text-muted">1 - 5 dari 4</p>
                <div class="flex justify-end"></div>
                <div class="flex">
                  <p class="mr-[16px] text-muted">Halaman</p>
                  <p class="mr-[20px] text-paging">1</p>
                  <img
                    src="~/assets/img/ic_nav-left.png"
                    alt="Left Arrow"
                    class="w-[24px] col-span-1 ml-[6px]"
                  />
                  <img
                    src="~/assets/img/ic_nav-right.png"
                    alt="Right Arrow"
                    class="w-[24px] col-span-1 mr-[6px]"
                  />
                </div>
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
  name: 'Index',
  data() {
    return {
      totalAktifDosenTetap: 0, // Inisialisasi data sebagai null
      totalDosenTetapAktif: [], // Inisialisasi data sebagai null
      totalDosenTetapNonAktif: [], // Inisialisasi data sebagai null
      dosenTetapData: [], // Inisialisasi array untuk menyimpan data Dosen Tetap
    }
  },
  mounted() {
    this.fetchDosenTetapData()
  },
  components: {
    Sidebar, // Daftarkan komponen Sidebar di sini
  },
  // Logika dan konten halaman
  methods: {
    async fetchDosenTetapData() {
      console.log('Token:', this.token)
      console.log(localStorage.getItem('token'), 'ini token')
      try {
        const response = await this.$axios.get('dosentetap', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        console.log('Dosen Tetap data total response:', response)
        // Lakukan sesuatu dengan data yang diterima, misalnya menyimpannya dalam data komponen
        this.dosenTetapData = response.data.data.data

        this.totalAktifDosenTetap = response.data.data.total

        //saya ingin menghitung jumlah dosen tetap aktif dan non aktif dengan memasukan ke dalam array dan menghitung panjang array
        this.totalDosenTetapAktif = this.dosenTetapData.filter(
          (dosen) => dosen.status === 'Aktif'
        ).length
        this.totalDosenTetapNonAktif = this.dosenTetapData.filter(
          (dosen) => dosen.status === 'Tidak Aktif'
        ).length
      } catch (error) {
        console.error('Error fetching Dosen Tetap data Total:', error)
      }
    },
  },
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
