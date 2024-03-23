<template>
  <section>
    <!-- Spinner Loading -->
    <div v-if="isLoading" class="fixed inset-0 z-40 bg-black opacity-30"></div>
    <div
      v-if="isLoading"
      class="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div role="status">
        <svg
          aria-hidden="true"
          class="w-16 h-16 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
          <flashMessage
            :type="flashType"
            :message="flashMsg"
            :autoClose="5000"
            @clearMessage="clearFlashMessage"
          ></flashMessage>

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
                          {{ dosenData.no_pegawai }}
                        </td>
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
                        <td>
                          <select
                            class="p-1 border input-field"
                            v-model="selectedBank"
                            @change="updateRekening"
                          >
                            <option
                              v-for="bank in dosenData.banks"
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
                        <td class="text-grey">Status Bank</td>
                        <td>:</td>
                        <td class="">
                          <select
                            name="statusBank"
                            id="statusBank"
                            class="p-1 border input-field"
                            v-model="statusBank"
                          >
                            <option value="Payroll">Payroll</option>
                            <option value="Non Payroll">Non Payroll</option>
                          </select>
                        </td>
                      </tr>

                      <tr>
                        <td class="text-grey">Periode</td>
                        <td>:</td>
                        <td class="">
                          <date-range-picker
                            v-model="selectedDateRange"
                            :disabledDates="disabledDates"
                            class="mt-2 border border-navy"
                          />
                          <div v-if="responseData">
                            <p>
                              Start Date: {{ responseData.gaji_date_start }}
                            </p>
                            <p>End Date: {{ responseData.gaji_date_end }}</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div class="space-y-3">
                <form action="" @submit.prevent="tambahTransaksiGaji">
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
                    <!-- Konten Komponen Pendapatan -->
                    <div
                      class="form-group"
                      v-for="(value, key) in filteredKomponenPendapatan"
                      :key="key"
                    >
                      <label :for="`komponen-${key}`" class="text-navy">{{
                        formatLabel(key)
                      }}</label>
                      <input
                        type="text"
                        :id="`komponen-${key}`"
                        class="input-field"
                        v-model.number="komponen_pendapatan[key]"
                        required
                      />
                    </div>

                    <div
                      class="form-group"
                      v-for="(nilai, nama) in komponen_pendapatan.komponen_baru"
                      :key="nama"
                    >
                      <label class="text-navy">{{ nama }}</label>
                      <div class="flex flex-row">
                        <input
                          type="number"
                          class="input-field basis-[95%]"
                          v-model.number="
                            komponen_pendapatan.komponen_baru[nama]
                          "
                        />
                        <button
                          class="ml-2 text-red-500 hover:text-red-700"
                          @click.prevent="
                            hapusKomponen('komponen_pendapatan', nama)
                          "
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                      <!-- Tombol Hapus -->
                    </div>
                    <!-- tombol kostumisasi -->
                    <div class="justify-center mt-5 space-y-auto form-group">
                      <button
                        class="p-2 text-white bg-green-600 border rounded-full"
                        @click.prevent="openModal('komponen_pendapatan')"
                      >
                        Tambahkan Komponen Lainnya
                      </button>
                    </div>
                    <div class="mb-4 form-group">
                      <label for="" class="font-bold text-navy"
                        >Total Komponen Pendapatan</label
                      >
                      <input
                        type="text"
                        class="font-medium bg-grey input-field"
                        disabled
                        :value="formattedTotalGajiFakultas"
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
                    <div class="form-group">
                      <label for="" class="text-navy">SP FH</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="potongan.sp_fh"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Infaq</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="potongan.infaq"
                        required
                      />
                    </div>
                    <div
                      class="form-group"
                      v-for="(nilai, nama) in potongan.komponen_baru"
                      :key="nama"
                    >
                      <label class="text-navy">{{ nama }}</label>
                      <div class="flex flex-row">
                        <input
                          type="number"
                          class="input-field basis-[95%]"
                          v-model="potongan.komponen_baru[nama]"
                        />
                        <button
                          class="ml-2 text-red-500 hover:text-red-700"
                          @click.prevent.prevent="
                            hapusKomponen('potongan', nama)
                          "
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                      <!-- Tombol Hapus -->
                    </div>
                    <div class="justify-center mt-5 space-y-auto form-group">
                      <button
                        class="p-2 text-white bg-green-600 border rounded-full"
                        @click.prevent="openModal('potongan')"
                      >
                        Tambahkan Komponen Lainnya
                      </button>
                    </div>
                    <div class="mb-4 form-group">
                      <label for="" class="font-bold text-navy"
                        >Total Potongan</label
                      >
                      <input
                        type="text"
                        class="font-medium bg-grey input-field"
                        disabled
                        :value="formattedTotalPotongan"
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
                    <!-- Pajak PPh25 -->
                    <div class="form-group">
                      <label class="text-navy">PPH 25</label>
                      <input
                        type="text"
                        class="input-field"
                        :value="calculatePph25"
                        disabled
                      />
                    </div>

                    <div class="col-span-2 md:w-[48%]">
                      <div class="form-group">
                        <label for="" class="font-bold text-navy"
                          >Pendapatan Bersih</label
                        >
                        <input
                          type="text"
                          class="font-medium bg-grey input-field"
                          disabled
                          :value="calculatePendapatanBersih"
                        />
                      </div>
                    </div>
                  </div>
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
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click.prevent="showModal = false">&times;</span>
        <p class="mb-2 text-lg font-semibold text-center text-navy">
          Tambah Komponen Baru
        </p>
        <div class="flex justify-center">
          <form @submit.prevent="tambahKomponenBaru" class="mt-4">
            <label for="komponenNama" class="mr-1">Nama Komponen:</label>
            <input
              type="text"
              id="komponenNama"
              v-model="komponenBaru.nama"
              class="mr-2 input-field"
            />
            <label for="komponenNilai" class="ml-4 mr-1">Nilai:</label>
            <input
              type="number"
              id="komponenNilai"
              v-model.number="komponenBaru.nilai"
              class="input-field"
            />
            <div class="flex justify-center mt-4">
              <button type="submit" class="btn btn-primary">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import DateRangePicker from 'vue2-daterange-picker'
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'
export default {
  components: {
    flashMessage: () => import('~/components/FlashMessage.vue'),
    DateRangePicker,
  },
  data() {
    return {
      dosenData: {
        banks: [],
      },
      isLoading: false,
      selectedBank: null,
      flashType: '', // 'success' atau 'error'
      flashMsg: '',
      gaji_pokok: 0,
      tunjangan_fungsional: 0,
      tunjangan_struktural: 0,
      tunjangan_khusus_istimewa: 0,
      tunjangan_presensi_kerja: 0,
      tunjangan_tambahan: 0,
      tunjangan_suami_istri: 0,
      tunjangan_anak: 0,
      uang_lembur_hk: 0,
      uang_lembur_hl: 0,
      transport_kehadiran: 0,
      honor_universitas: 0,
      total_gaji_universitas: 0,
      gaji_fakultas: {
        tunjangan_tambahan: 0,
        honor_kinerja: 0,
        honor_kelebihan_mengajar: 0,
        honor_mengajar_dpk: 0,
        peny_honor_mengajar: 0,
        tunjangan_guru_besar: 0,
        honor: 0,
        komponen_baru: {},
      },
      komponen_pendapatan: {
        tunjangan_tambahan: 0,
        honor_kinerja: 0,
        honor_mengajar: 0,
        tunjangan_guru_besar: 0,
        komponen_baru: {},
      },
      pajak_pph25: 0,
      potongan: {
        sp_fh: 0,
        infaq: 0,
        komponen_baru: {},
      },
      pensiun: 0,
      bruto_pajak: 0,
      bruto_murni: 0,
      biaya_jabatan: 0,
      aksa_mandiri: 0,
      dplk_pensiun: 0,
      jumlah_potongan_kena_pajak: 0,
      jumlah_set_potongan_kena_pajak: 0,
      ptkp: 0,
      // pkp: 0,
      pajak_pph21: 0,
      jumlah_set_pajak: 0,
      potongan_tak_kena_pajak: 0,
      pendapatan_bersih: 0,
      dosen_luar_biasa_id: '',
      doslb_bank_id: '',
      showModal: false,
      komponenBaru: {
        nama: '',
        nilai: 0,
        modalContext: '',
      },
      statusBank: '',
      gaji_date_start: '',
      gaji_date_end: '',
      selectedDateRange: {
        startDate: null,
        endDate: null,
      },
      disabledDates: {
        to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
      },
      responseData: null,
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      // Fetch the data for the specific ID
      const response = await $axios.get(`/dosenlb/${params.id}`, { headers })

      // Find the specific dosen data from the array
      const dosenDataArray = response.data.data.data
      const dosenData = dosenDataArray.find(
        (dosen) => dosen.id === parseInt(params.id)
      )

      console.log('Dosen Data: ', dosenData)

      return { dosenData }
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle errors appropriately
      throw error
    }
  },

  methods: {
    async tambahTransaksiGaji() {
      try {
        // Menyiapkan data untuk komponen pendapatan, mengesampingkan komponen_baru
        const komponenPendapatanData = this.konversiKomponenKeInteger(
          this.komponen_pendapatan
        )
        const potonganData = this.konversiKomponenKeInteger(this.potongan)

        const startDate = this.selectedDateRange.startDate
          ? this.selectedDateRange.startDate.toISOString().slice(0, 10)
          : null
        const endDate = this.selectedDateRange.endDate
          ? this.selectedDateRange.endDate.toISOString().slice(0, 10)
          : null

        // Data yang akan dikirim
        const dataToPost = {
          komponen_pendapatan: komponenPendapatanData,
          potongan: potonganData,
          pajak_pph25: this.calculatePph25,
          pendapatan_bersih: this.calculatePendapatanBersih,
          dosen_luar_biasa_id: this.dosenData.id,
          doslb_bank_id: this.selectedBank,
          status_bank: this.statusBank,
          gaji_date_start: startDate,
          gaji_date_end: endDate,
        }

        // Menampilkan data yang akan dikirim ke API di console log
        console.log('Data to post:', dataToPost)

        // console.log(this.hasil)
        const response = await this.$axios.post(
          'dosenlb/gaji/transaksi/create',
          dataToPost,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        this.flashType = 'success'
        this.flashMsg = 'Data transaksi gaji dosenlb berhasil ditambahkan!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false

          // Mengalihkan ke halaman yang diinginkan
          this.$router.push('/gaji/dosen-lb')
        }, 2000)
      } catch (error) {
        console.error('Error tambah Dosen Tetap:', error)
        if (error.response) {
          // Server responded with a status other than 200 range
          console.error('Response data:', error.response.data)
          console.error('Response status:', error.response.status)
          console.error('Response headers:', error.response.headers)
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Error request:', error.request)
        } else {
          // Something happened in setting up the request
          console.error('Error:', error.message)
          this.flashType = 'error'
          this.flashMsg =
            'Terjadi kesalahan saat menambahkan data transaksi dosenlb dosen.'
        }
      }
    },
    konversiKomponenKeInteger(komponen) {
      const data = { ...komponen }
      delete data.komponen_baru // Hapus komponen_baru yang merupakan objek

      // Tambahkan kembali nilai dari komponen_baru sebagai integer
      for (const key in komponen.komponen_baru) {
        const value = parseInt(komponen.komponen_baru[key], 10)
        if (!isNaN(value)) {
          data[key] = value
        }
      }

      return data
    },
    formatLabel(key) {
      // Contoh pemetaan dari key ke label yang ramah
      const labels = {
        tunjangan_tambahan: 'Tunjangan Tambahan',
        honor_kinerja: 'Honor Kinerja',
        honor_mengajar: 'Honor Mengajar',
        tunjangan_guru_besar: 'Tunjangan Guru Besar',
        // Tambahkan pemetaan lainnya sesuai kebutuhan
      }

      // Kembalikan label yang cocok dengan key, atau key itu sendiri jika tidak ditemukan
      return labels[key] || key
    },
    clearFlashMessage() {
      this.flashType = ''
      this.flashMsg = ''
    },
    tambahKomponenBaru() {
      if (!this.komponenBaru.nama || this.komponenBaru.nilai === null) {
        alert('Harap isi semua field!')
        return
      }

      // Gunakan Vue.set untuk menambahkan properti baru secara reaktif
      if (this.modalContext === 'komponen_pendapatan') {
        this.$set(
          this.komponen_pendapatan.komponen_baru,
          this.komponenBaru.nama,
          this.komponenBaru.nilai
        )
      } else if (this.modalContext === 'potongan') {
        this.$set(
          this.potongan.komponen_baru,
          this.komponenBaru.nama,
          this.komponenBaru.nilai
        )
      }

      // Reset komponenBaru untuk input selanjutnya
      this.komponenBaru = { nama: '', nilai: 0 }

      // Tutup modal
      this.showModal = false
    },
    hapusKomponen(context, namaKomponen) {
      if (context === 'komponen_pendapatan') {
        // Hapus komponen dari komponen_pendapatan
        this.$delete(this.komponen_pendapatan.komponen_baru, namaKomponen)
      } else if (context === 'potongan') {
        // Hapus komponen dari potongan
        this.$delete(this.potongan, namaKomponen)
      }
    },
    openModal(context) {
      this.modalContext = context // Set the modal context
      this.showModal = true // Show the modal
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
      const selectedBankObject = this.dosenData.banks.find(
        (bank) => bank.id === this.selectedBank
      )

      if (selectedBankObject) {
        // Assuming you want to update the displayed bank account immediately
        // If you need to perform additional logic, you can modify this part accordingly
        this.dosenData.nomor_rekening = selectedBankObject.no_rekening
      } else {
        // Handle the case when the selected bank is not found
        // You can clear the displayed bank account or show an error message
        this.dosenData.nomor_rekening = ''
      }
    },
    getSelectedRekening() {
      // Get the selected bank account based on the selectedBank value
      const selectedBankObject = this.dosenData.banks.find(
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
            key !== 'dosenlb_id' &&
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
    // tambahKomponenGajiFakultas() {
    //   // Tambahkan logika untuk menambahkan komponen ke state lokal
    //   // Contoh:
    //   this.gaji_fakultas[this.komponenBaru.nama] = this.komponenBaru.nilai
    //   this.showModal = false
    //   this.komponenBaru = { nama: '', nilai: 0 }
    // },
  },
  computed: {
    totalKomponenPendapatan() {
      let total = 0
      for (const value of Object.values(this.komponen_pendapatan)) {
        total += Number(value) || 0 // Pastikan ini adalah angka
      }
      for (const value of Object.values(
        this.komponen_pendapatan.komponen_baru
      )) {
        total += Number(value) || 0 // Tambahkan ini untuk memperhitungkan komponen_baru
      }
      return total
    },

    totalPotongan() {
      let total = this.potongan.sp_fh + this.potongan.infaq
      Object.values(this.potongan.komponen_baru).forEach((val) => {
        total += parseFloat(val) || 0
      })
      return total
    },

    calculatePph25() {
      // Pastikan totalKomponenPendapatan adalah angka
      return this.totalKomponenPendapatan * 0.5 * 0.06
    },

    calculatePendapatanBersih() {
      // Penghitungan pendapatan bersih
      return (
        this.totalKomponenPendapatan -
        (this.totalPotongan + this.calculatePph25)
      )
    },

    formattedTotalGajiFakultas() {
      return this.formatRupiah(this.totalKomponenPendapatan)
    },

    formattedTotalPotongan() {
      return this.formatRupiah(this.totalPotongan)
    },
    totalGajiUniversitas() {
      return (
        this.gaji_pokok +
        this.tunjangan_fungsional +
        this.tunjangan_struktural +
        this.tunjangan_khusus_istimewa +
        this.tunjangan_presensi_kerja +
        this.tunjangan_tambahan +
        this.uang_lembur_hk +
        this.honor_universitas +
        this.uang_lembur_hl +
        this.tunjangan_suami_istri +
        this.transport_kehadiran +
        this.tunjangan_anak
      )
    },
    formattedTotalGajiUniversitas() {
      return this.formatRupiah(this.totalGajiUniversitas)
    },
    totalGajiFakultas() {
      let total = 0

      // Jumlahkan nilai komponen yang sudah diketahui
      total += this.komponen_pendapatan.tunjangan_tambahan
      total += this.komponen_pendapatan.honor_kinerja
      total += this.komponen_pendapatan.tunjangan_guru_besar
      total += this.komponen_pendapatan.honor_mengajar

      // Jumlahkan nilai dari komponen baru, jika ada
      if (this.komponen_pendapatan.komponen_baru) {
        for (let key in this.komponen_pendapatan.komponen_baru) {
          if (this.komponen_pendapatan.komponen_baru.hasOwnProperty(key)) {
            total +=
              parseFloat(this.komponen_pendapatan.komponen_baru[key]) || 0
          }
        }
      }

      return total
    },
    filteredKomponenPendapatan() {
      // Copy objek komponen_pendapatan
      const filtered = { ...this.komponen_pendapatan }
      // Hapus properti yang tidak diinginkan
      delete filtered.komponen_baru
      // Kembalikan objek yang telah difilter
      return filtered
    },
    formattedTotalGajiFakultas() {
      return this.formatRupiah(this.totalGajiFakultas)
    },
    totalPotongan() {
      let total = 0

      total += this.potongan.sp_fh
      total += this.potongan.infaq

      if (this.potongan.komponen_baru) {
        for (let key in this.potongan.komponen_baru) {
          if (this.potongan.komponen_baru.hasOwnProperty(key)) {
            total += parseFloat(this.potongan.komponen_baru[key]) || 0
          }
        }
      }
      return total
    },
    formattedTotalPotongan() {
      return this.formatRupiah(this.totalPotongan)
    },
    brutoPajak() {
      return this.totalGajiUniversitas + this.totalGajiFakultas + this.pensiun
    },
    brutoMurni() {
      return this.totalGajiFakultas + this.totalGajiUniversitas
    },
    biayaJabatan() {
      return this.brutoMurni * 0.05
    },
    jumlahPotonganKenaPajak() {
      return this.aksa_mandiri + this.dplk_pensiun + this.pensiun
    },
    jumlahSetoranPotonganKenaPajak() {
      return this.brutoPajak - this.jumlahPotonganKenaPajak
    },
    pkp() {
      return this.jumlahSetoranPotonganKenaPajak - this.ptkp
    },
    pajakPph21() {
      return this.pkp * 0.05
    },
    jumlahSetoranPajak() {
      return (
        this.brutoPajak -
        (this.dplk_pensiun + this.aksa_mandiri + this.pensiun + this.pajakPph21)
      )
    },
    formattedPendapatanBersih() {
      return this.formatRupiah(this.pendapatanBersih)
    },
    potonganTakKenaPajak() {
      return this.totalPotongan
    },
    pendapatanBersih() {
      return this.jumlahSetoranPotonganKenaPajak - this.potonganTakKenaPajak
    },
  },
}
</script>

<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  border-radius: 16px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
