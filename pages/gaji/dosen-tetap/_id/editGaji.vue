<template>
  <section>
    <div class="flex justify-between mt-[50px]">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <nuxt-link
          :to="{
            name: 'gaji-dosen-tetap-id-detailsGaji',
            params: { id: dosen_tetap_id },
          }"
          class="mr-[7px]"
        >
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
                        <td class="">
                          {{ transaksiData.no_pegawai }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nama Lengkap</td>
                        <td>:</td>
                        <td class="">{{ transaksiData.nama }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">NPWP</td>
                        <td>:</td>
                        <td class="">{{ transaksiData.npwp }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Golongan</td>
                        <td>:</td>
                        <td class="">{{ transaksiData.golongan }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Jabatan</td>
                        <td>:</td>
                        <td class="">{{ transaksiData.jabatan }}</td>
                      </tr>

                      <tr>
                        <td class="text-grey">Bank</td>
                        <td>:</td>
                        <td>
                          <select
                            class="p-1 border input-field"
                            v-model="selectedBank"
                            @change="updateRekening"
                          >
                            <option
                              v-for="bank in transaksiData.banks"
                              :key="bank.id"
                              :value="bank.id"
                            >
                              {{ bank.nama_bank }}
                            </option>
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-grey">Nomor Rekening</td>
                        <td>:</td>
                        <td class="">{{ getSelectedRekening() }}</td>
                      </tr>

                      <tr>
                        <td class="text-grey">Periode</td>
                        <td>:</td>
                        <td class="">
                          <!-- {{ transaksiData?.transaksi[0]?.periode.month }} -->
                          {{ monthYear }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="space-y-3">
                <form action="" @submit.prevent="tambahTransaksiGaji">
                  <div
                    class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                  >
                    Gaji Universitas
                  </div>

                  <!-- Konten Gaji Pusat -->

                  <!-- tampilkan data dari API secara dinamis -->
                  <div v-if="transaksi">
                    <div
                      class="grid grid-cols-1 my-2 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                    >
                      <!-- eslint-disable-next-line vue/no-use-v-if-with-v-for -->
                      <div
                        v-for="(value, key) in transaksi.gaji_universitas[0]"
                        :key="key"
                        class="md:w-3/4 form-group"
                        v-if="
                          ![
                            'id',
                            'dosen_tetap_id',
                            'deleted_at',
                            'created_at',
                            'updated_at',
                          ].includes(key)
                        "
                      >
                        <label :for="key" class="text-navy">{{
                          formatLabel(key)
                        }}</label>
                        <input
                          type="text"
                          class="font-medium input-field"
                          v-model.number="transaksi.gaji_universitas[0][key]"
                          @input="calculateTotal"
                        />
                      </div>
                      <div class="md:w-3/4 form-group">
                        <label for="totalGaji" class="text-navy"
                          >Total Gaji Universitas</label
                        >
                        <input
                          type="text"
                          class="font-medium input-field"
                          id="totalGaji"
                          :value="formatRupiah(totalGaji)"
                          disabled
                        />
                      </div>
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
                    <div class="md:w-3/4 form-group">
                      <label class="text-navy">Tunjangan Tambahan</label>
                      <input
                        type="text"
                        class="font-medium input-field"
                        v-model.number="gaji_fakultas.tunjangan_tambahan"
                      />
                    </div>
                    <div class="md:w-3/4 form-group">
                      <label class="text-navy">Honar Kinerja</label>
                      <input
                        type="text"
                        class="font-medium input-field"
                        v-model.number="gaji_fakultas.honor_kinerja"
                      />
                    </div>
                    <div class="md:w-3/4 form-group">
                      <label class="text-navy">Total</label>
                      <input
                        type="text"
                        class="font-medium input-field"
                        :value="totalGajiFakultas"
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
                  ></div>
                  <!-- Section Pajak-->
                  <div
                    class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
                  >
                    Pajak
                  </div>

                  <!-- Konten Pajak -->
                  <div
                    class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
                  ></div>
                  <div class="flex justify-center py-8">
                    <button
                      type="submit"
                      class="rounded-full btn btn-primary md:w-[260px]"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      transaksiData: {
        banks: [],
      },
      transaksi: null,
      selectedBank: null,
      gaji_pokok: '',
      tunjangan_fungsional: '',
      tunjangan_struktural: '',
      tunjangan_khusus_istimewa: '',
      tunjangan_presensi_kerja: '',
      tunjangan_tambahan: '',
      tunjangan_suami_istri: '',
      tunjangan_anak: '',
      uang_lembur_hk: '',
      uang_lembur_hl: '',
      transport_kehadiran: '',
      honor_universitas: '',
      total_gaji_universitas: '',
      gaji_fakultas: {
        tunjangan_tambahan: 0,
        honor_kinerja: 0,
        honor_kelebihan_mengajar: '',
        honor_mengajar_dpk: '',
        peny_honor_mengajar: '',
        tunjangan_guru_besar: '',
        honor: '',
      },
      potongan: {
        sp_fh: '',
        infaq: '',
      },
      pensiun: '',
      bruto_pajak: '',
      bruto_murni: '',
      biaya_jabatan: '',
      aksa_mandiri: '',
      dplk_pensiun: '',
      jumlah_potongan_kena_pajak: '',
      jumlah_set_potongan_kena_pajak: '',
      ptkp: '',
      pkp: '',
      pajak_pph21: '',
      jumlah_set_pajak: '',
      potongan_tak_kena_pajak: '',
      pendapatan_bersih: '',
      dosen_tetap_id: 0,
      dostap_bank_id: '',
      monthYear: '',
      gaji_universitas: {},
    }
  },
  async mounted() {
    await this.fetchTransaksiData()
    // this.gaji_universitas = this.transaksi.gaji_universitas.map((v, i) => {
    //   return {
    //     gaji_pokok: 1,
    //   }
    //   // parseInt(v.gaji_pokok) +
    //   // parseInt(v.tunjangan_fungsional) +
    //   // parseInt(v.tunjangan_struktural) +
    //   // parseInt(v.tunjangan_suami_istri)
    // })[0]

    this.gaji_fakultas.tunjangan_tambahan =
      this.transaksi.gaji_fakultas[0].gaji_fakultas.tunjangan_tambahan
    this.gaji_fakultas.honor_kinerja =
      this.transaksi.gaji_fakultas[0].gaji_fakultas.honor_kinerja
  },
  methods: {
    async fetchTransaksiData() {
      try {
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}
        const transaksiId = this.$route.params.id
        const response = await this.$axios.get(
          `/dosentetap/gaji/transaksi/${transaksiId}`,
          {
            headers,
          }
        )

        // Langsung tetapkan data transaksi ke transaksiData
        this.transaksiData = response.data.data
        this.dosen_tetap_id = response.data.data.dosen_tetap_id
        this.transaksi = response.data.data.transaksi[0]
        console.log(this.dosen_tetap_id)
        console.log(this.transaksiData)
        console.log(this.transaksi)
        this.monthYear = `${this.transaksiData?.transaksi[0]?.periode.month} ${this.transaksiData?.transaksi[0]?.periode.year}`
        this.selectedBank = this.transaksiData?.transaksi[0]?.bank[0]?.id
      } catch (error) {
        console.error('Error fetching transaksi data:', error)
        // Handle error appropriately
      }
    },
    getCurrentMonthYear() {
      const currentDate = new Date()
      const monthNames = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
      ]

      const month = monthNames[currentDate.getMonth()]
      const year = currentDate.getFullYear()

      return `${month} ${year}`
    },
    updateRekening() {
      const selectedBankObject = this.transaksiData.banks.find(
        (bank) => bank.id === this.selectedBank
      )

      if (selectedBankObject) {
        // Assuming you want to update the displayed bank account immediately
        // If you need to perform additional logic, you can modify this part accordingly
        this.transaksiData.nomor_rekening = selectedBankObject.no_rekening
      } else {
        // Handle the case when the selected bank is not found
        // You can clear the displayed bank account or show an error message
        this.transaksiData.nomor_rekening = ''
      }
    },
    getSelectedRekening() {
      // Get the selected bank account based on the selectedBank value
      const selectedBankObject = this.transaksiData.banks.find(
        (bank) => bank.id === this.selectedBank
      )
      return selectedBankObject ? selectedBankObject.no_rekening : ''
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
    formatLabel(key) {
      // Format kunci menjadi label
      return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    },
    formatRupiah(value) {
      // Format nilai menjadi format rupiah
      let formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
      })
      return formatter.format(value)
    },
  },
  computed: {
    totalGaji() {
      // Menghitung total gaji

      return this.transaksi.gaji_universitas.map((v, i) => {
        return (
          parseInt(v.gaji_pokok) +
          parseInt(v.tunjangan_fungsional) +
          parseInt(v.tunjangan_struktural) +
          parseInt(v.tunjangan_suami_istri)
        )
      })[0]

      // console.log(
      //   this.transaksi.gaji_universitas.reduce((total, value) => {
      //     return value
      //   }, 0)
      // )

      return Object.values(this.transaksi.gaji_universitas[0]).reduce(
        (total, value) => {
          if (typeof value === 'number') {
            return total + value
          }
          return 10
        },
        0
      )
    },
    totalGajiFakultas() {
      return (
        parseInt(this.gaji_fakultas.tunjangan_tambahan) +
        parseInt(this.gaji_fakultas.honor_kinerja)
      )
    },
  },
}
</script>
