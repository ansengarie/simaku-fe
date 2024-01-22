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
                    <div class="form-group">
                      <label for="" class="text-navy">Gaji Pokok</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_pokok"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Fungsional</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_fungsional"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Struktural</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_struktural"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Khusus Istimewa</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_khusus_istimewa"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Presensi Kerja</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_presensi_kerja"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Tunjangan Tambahan</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_tambahan"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Uang Lembur HK</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="uang_lembur_hk"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Honor</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="honor_universitas"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Uang Lembur HL</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="uang_lembur_hl"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Suami Istri</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_suami_istri"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Transport Kehadiran</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="transport_kehadiran"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Tunjangan Anak</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="tunjangan_anak"
                        required
                      />
                    </div>
                    <div class="mb-4 form-group">
                      <label for="" class="font-bold text-navy"
                        >Total Gaji Universitas</label
                      >
                      <input
                        type="text"
                        class="font-medium input-field"
                        id="totalGaji"
                        :value="formattedTotalGajiUniversitas"
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
                    <div class="form-group">
                      <label for="" class="text-navy">Tunjangan Tambahan</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.tunjangan_tambahan"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Honor Kinerja</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.honor_kinerja"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Honor Kelebihan Mengajar</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.honor_kelebihan_mengajar"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Honor Mengajar DPK</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.honor_mengajar_dpk"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Penyesuaian Honor Mengajar</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.peny_honor_mengajar"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Tunjangan Guru Besar</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.tunjangan_guru_besar"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Honor</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="gaji_fakultas.honor"
                        required
                      />
                    </div>
                    <div class="justify-center mt-5 space-y-auto form-group">
                      <!-- buatkan tombol tambahkan komponen yang bisa dikustomisasi -->
                      <button
                        class="p-2 text-white bg-green-600 border rounded-full"
                      >
                        Tambahkan Komponen Lainnya
                      </button>
                    </div>
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
                      <label for="" class="text-navy">Pensiun</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="pensiun"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Jumlah Setoran Potongan Kena Pajak</label
                      >
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="jumlahSetoranPotonganKenaPajak"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Bruto Untuk Pajak</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="brutoPajak"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">PTKP</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="ptkp"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Bruto Murni</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="brutoMurni"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">PKP</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        v-model.number="pkp"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Biaya Jabatan</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="biayaJabatan"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">Pajak PPh21</label>
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="pajakPph21"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Asuransi Aksa Mandiri</label
                      >
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="aksa_mandiri"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Jumlah Setoran Pajak</label
                      >
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="jumlahSetoranPajak"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy">DPLK Pensiun</label>
                      <input
                        type="text"
                        class="input-field"
                        v-model.number="dplk_pensiun"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Potongan Tak Kena Pajak</label
                      >
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="potonganTakKenaPajak"
                        required
                        disabled
                      />
                    </div>
                    <div class="form-group">
                      <label for="" class="text-navy"
                        >Jumlah Potongan Kena Pajak</label
                      >
                      <input
                        type="text"
                        class="bg-gray-200 input-field"
                        :value="jumlahPotonganKenaPajak"
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
                          :value="pendapatanBersih"
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
  </section>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      dosenData: {
        banks: [],
      },
      selectedBank: null,
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
      },
      potongan: {
        sp_fh: 0,
        infaq: 0,
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
      dosen_tetap_id: '',
      dostap_bank_id: '',
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      // Fetch the data for the specific ID
      const response = await $axios.get(`/dosentetap/${params.id}`, { headers })

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
        const dataToPost = {
          gaji_pokok: this.gaji_pokok,
          tunjangan_fungsional: this.tunjangan_fungsional,
          tunjangan_struktural: this.tunjangan_struktural,
          tunjangan_khusus_istimewa: this.tunjangan_khusus_istimewa,
          tunjangan_presensi_kerja: this.tunjangan_presensi_kerja,
          tunjangan_tambahan: this.tunjangan_tambahan,
          tunjangan_suami_istri: this.tunjangan_suami_istri,
          tunjangan_anak: this.tunjangan_anak,
          uang_lembur_hk: this.uang_lembur_hk,
          uang_lembur_hl: this.uang_lembur_hl,
          transport_kehadiran: this.transport_kehadiran,
          honor_universitas: this.honor_universitas,
          gaji_fakultas: {
            tunjangan_tambahan: this.gaji_fakultas.tunjangan_tambahan,
            honor_kinerja: this.gaji_fakultas.honor_kinerja,
            honor_kelebihan_mengajar:
              this.gaji_fakultas.honor_kelebihan_mengajar,
            honor_mengajar_dpk: this.gaji_fakultas.honor_mengajar_dpk,
            peny_honor_mengajar: this.gaji_fakultas.peny_honor_mengajar,
            tunjangan_guru_besar: this.gaji_fakultas.tunjangan_guru_besar,
            honor: this.gaji_fakultas.honor,
          },
          potongan: {
            sp_fh: this.potongan.sp_fh,
            infaq: this.potongan.infaq,
          },
          pensiun: this.pensiun,
          bruto_pajak: this.brutoPajak,
          bruto_murni: this.brutoMurni,
          biaya_jabatan: this.biayaJabatan,
          aksa_mandiri: this.aksa_mandiri,
          dplk_pensiun: this.dplk_pensiun,
          jumlah_potongan_kena_pajak: this.jumlahPotonganKenaPajak,
          jumlah_set_potongan_kena_pajak: this.jumlahSetoranPotonganKenaPajak,
          ptkp: this.ptkp,
          pkp: this.pkp,
          pajak_pph21: this.pajakPph21,
          jumlah_set_pajak: this.jumlahSetoranPajak,
          potongan_tak_kena_pajak: this.potonganTakKenaPajak,
          pendapatan_bersih: this.pendapatanBersih,
          dosen_tetap_id: this.dosenData.id,
          dostap_bank_id: this.selectedBank,
        }

        // Menampilkan data yang akan dikirim ke API di console log
        console.log('Data to post:', dataToPost)

        // console.log(this.hasil)
        const response = await this.$axios.post(
          'dosentetap/gaji/transaksi/create',
          dataToPost,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        this.flashType = 'success'
        this.flashMsg = 'Data dosen berhasil ditambahkan!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false

          // Mengalihkan ke halaman yang diinginkan
          this.$router.push('/manage-pegawai/dosen-tetap')
        }, 2000)
      } catch (error) {
        console.error('Error tambah Dosen Tetap:', error)
        console.error('Error tambah Dosen Tetap:', error.response)
        this.flashType = 'error'
        this.flashMsg = 'Terjadi kesalahan saat menambahkan data dosen.'
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
  },
  computed: {
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
      return (
        this.gaji_fakultas.tunjangan_tambahan +
        this.gaji_fakultas.honor_kinerja +
        this.gaji_fakultas.honor_kelebihan_mengajar +
        this.gaji_fakultas.honor_mengajar_dpk +
        this.gaji_fakultas.peny_honor_mengajar +
        this.gaji_fakultas.tunjangan_guru_besar +
        this.gaji_fakultas.honor
      )
    },
    formattedTotalGajiFakultas() {
      return this.formatRupiah(this.totalGajiFakultas)
    },
    totalPotongan() {
      return this.potongan.sp_fh + this.potongan.infaq
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
    potonganTakKenaPajak() {
      return this.totalPotongan
    },
    pendapatanBersih() {
      return this.jumlahSetoranPotonganKenaPajak - this.potonganTakKenaPajak
    },
  },
}
</script>

<style></style>
