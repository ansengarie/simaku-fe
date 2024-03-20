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
        <nuxt-link
          :to="{
            name: 'gaji-dosen-lb-id-detailsGaji',
            params: { id: dosen_luar_biasa_id },
          }"
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
            Edit Transaksi Gaji Dosen Luar Biasa
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
                          {{ no_pegawai }}
                        </td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nama Lengkap</td>
                        <td>:</td>
                        <td class="">{{ nama }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">NPWP</td>
                        <td>:</td>
                        <td class="">{{ npwp }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Golongan</td>
                        <td>:</td>
                        <td class="">{{ golongan }}</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Jabatan</td>
                        <td>:</td>
                        <td class="">{{ jabatan }}</td>
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
                              v-for="bank in banks"
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
                        <td class="">{{ getCurrentMonthYear() }}</td>
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
                    <div
                      v-for="(nilai, nama) in komponen_pendapatan"
                      :key="nama"
                      v-if="nama !== 'komponen_baru'"
                      class="form-group"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="text"
                          class="input-field basis-[95%]"
                          v-model.number="komponen_pendapatan[nama]"
                        />
                        <div
                          v-if="
                            nama !== 'tunjangan_tambahan' &&
                            nama !== 'honor_kinerja' &&
                            nama !== 'honor_kelebihan_mengajar' &&
                            nama !== 'honor_mengajar_dpk' &&
                            nama !== 'peny_honor_mengajar' &&
                            nama !== 'tunjangan_guru_besar' &&
                            nama !== 'honor'
                          "
                        >
                          <button
                            class="ml-2 text-red-500 hover:text-red-700"
                            @click.prevent="
                              hapusKomponen('komponen_pendapatan', nama)
                            "
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- komponen tambahan -->
                    <div
                      v-for="(nilai, nama) in komponen_pendapatan.komponen_baru"
                      :key="nama"
                      class="form-group"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="text"
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
                    </div>
                    <div class="justify-center mt-5 space-y-auto form-group">
                      <button
                        class="p-2 text-white bg-green-600 border rounded-full"
                        @click.prevent="openModal('komponen_pendapatan')"
                      >
                        Tambahkan Komponen Lainnya
                      </button>
                    </div>
                    <div class="col-span-2 md:w-[48%]">
                      <div class="mb-4 form-group">
                        <label for="" class="font-bold text-navy"
                          >Total Gaji Fakultas Hukum</label
                        >
                        <input
                          type="text"
                          class="font-medium bg-grey input-field"
                          disabled
                          :value="formattedTotalGajiFakultas"
                        />
                      </div>
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
                      class="form-group"
                      v-for="(nilai, nama) in potongan"
                      :key="nama"
                      v-if="nama !== 'komponen_baru'"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="number"
                          class="input-field basis-[95%]"
                          v-model.number="potongan[nama]"
                        />
                        <div v-if="nama !== 'sp_fh' && nama !== 'infaq'">
                          <button
                            class="ml-2 text-red-500 hover:text-red-700"
                            @click.prevent="hapusKomponen('potongan', nama)"
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <!-- Tombol Hapus -->
                    </div>

                    <div
                      class="form-group"
                      v-for="(nilai, nama) in potongan.komponen_baru"
                      :key="nama"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="number"
                          class="input-field basis-[95%]"
                          v-model.number="potongan.komponen_baru[nama]"
                        />
                        <button
                          class="ml-2 text-red-500 hover:text-red-700"
                          @click.prevent="hapusKomponen('potongan', nama)"
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
                    <div class="col-span-2 md:w-[47%]"></div>
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
                    <div class="form-group">
                      <label for="" class="text-navy">Pph 25</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="calculatePph25"
                        required
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
              v-model.number="komponenBaru.nama"
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
import banks from '~/static/banks'
export default {
  components: {
    flashMessage: () => import('~/components/FlashMessage.vue'),
  },
  data() {
    return {
      banks,
      isLoading: false,
      selectedBank: null,
      flashType: '', // 'success' atau 'error'
      flashMsg: '',
      gaji_pokok: 0,
      transaksiData: null,
      komponen_pendapatan: {
        tunjangan_tambahan: 0,
        honor_kinerja: 0,
        honor_mengajar: 0,
        tunjangan_guru_besar: 0,
        komponen_baru: {},
      },
      potongan: {
        sp_fh: 0,
        infaq: 0,
        komponen_baru: {},
      },
      pajak_pph25: 0,
      pendapatan_bersih: 0,
      dosen_luar_biasa_id: '',
      doslb_bank_id: '',
      showModal: false,
      komponenBaru: {
        nama: '',
        nilai: 0,
        modalContext: '',
      },
      nama_bank: '',
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      console.log(params.id)
      // Fetch the data for the specific transaction ID
      const response = await $axios.get(
        `/dosenlb/gaji/transaksi/${params.id}`,
        { headers }
      )

      console.log(response.data.data)
      // Perbarui state lokal dengan data terbaru dari server

      // Destructure the data you need from the response
      const {
        dosen_luar_biasa_id,
        no_pegawai,
        nama,
        npwp,
        golongan,
        jabatan,
        banks,
        transaksi,
      } = response.data.data
      const transaksiData = transaksi[0] // asumsikan hanya ada satu transaksi dalam array
      console.log(transaksiData)
      return {
        dosen_luar_biasa_id,
        no_pegawai,
        nama,
        npwp,
        golongan,
        jabatan,
        banks,
        transaksiData,
      }
      this.updateLocalState(response.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)

      // Tampilkan pesan error lebih detail jika response error tersedia
      if (error.response) {
        console.error('Detail error:', error.response.data)
      }
    }
  },
  mounted() {
    console.log(this.komponen_pendapatan.komponen_baru)
    if (this.transaksiData) {
      // Isi model form dengan data transaksi untuk gaji fakultas
      const komponenPendapatan =
        this.transaksiData.komponen_pendapatan[0].komponen_pendapatan

      this.komponen_pendapatan.tunjangan_tambahan =
        komponenPendapatan.tunjangan_tambahan

      this.komponen_pendapatan.honor_kinerja = komponenPendapatan.honor_kinerja
      komponenPendapatan.tunjangan_tambahan

      this.komponen_pendapatan.honor_mengajar =
        komponenPendapatan.honor_mengajar

      this.komponen_pendapatan.tunjangan_guru_besar =
        komponenPendapatan.tunjangan_guru_besar
      // Isi model form dengan data transaksi untuk potongan
      const potongan = this.transaksiData.potongan[0].potongan
      this.potongan.sp_fh = potongan.sp_fh
      this.potongan.infaq = potongan.infaq

      // Isi model form dengan data transaksi untuk pajak
      const pajak = this.transaksiData.pajak[0]
      this.pajak_pph25 = pajak.pajak_pph25
      this.pendapatan_bersih = pajak.pendapatan_bersih

      // Jika ada komponen dinamis dalam komponen_pendapatan atau potongan, isi mereka juga
      for (let key in komponenPendapatan) {
        if (
          !this.komponen_pendapatan.hasOwnProperty(key) &&
          key !== 'id' &&
          key !== 'deleted_at' &&
          key !== 'created_at' &&
          key !== 'updated_at'
        ) {
          this.$set(this.komponen_pendapatan, key, komponenPendapatan[key])
        }
      }

      for (let key in potongan) {
        if (
          !this.potongan.hasOwnProperty(key) &&
          key !== 'id' &&
          key !== 'deleted_at' &&
          key !== 'created_at' &&
          key !== 'updated_at'
        ) {
          this.$set(this.potongan, key, potongan[key])
        }
      }
      if (this.banks.length > 0 && !this.selectedBank) {
        this.selectedBank = this.banks[0].id // Set default jika belum ada yang terpilih
      }
    }
  },

  methods: {
    async tambahTransaksiGaji() {
      try {
        const gajiFakultasWithIntegers = {
          ...this.komponen_pendapatan,
          ...Object.fromEntries(
            Object.entries(this.komponen_pendapatan.komponen_baru).map(
              ([key, value]) => [key, parseInt(value)]
            )
          ),
        }

        // Hapus key 'komponen_baru' dari komponen_pendapatan
        delete gajiFakultasWithIntegers.komponen_baru

        // Lakukan hal yang sama untuk potongan
        const potonganWithIntegers = {
          ...this.potongan,
          ...Object.fromEntries(
            Object.entries(this.potongan.komponen_baru).map(([key, value]) => [
              key,
              parseInt(value),
            ])
          ),
        }
        delete potonganWithIntegers.komponen_baru
        await this.$nextTick()

        const dataToPost = {
          komponen_pendapatan: gajiFakultasWithIntegers,
          potongan: potonganWithIntegers,
          pajak_pph25: this.calculatePph25, // Gunakan computed property yang diperbarui
          pendapatan_bersih: this.calculatePendapatanBersih, // Gunakan computed property yang diperbarui
          doslb_bank_id: this.selectedBank,
        }

        // Menampilkan data yang akan dikirim ke API di console log
        console.log('Data to post:', dataToPost)

        // console.log(this.hasil)
        const response = await this.$axios.put(
          `/dosenlb/gaji/transaksi/update/${this.transaksiData.id}`,
          dataToPost,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        // Periksa apakah data berhasil disimpan
        if (response && response.status === 200) {
          // Data berhasil disimpan, perbarui state lokal
          this.updateLocalState(response.data)
        }
        this.flashType = 'success'
        this.flashMsg = 'Data transaksi gaji dosen berhasil diperbarui!'
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
            'Terjadi kesalahan saat menambahkan data transaksi gaji dosen.'
        }
      }
    },
    createDataToPost() {
      // Buat objek data yang akan dikirim ke server
      const dataToPost = {
        // ... data yang akan dikirim
      }
      return dataToPost
    },
    updateLocalState(dataFromServer) {
      // Periksa apakah response server berisi data untuk komponen_pendapatan dan potongan
      if (dataFromServer.komponen_pendapatan) {
        // Perbarui state komponen_pendapatan dengan data terbaru dari server
        this.komponen_pendapatan = {
          ...this.komponen_pendapatan, // Spread operator untuk menyertakan properti yang ada
          ...dataFromServer.komponen_pendapatan, // Perbarui dengan data terbaru dari server
        }
      }

      if (dataFromServer.potongan) {
        // Perbarui state potongan dengan data terbaru dari server
        this.potongan = {
          ...this.potongan,
          ...dataFromServer.potongan,
        }
      }

      // Log untuk debugging
      console.log(
        'State komponen_pendapatan setelah update:',
        this.komponen_pendapatan
      )
      console.log('State potongan setelah update:', this.potongan)
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
        // Periksa jika komponen merupakan bagian dari 'komponen_baru'
        if (
          this.komponen_pendapatan.komponen_baru.hasOwnProperty(namaKomponen)
        ) {
          // Hapus dari 'komponen_baru'
          this.$delete(this.komponen_pendapatan.komponen_baru, namaKomponen)
        } else {
          // Jika tidak, hapus dari 'komponen_pendapatan' utama
          this.$delete(this.komponen_pendapatan, namaKomponen)
        }
      } else if (context === 'potongan') {
        // Logika serupa untuk 'potongan'
        if (this.potongan.komponen_baru.hasOwnProperty(namaKomponen)) {
          this.$delete(this.potongan.komponen_baru, namaKomponen)
        } else {
          this.$delete(this.potongan, namaKomponen)
        }
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
      const selectedBankObject = this.banks.find(
        (bank) => bank.id === this.selectedBank
      )

      if (selectedBankObject) {
        // Assuming you want to update the displayed bank account immediately
        // If you need to perform additional logic, you can modify this part accordingly
        this.nomor_rekening = selectedBankObject.no_rekening
      } else {
        // Handle the case when the selected bank is not found
        // You can clear the displayed bank account or show an error message
        this.nomor_rekening = ''
      }
    },
    getSelectedRekening() {
      // Get the selected bank account based on the selectedBank value
      const selectedBankObject = this.banks.find(
        (bank) => bank.id === this.selectedBank
      )
      console.log('Selected Bank:', selectedBankObject)
      return selectedBankObject ? selectedBankObject.no_rekening : ''
    },
    calculateTotal(component) {
      const data = this.selectedGajiData[component][0][component]

      const total = Object.keys(data)
        .filter(
          (key) =>
            key !== 'id' &&
            key !== 'dosen_luar_biasa_id' &&
            key !== 'deleted_at' &&
            key !== 'created_at' &&
            key !== 'updated_at' &&
            key !== `total_${component}` // Exclude total_komponen_pendapatan, total_gaji_univ, etc.
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
    formatLabel(label) {
      if (!label) return ''
      // Mengganti underscore (_) dengan spasi dan memformat setiap kata
      return label
        .split('_')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    },
  },
  computed: {
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
    totalGajiUniversitas() {
      return (
        Number(this.gaji_pokok) +
        Number(this.tunjangan_fungsional) +
        Number(this.tunjangan_struktural) +
        Number(this.tunjangan_khusus_istimewa) +
        Number(this.tunjangan_presensi_kerja) +
        Number(this.tunjangan_tambahan) +
        Number(this.uang_lembur_hk) +
        Number(this.honor_universitas) +
        Number(this.uang_lembur_hl) +
        Number(this.tunjangan_suami_istri) +
        Number(this.transport_kehadiran) +
        Number(this.tunjangan_anak)
      )
    },
    formattedTotalGajiUniversitas() {
      return this.formatRupiah(this.totalGajiUniversitas)
    },
    totalGajiFakultas() {
      let total = 0

      // Iterasi melalui setiap properti dalam objek potongan kecuali 'komponen_baru'
      for (let key in this.komponen_pendapatan) {
        if (key !== 'komponen_baru') {
          total += parseFloat(this.komponen_pendapatan[key]) || 0
        }
      }

      // Tambahkan setiap nilai dari komponen_baru ke total
      for (let key in this.komponen_pendapatan.komponen_baru) {
        total += parseFloat(this.komponen_pendapatan.komponen_baru[key]) || 0
      }

      // Mengembalikan total
      return total
    },

    formattedTotalGajiFakultas() {
      return this.formatRupiah(this.totalGajiFakultas)
    },
    calculatePph25() {
      // Menghitung PPh 25 berdasarkan total komponen pendapatan
      // Ini hanya contoh, Anda harus menyesuaikan perhitungan berdasarkan regulasi pajak yang berlaku
      const totalPendapatan = this.totalKomponenPendapatan
      const pph25 = totalPendapatan * 0.025 // asumsikan tarif PPh 25 adalah 2.5%
      return pph25
    },

    konversiKeNumber(val) {
      return isNaN(parseFloat(val)) ? 0 : parseFloat(val)
    },
    hitungPendapatanBersih() {
      const totalPendapatan = Object.values(this.komponen_pendapatan).reduce(
        (acc, val) => acc + this.konversiKeNumber(val),
        0
      )
      const totalPotongan = Object.values(this.potongan).reduce(
        (acc, val) => acc + this.konversiKeNumber(val),
        0
      )
      const pph25 = Math.round(totalPendapatan * 0.5 * 0.06)

      return totalPendapatan - totalPotongan - pph25
    },
    totalPotongan() {
      // Mulai dengan total 0
      let total = 0

      // Iterasi melalui setiap properti dalam objek potongan kecuali 'komponen_baru'
      for (let key in this.potongan) {
        if (key !== 'komponen_baru') {
          total += parseFloat(this.potongan[key]) || 0
        }
      }

      // Tambahkan setiap nilai dari komponen_baru ke total
      for (let key in this.potongan.komponen_baru) {
        total += parseFloat(this.potongan.komponen_baru[key]) || 0
      }

      // Mengembalikan total
      return total
    },
    formattedTotalPotongan() {
      return this.formatRupiah(this.totalPotongan)
    },
    brutoPajak() {
      return (
        Number(this.totalGajiUniversitas) +
        Number(this.totalGajiFakultas) +
        Number(this.pensiun)
      )
    },
    brutoMurni() {
      return Number(this.totalGajiFakultas) + Number(this.totalGajiUniversitas)
    },
    biayaJabatan() {
      return Number(this.brutoMurni * 0.05)
    },
    jumlahPotonganKenaPajak() {
      return (
        Number(this.aksa_mandiri) +
        Number(this.dplk_pensiun) +
        Number(this.pensiun)
      )
    },
    jumlahSetoranPotonganKenaPajak() {
      return Number(this.brutoPajak) - Number(this.jumlahPotonganKenaPajak)
    },
    hitungPkp() {
      return Number(this.jumlahSetoranPotonganKenaPajak) - Number(this.ptkp)
    },
    pajakPph25() {
      return Number(this.hitungPkp * 0.05)
    },
    jumlahSetoranPajak() {
      return (
        Number(this.brutoPajak) -
        (Number(this.dplk_pensiun) +
          Number(this.aksa_mandiri) +
          Number(this.pensiun) +
          Number(this.pajakPph21))
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
