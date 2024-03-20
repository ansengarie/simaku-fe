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
            Transaksi Gaji Dosen Luar Biasa
          </div>
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
      <!-- Table Section -->
      <section class="mt-[70px]">
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
                        <th class="px-4 py-2 font-head-tabel">NPWP</th>
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
                        <td>{{ dosen.npwp }}</td>
                        <td>
                          <div class="flex justify-center">
                            <nuxt-link
                              :to="{
                                name: 'gaji-dosen-lb-id-createGaji',
                                params: { id: dosen.id },
                              }"
                              class="mr-[7px]"
                            >
                              <img
                                src="~/assets/img/ic_add.png"
                                alt="Add Icon"
                                class="w-[24px] col-span-1"
                              />
                            </nuxt-link>
                            <nuxt-link
                              :to="{
                                name: 'gaji-dosen-lb-id-detailsGaji',
                                params: { id: dosen.id },
                              }"
                            >
                              <img
                                src="~/assets/img/ic_detail.png"
                                alt="Detail Icon"
                                class="w-[24px] col-span-1"
                              />
                            </nuxt-link>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="my-5 text-center">
                  <p>Tidak ada data dosen luar biasa.</p>
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
import Sidebar from '~/components/Sidebar.vue'
import DeleteConfirmModal from '~/components/DeleteConfirmModal.vue'

export default {
  name: 'Index',
  data() {
    return {
      dosenTetapData: [],
      isModalOpen: false,
      currentId: null,
      currentName: '',
      currentPage: 1,
      itemsPerPage: 10,
      sortBy: null,
      sortOrder: 'asc',
      searchQuery: '',
    }
  },
  mounted() {
    this.fetchDosenTetapData()
  },
  components: {
    Sidebar,
    DeleteConfirmModal,
  },
  methods: {
    async fetchDosenTetapData() {
      try {
        const response = await this.$axios.get('dosenlb', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        const allData = response.data.data.data
        // Hanya memfilter data dosen dengan status "Aktif"
        this.dosenTetapData = allData.filter(
          (dosen) => dosen.status === 'Aktif'
        )
      } catch (error) {
        console.error('Error fetching Dosen Tetap data Total:', error)
      }
    },
    showModal(id) {
      const dosen = this.dosenTetapData.find((d) => d.id === id)
      this.currentId = id
      this.currentName = dosen ? dosen.nama : ''
      this.isModalOpen = true
    },
    hideModal() {
      this.isModalOpen = false
    },
    async deleteDosenById(id) {
      try {
        await this.$axios.delete(`/dosenlb/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
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
      const start = (this.currentPage - 1) * this.itemsPerPage
      const end = start + this.itemsPerPage
      return this.filteredData.slice(start, end)
    },
    numberOfPages() {
      return Math.ceil(this.filteredData.length / this.itemsPerPage)
    },
    filteredData() {
      if (!this.searchQuery) {
        return this.dosenTetapData
      }
      const query = this.searchQuery.toLowerCase()
      return this.dosenTetapData.filter(
        (dosen) =>
          dosen.no_pegawai.toLowerCase().includes(query) ||
          dosen.nama.toLowerCase().includes(query) ||
          dosen.golongan.toLowerCase().includes(query) ||
          (dosen.npwp && dosen.npwp.toLowerCase().includes(query))
      )
    },
  },
}
</script>

<style>
.font-head-tabel i {
  margin-left: 8px;
  font-size: 0.8em;
}
</style>
