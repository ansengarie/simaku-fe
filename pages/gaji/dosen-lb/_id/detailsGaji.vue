<template>
  <section>
    <div class="flex justify-between mt-[50px]">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <nuxt-link to="/gaji/dosen-lb">
          <img src="~/assets/img/btn_close.png" class="mx-[50px]" />
        </nuxt-link>
      </div>
    </div>
    <div class="w-full min-h-screen mb-6 bg-background">
      <!-- Card -->
      <div class="flex justify-center h-full">
        <div class="w-full space-y-6 md:w-11/12">
          <!-- Judul -->
          <div class="w-full text-2xl font-semibold text-center text-navy text">
            Transaksi Gaji Dosen Luar Biasa
          </div>

          <div class="w-full py-6 bg-white shadow-xl rounded-xl">
            <div class="space-y-6">
              <!-- Konten Data Dosen -->
              <div class="px-6 space-y-4 md:flex md:space-y-0">
                <!-- Bagian Kiri -->
                <div>
                  <!-- Konten Kiri -->
                  <table>
                    <tbody>
                      <tr>
                        <td class="text-grey">Nomor pegawai</td>
                        <td class="pr-2">:</td>
                        <td class="">{{ dosenData.no_pegawai }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nama Lengkap</td>
                        <td>:</td>
                        <td class="">{{ dosenData.nama }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">NPWP</td>
                        <td>:</td>
                        <td class="">{{ dosenData.npwp }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Golongan</td>
                        <td>:</td>
                        <td class="">{{ dosenData.golongan }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Jabatan</td>
                        <td>:</td>
                        <td class="">{{ dosenData.jabatan }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nomor Handphone</td>
                        <td>:</td>
                        <td class="">{{ dosenData.nomor_hp }}</td>
                      </tr>

                      <tr>
                        <td class="text-grey">Bank</td>
                        <td>:</td>
                        <td class="" v-if="selectedGajiData">
                          {{ selectedGajiData.bank[0].nama_bank }}
                        </td>
                        <td v-else>
                          <p></p>
                        </td>
                      </tr>
                      <tr>
                        <td class="text-grey">Status Bank</td>
                        <td>:</td>
                        <td class="" v-if="selectedGajiData">
                          {{ selectedGajiData.status_bank }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nomor Rekening</td>
                        <td>:</td>
                        <td class="" v-if="selectedGajiData">
                          {{ selectedGajiData.bank[0].no_rekening }}
                        </td>
                        <td v-else>
                          <p></p>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-grey">Periode</td>
                        <td>:</td>
                        <td class="" v-if="selectedGajiData">
                          {{ selectedPeriod.periode.month }}
                          {{ selectedPeriod.periode.year }}
                        </td>
                        <td v-else>
                          <p></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Bagian Kanan -->
                <div class="flex items-end justify-end flex-1 space-x-2">
                  <!-- Konten Kanan -->
                  <div
                    class="items-center justify-center space-x-2 space-y-2 md:flex md:space-y-0"
                  >
                    <select
                      v-model="selectedPeriod"
                      class="p-2 border rounded-full"
                    >
                      <option
                        :value="null"
                        disabled
                        selected
                        v-if="!selectedPeriod"
                      >
                        Pilih Periode
                      </option>
                      <option
                        v-for="period in periods"
                        :key="period.periode.month + period.periode.year"
                        :value="period"
                      >
                        {{ period.periode.month }} {{ period.periode.year }}
                      </option>
                    </select>
                    <button
                      class="px-6 py-0 text-white rounded-full w-[125px] md:w-26 md:h-8 bg-primary md:inline"
                      @click="fetchGajiData"
                    >
                      Pilih
                    </button>
                    <div v-if="selId">
                      <div class="flex justify-end space-x-2">
                        <!-- Icon ubah/pensil -->
                        <div
                          class="flex items-center justify-center w-6 h-6 border border-black"
                        >
                          <!-- <span>{{ selId ? 'ada' : 'tidak ada' }}</span> -->
                          <!-- <div v-for="transaksi in periods" :key="transaksi.id"> -->

                          <nuxt-link
                            :to="{
                              name: 'gaji-dosen-lb-id-editGaji',
                              params: { id: selId },
                            }"
                          >
                            <span class="material-symbols-outlined">
                              edit
                            </span>
                          </nuxt-link>
                          <!-- </div> -->
                        </div>

                        <!-- Icon cetak/print -->
                        <div
                          class="flex items-center justify-center w-6 h-6 border border-black cursor-pointer"
                          @click="printSalarySlip(selId)"
                        >
                          <span class="material-symbols-outlined"> print </span>
                        </div>
                        <!-- Icon kirim wa -->
                        <div
                          class="flex items-center justify-center w-6 h-6 border border-black cursor-pointer"
                          @click="sendSalarySlipViaWhatsApp(selId)"
                        >
                          <svg
                            fill="#24ad1a"
                            height="200px"
                            width="200px"
                            version="1.1"
                            id="Layer_1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 308 308"
                            xml:space="preserve"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              <g id="XMLID_468_">
                                <path
                                  id="XMLID_469_"
                                  d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156 c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687 c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887 c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153 c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348 c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802 c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922 c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0 c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458 C233.168,179.508,230.845,178.393,227.904,176.981z"
                                ></path>
                                <path
                                  id="XMLID_470_"
                                  d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716 c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396 c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188 l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677 c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867 C276.546,215.678,222.799,268.994,156.734,268.994z"
                                ></path>
                              </g>
                            </g>
                          </svg>
                        </div>

                        <!-- Icon hapus/tempat sampah -->
                        <div
                          class="flex items-center justify-center w-6 h-6 border border-black"
                        >
                          <button @click="showModal()">
                            <img
                              src="~/assets/img/ic_delete.png"
                              alt="Delete"
                              class="w-[24px] col-span-1"
                              title="Hapus"
                            />
                          </button>
                          <DeleteConfirmModal
                            :id="selId"
                            :monthYear="monthYear"
                            v-if="isModalOpen"
                            @cancel="hideModal"
                            @confirm="deleteDosenTetap"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="selectedGajiData" class="space-y-3">
                <!-- Section Gaji Fakultas Hukum-->
                <div
                  class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                >
                  Komponen Pendapatan
                </div>

                <!-- Konten Gaji Fakultas Hukum -->
                <div
                  class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                >
                  <div
                    v-for="(value, key) in selectedGajiData
                      .komponen_pendapatan[0].komponen_pendapatan"
                    :key="key"
                    class="md:w-3/4 form-group"
                    v-if="
                      key !== 'id' &&
                      key !== 'dosen_tetap_id' &&
                      key !== 'deleted_at' &&
                      key !== 'created_at' &&
                      key !== 'total_gaji_fakultas' &&
                      key !== 'updated_at'
                    "
                  >
                    <label :for="key" class="text-navy">{{
                      formatLabel(key)
                    }}</label>
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="formatRupiah(value)"
                      disabled
                    />
                  </div>
                  <div class="form-group mb-6 md:w-[36%] md:col-span-2">
                    <label for="" class="font-bold text-navy"
                      >Total Gaji Fakultas Hukum</label
                    >
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="calculateTotal('komponen_pendapatan')"
                      disabled
                    />
                  </div>
                </div>
                <!-- Section Potongan-->
                <div
                  class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                >
                  Potongan
                </div>

                <!-- Konten Potongan -->
                <div
                  class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                >
                  <div
                    v-for="(value, key) in selectedGajiData.potongan[0]
                      .potongan"
                    :key="key"
                    class="relative md:w-3/4 form-group"
                    v-if="
                      key !== 'id' &&
                      key !== 'dosen_tetap_id' &&
                      key !== 'deleted_at' &&
                      key !== 'created_at' &&
                      key !== 'total_potongan' &&
                      key !== 'updated_at'
                    "
                  >
                    <label :for="key" class="text-navy">
                      {{ formatLabel(key) }}
                      <!-- Cek apakah input tertentu memerlukan ikon dan tooltip -->
                      <span
                        v-if="shouldShowTooltip(key)"
                        class="tooltip-icon"
                        @mouseover="showTooltip(key)"
                        @mouseout="hideTooltip()"
                      >
                        <i class="material-symbols-outlined">info</i>
                        <div v-if="showTooltips[key]" class="tooltip">
                          {{ tooltips[key] }}
                        </div>
                      </span>
                    </label>
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="formatRupiah(value)"
                      disabled
                    />
                  </div>
                  <div class="form-group mb-6 md:w-[36%] md:col-span-2">
                    <label for="" class="font-bold text-navy"
                      >Total Potongan</label
                    >
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="calculateTotal('potongan')"
                      disabled
                    />
                  </div>
                </div>
                <!-- Section Pajak-->
                <div
                  class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                >
                  Pajak
                </div>

                <!-- Konten Pajak -->
                <div
                  class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                >
                  <div
                    v-for="(value, key) in selectedGajiData.pajak[0]"
                    :key="key"
                    class="md:w-3/4 form-group"
                    v-if="
                      key !== 'id' &&
                      key !== 'dosen_tetap_id' &&
                      key !== 'deleted_at' &&
                      key !== 'created_at' &&
                      key !== 'updated_at' &&
                      key !== 'dostap_gaji_fakultas_id' &&
                      key !== 'dostap_gaji_universitas_id' &&
                      key !== 'pendapatan_bersih' &&
                      key !== 'dostap_potongan_id'
                    "
                  >
                    <label :for="key" class="text-navy">
                      {{ formatLabel(key) }}
                      <span
                        v-if="shouldShowTooltip(key)"
                        class="tooltip-icon"
                        @mouseover="showTooltip(key)"
                        @mouseout="hideTooltip()"
                      >
                        <i class="material-symbols-outlined">info</i>
                        <div v-if="showTooltips[key]" class="tooltip">
                          {{ tooltips[key] }}
                        </div>
                      </span>
                    </label>
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="formatRupiah(value)"
                      disabled
                    />
                  </div>
                  <div class="form-group mb-6 md:w-[36%] md:col-span-2">
                    <label for="" class="font-bold text-navy">
                      Pendapatan Bersih
                      <span
                        v-if="shouldShowTooltip('pendapatan_bersih')"
                        class="tooltip-icon"
                        @mouseover="showTooltip('pendapatan_bersih')"
                        @mouseout="hideTooltip()"
                      >
                        <i class="material-symbols-outlined">info</i>
                        <div
                          v-if="showTooltips['pendapatan_bersih']"
                          class="tooltip"
                        >
                          {{ tooltips['pendapatan_bersih'] }}
                        </div>
                      </span>
                    </label>
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="
                        formatRupiah(
                          selectedGajiData.pajak[0].pendapatan_bersih
                        )
                      "
                      disabled
                    />
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="pt-5 pb-5 text-center">
                  Tidak ada data yang tersedia untuk periode yang dipilih.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DeleteConfirmModal from '~/components/DeleteModalTransaksi.vue' // Impor komponen DeleteConfirmModal

export default {
  components: {
    DeleteConfirmModal, // Daftarkan komponen DeleteConfirmModal di sini
  },
  data() {
    return {
      currentId: null,
      selId: null,
      dosenData: {},
      periods: [],
      selectedPeriod: null,
      selectedGajiData: null,
      tooltips: {
        jml_set_pot_kn_pajak: 'Bruto untuk pajak - Jumlah potongan kena pajak',
        bruto_pajak: 'Gaji Pusat + Gaji Fakultas Hukum + Pensiun',
        bruto_murni: 'Gaji Pusat + Gaji Fakultas Hukum',
        ptkp: 'Jumlah Potongan',
        biaya_jabatan: 'Bruto Murni x 5%',
        pajak_pph21: 'Potongan Tak Kena Pajak x 5%',
        pkp: ' Jumlah Setoran Potongan Kena Pajak - Potongan Tak Kena Pajak',
        jml_pot_kn_pajak: 'Aksa Mandiri + DPLK Pensiun + Pensiun',
        jml_set_pajak:
          'Bruto untuk Pajak - (DPLK pensiun + Aksa Mandiri + Pensiun + PPh21)',
        pendapatan_bersih:
          'Jumlah Setoran Potongan Kena Pajak - Potongan Tak Kena Pajak',
      },
      showTooltips: {},
      // Tentukan input-input tertentu yang memerlukan ikon dan tooltip
      inputsWithTooltips: [
        'jml_set_pot_kn_pajak',
        'ptkp',
        'bruto_pajak',
        'bruto_murni',
        'biaya_jabatan',
        'pajak_pph21',
        'pkp',
        'jml_pot_kn_pajak',
        'jml_set_pajak',
        'pendapatan_bersih',
      ],
      isModalOpen: false,
      monthYear: '',
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const { data } = await $axios.get(`/dosenlb/gaji/${params.id}`, {
        headers,
      })

      // Log data received from the API
      console.log('Data from API:', data)

      // Process data received from the API
      const dosenData = data.data // Assuming dosen_tetap is nested under "data"
      const periods = data.data.transaksi // Assuming transaksi contains periods directly

      // Log processed data
      console.log('Dosen Data:', dosenData)
      console.log('Periods:', periods)

      return { dosenData, periods }
    } catch (error) {
      console.error(error)
      throw error
    }
  },

  methods: {
    fetchGajiData() {
      console.log('Fetching data...')
      console.log('Selected Period:', this.selectedPeriod)
      console.log('Periods:', this.periods)
      if (this.selectedPeriod) {
        // Filter the data based on the selected period
        const selectedData = this.periods.find((item) => {
          return (
            item.periode.month === this.selectedPeriod.periode.month &&
            item.periode.year === this.selectedPeriod.periode.year
          )
        })

        console.log(selectedData)
        // Update the selectedGajiData variable
        this.selectedGajiData = selectedData || null
        this.selId = this.selectedGajiData.id
        this.monthYear = `${this.selectedGajiData?.periode.month} ${this.selectedGajiData?.periode.year}`
        console.log(this.selectedGajiData)
      } else {
        this.selectedGajiData = null // Clear selectedGajiData if no period is selected
      }
      // Log the selectedGajiData for debugging
      console.log('selectedGajiData:', this.selectedGajiData)
    },

    calculateTotal(component) {
      const data = this.selectedGajiData[component][0][component]

      const total = Object.keys(data)
        .filter(
          (key) =>
            key !== 'id' &&
            key !== 'dosen_lb_id' &&
            key !== 'deleted_at' &&
            key !== 'created_at' &&
            key !== 'updated_at' &&
            key !== `total_${component}` // Exclude total_gaji_fakultas, total_gaji_univ, etc.
        )
        .reduce((acc, key) => {
          const value = parseFloat(data[key]) || 0
          return acc + value
        }, 0)

      return this.formatRupiah(total.toString())
    },
    formatRupiah(nominal) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(nominal)
    },
    formatLabel(key) {
      return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    showTooltip(key) {
      this.$set(this.showTooltips, key, true)
    },
    hideTooltip() {
      this.showTooltips = {}
    },
    shouldShowTooltip(key) {
      // Periksa apakah input ini memerlukan ikon dan tooltip
      return this.inputsWithTooltips.includes(key)
    },
    showModal() {
      // const selId = this.selIdTetapData.find((d) => d.id === id)
      // this.currentId = id
      // this.monthYear = `${this.transaksiData?.transaksi[0]?.periode.month} ${this.transaksiData?.transaksi[0]?.periode.year}`
      this.isModalOpen = true
      console.log('MOdal')
    },

    hideModal() {
      this.isModalOpen = false
    },
    deleteDosenTetap() {
      // Lakukan sesuatu untuk menghapus data Dosen Tetap
      console.log(`Menghapus dosen dengan ID: ${this.selId}`)
      this.deleteTransaksiById(this.selId)
      this.isModalOpen = false
    },
    async deleteTransaksiById(id) {
      try {
        await this.$axios.delete(`/dosenlb/gaji/transaksi/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        // Jika berhasil, tutup modal dan refresh data
        this.isModalOpen = false
        // this.fetchDosenTetapData()
        console.log('Hapus OK')
        this.$router.push('../')
      } catch (error) {
        console.error('Error deleting dosen:', error)
      }
    },
    async printSalarySlip(transaksiId) {
      try {
        const token = localStorage.getItem('token') // ambil token dari penyimpanan lokal
        const response = await this.$axios.get(
          `/dosenlb/gaji/slip/cetak/${transaksiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // sertakan token dalam header
            },
          }
        )
        const pdfUrl = response.data.data.url
        window.open(pdfUrl, '_blank')
      } catch (error) {
        console.error('Error fetching the salary slip:', error)
      }
    },

    async sendSalarySlipViaWhatsApp(transaksiId) {
      try {
        const token = localStorage.getItem('token')
        await this.$axios.post(
          `/dosenlb/gaji/slip/kirim/${transaksiId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        alert('Slip gaji berhasil dikirim via WhatsApp.') // Pesan sukses
      } catch (error) {
        console.error('Error sending the salary slip via WhatsApp:', error)
        alert('Gagal mengirim slip gaji via WhatsApp. Silakan coba lagi.') // Pesan error
      }
    },
  },
}
</script>

<style scoped>
.tooltip-icon {
  position: relative;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  top: -50px; /* Sesuaikan dengan jarak yang diinginkan dari elemen terkait */
  left: 120px;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 12px; /* Sesuaikan dengan kebutuhanmu */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  width: auto; /* Sesuaikan dengan lebar yang diinginkan */
  white-space: nowrap; /* Menentukan bahwa teks tidak boleh dibungkus */
  transition: opacity 0.3s ease, visibility 0.3s ease;
  font-weight: normal;
}

.tooltip-icon:hover .tooltip {
  opacity: 1;
  visibility: visible;
}
</style>
