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
                v-model="searchQuery"
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
                <div v-if="filteredData.length === 0" class="my-4 text-center">
                  <p>
                    Tidak ada hasil yang ditemukan untuk "{{ searchQuery }}"
                  </p>
                </div>
                <div v-else>
                  <table class="w-full h-full table-auto">
                    <thead>
                      <tr class="border-b">
                        <th
                          class="px-4 py-2 font-head-tabel"
                          @click="handleSort('no_pegawai')"
                          title="Klik untuk mengurutkan"
                        >
                          No Pegawai
                          <i
                            v-if="
                              sortBy === 'no_pegawai' && sortOrder === 'asc'
                            "
                            class="fas fa-arrow-up"
                          ></i>
                          <i
                            v-if="
                              sortBy === 'no_pegawai' && sortOrder === 'desc'
                            "
                            class="fas fa-arrow-down"
                          ></i>
                        </th>
                        <th
                          class="px-4 py-2 font-head-tabel"
                          @click="handleSort('nama')"
                          title="Klik untuk mengurutkan"
                        >
                          Nama Lengkap
                          <i
                            v-if="sortBy === 'nama' && sortOrder === 'asc'"
                            class="fas fa-arrow-up"
                          ></i>
                          <i
                            v-if="sortBy === 'nama' && sortOrder === 'desc'"
                            class="fas fa-arrow-down"
                          ></i>
                        </th>
                        <th
                          class="px-4 py-2 font-head-tabel"
                          @click="handleSort('golongan')"
                          title="Klik untuk mengurutkan"
                        >
                          Golongan
                          <i
                            v-if="sortBy === 'golongan' && sortOrder === 'asc'"
                            class="fas fa-arrow-up"
                          ></i>
                          <i
                            v-if="sortBy === 'golongan' && sortOrder === 'desc'"
                            class="fas fa-arrow-down"
                          ></i>
                        </th>
                        <th class="px-4 py-2 font-head-tabel">Status</th>
                        <th class="px-4 py-2 font-head-tabel">Jabatan</th>
                        <th class="px-4 py-2 font-head-tabel">
                          Nomor Handphone
                        </th>
                        <th class="px-4 py-2 font-head-tabel">Aksi</th>
                      </tr>
                    </thead>
                    <tbody class="pt-[16px]">
                      <!-- Gunakan v-for untuk mengulang data dari response -->
                      <tr
                        class="pt-[16px] border-b"
                        v-for="dosen in paginatedData"
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
                        <td>{{ dosen.nomor_hp }}</td>
                        <td>
                          <div class="flex justify-center">
                            <nuxt-link
                              :to="{
                                name: 'manage-pegawai-dosen-tetap-id-edit',
                                params: { id: dosen.id },
                              }"
                            >
                              <img
                                src="~/assets/img/ic_edit.png"
                                alt="Edit Icon"
                                class="w-[24px] col-span-1"
                                title="Edit"
                              />
                            </nuxt-link>
                            <!-- <nuxt-link
                            :to="{
                              name: 'manage-pegawai-dosen-tetap-delete',
                              params: { id: dosen.id },
                            }"
                            @click="showModal"
                          > -->
                            <button @click="showModal(dosen.id)">
                              <img
                                src="~/assets/img/ic_delete.png"
                                alt="Delete"
                                class="w-[24px] col-span-1"
                                title="Hapus"
                              />
                            </button>
                            <!-- </nuxt-link> -->
                            <!-- Tambahkan event click untuk memunculkan modal -->
                            <DeleteConfirmModal
                              :id="currentId"
                              :name="currentName"
                              v-if="isModalOpen"
                              @cancel="hideModal"
                              @confirm="deleteDosenTetap"
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="my-5 text-center">
                  <p>Tidak ada data dosen tetap.</p>
                </div>
              </div>
              <div class="flex justify-between mt-auto px-[25px] py-[25px]">
                <p class="text-muted">
                  {{ (currentPage - 1) * itemsPerPage + 1 }} -
                  {{
                    Math.min(currentPage * itemsPerPage, dosenTetapData.length)
                  }}
                  dari {{ dosenTetapData.length }}
                </p>
                <div class="flex justify-end"></div>
                <div class="flex">
                  <p class="mr-[16px] text-muted">Halaman</p>
                  <p class="mr-[20px] text-paging">{{ currentPage }}</p>
                  <button @click="prevPage" :disabled="currentPage === 1">
                    <span
                      :class="{
                        'material-symbols-outlined': true,
                        'text-gray-500': currentPage === 1,
                        'text-black': currentPage !== 1,
                        'opacity-50': currentPage === 1,
                      }"
                    >
                      arrow_back
                    </span>
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="
                      currentPage * itemsPerPage >= dosenTetapData.length
                    "
                  >
                    <span
                      :class="{
                        'material-symbols-outlined': true,
                        'text-gray-500':
                          currentPage * itemsPerPage >= dosenTetapData.length,
                        'opacity-50':
                          currentPage * itemsPerPage >= dosenTetapData.length,
                        'text-black':
                          currentPage * itemsPerPage < dosenTetapData.length,
                      }"
                    >
                      arrow_forward
                    </span>
                  </button>
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
import DeleteConfirmModal from '~/components/DeleteConfirmModal.vue' // Impor komponen DeleteConfirmModal

