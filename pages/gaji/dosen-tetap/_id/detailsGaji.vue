<template>
  <section>
    <div class="flex justify-between mt-[50px]">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <nuxt-link to="/gaji/dosen-tetap">
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
            Transaksi Gaji Dosen Tetap
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
                              name: 'gaji-dosen-tetap-id-edit',
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
                          class="flex items-center justify-center w-6 h-6 border border-black"
                        >
                          <span class="material-symbols-outlined"> print </span>
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
                <div
                  class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                >
                  Gaji Universitas
                </div>

                <!-- Konten Gaji Pusat -->

                <!-- tampilkan data dari API secara dinamis -->
                <div
                  class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                >
                  <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                  <div
                    v-for="(value, key) in selectedGajiData.gaji_universitas[0]"
                    :key="key"
                    class="md:w-3/4 form-group"
                    v-if="
                      key !== 'id' &&
                      key !== 'dosen_tetap_id' &&
                      key !== 'deleted_at' &&
                      key !== 'created_at' &&
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
                      >Total Gaji Universitas</label
                    >
                    <input
                      type="text"
                      class="font-medium input-field"
                      :value="calculateTotalGajiUniversitas()"
                      disabled
                    />
                  </div>
                </div>

                <!-- Section Gaji Fakultas Hukum-->
                <div
                  class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                >
                  Gaji Fakultas Hukum
                </div>

                <!-- Konten Gaji Fakultas Hukum -->
                <div
                  class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                >
                  <div
                    v-for="(value, key) in selectedGajiData.gaji_fakultas[0]
                      .gaji_fakultas"
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
                      :value="calculateTotal('gaji_fakultas')"
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
      const { data } = await $axios.get(`/dosentetap/gaji/${params.id}`, {
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
    calculateTotalGajiUniversitas() {
      const gajiUniv = this.selectedGajiData.gaji_universitas[0]
      const total = Object.keys(gajiUniv)
        .filter(
          (key) =>
            key !== 'id' &&
            key !== 'dosen_tetap_id' &&
            key !== 'deleted_at' &&
            key !== 'created_at' &&
            key !== 'updated_at'
        )
        .reduce((acc, key) => {
          const value = parseFloat(gajiUniv[key]) || 0
          return acc + value
        }, 0)

      return this.formatRupiah(total.toString())
    },
    calculateTotal(component) {
      const data = this.selectedGajiData[component][0][component]

      const total = Object.keys(data)
        .filter(
          (key) =>
            key !== 'id' &&
            key !== 'dosen_tetap_id' &&
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
        await this.$axios.delete(`/dosentetap/gaji/transaksi/delete/${id}`, {
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