export default {
  name: 'Index',
  data() {
    return {
      totalAktifDosenTetap: 0, // Inisialisasi data sebagai null
      totalDosenTetapAktif: 0, // Inisialisasi data sebagai null
      totalDosenTetapNonAktif: 0, // Inisialisasi data sebagai null
      dosenTetapData: [], // Inisialisasi array untuk menyimpan data Dosen Tetap
      isModalOpen: false, // Inisialisasi status modal sebagai false
      currentId: null, // Inisialisasi ID Dosen Tetap yang akan dihapus
      currentName: '', // Inisialisasi nama Dosen Tetap yang akan dihapus
      currentPage: 1,
      itemsPerPage: 10,
      sortBy: null, // kolom yang akan disort
      sortOrder: 'asc', // 'asc' untuk ascending, 'desc' untuk descending
      searchQuery: '',
    }
  },
  mounted() {
    this.fetchDosenTetapData()
  },
  components: {
    Sidebar, // Daftarkan komponen Sidebar di sini
    DeleteConfirmModal, // Daftarkan komponen DeleteConfirmModal di sini
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
    // Fungsi untuk menghapus data Dosen Tetap
    showModal(id) {
      const dosen = this.dosenTetapData.find((d) => d.id === id)
      this.currentId = id
      this.currentName = dosen ? dosen.nama : '' // Simpan nama dosen
      this.isModalOpen = true
    },

    hideModal() {
      this.isModalOpen = false
    },

    deleteDosenTetap(id) {
      // Lakukan sesuatu untuk menghapus data Dosen Tetap
      console.log(`Menghapus dosen dengan ID: ${id}`)
      this.isModalOpen = false
    },

    async deleteDosenById(id) {
      try {
        await this.$axios.delete(`/dosentetap/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        // Jika berhasil, tutup modal dan refresh data
        this.isModalOpen = false
        this.fetchDosenTetapData()
      } catch (error) {
        console.error('Error deleting dosen:', error)
      }
    },
    deleteDosenTetap(id) {
      this.deleteDosenById(id)
    },
    nextPage() {
      if (this.currentPage < this.numberOfPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    handleSort(column) {
      if (this.sortBy === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortBy = column
        this.sortOrder = 'asc'
      }
    },
  },
  computed: {
    sortedData() {
      if (!this.sortBy) return this.dosenTetapData
      return [...this.dosenTetapData].sort((a, b) => {
        if (this.sortOrder === 'asc') {
          return a[this.sortBy] > b[this.sortBy] ? 1 : -1
        } else {
          return a[this.sortBy] < b[this.sortBy] ? 1 : -1
        }
      })
    },
    paginatedData() {
      console.log('Filtered Data:', JSON.stringify(this.filteredData, null, 2))
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      if (Array.isArray(this.filteredData)) {
        return this.filteredData.slice(start, end)
      }
      return []
    },
    numberOfPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    filteredData() {
      if (!this.searchQuery) {
        return Array.isArray(this.dosenTetapData) ? this.dosenTetapData : []
      }
      const query = this.searchQuery.toLowerCase()
      const result = this.dosenTetapData.filter(
        (dosen) =>
          dosen.nama.toLowerCase().includes(query) ||
          dosen.no_pegawai.toLowerCase().includes(query) ||
          dosen.golongan.toLowerCase().includes(query)
      )
      return Array.isArray(result) ? result : []
    },
  },
}
</script>

<style>
.font-head-tabel i {
  margin-left: 8px; /* Jarak antara teks dengan icon */
  font-size: 0.8em; /* Ukuran icon */
}
</style>
