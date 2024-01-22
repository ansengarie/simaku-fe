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
    <div class="w-full min-h-screen bg-background">
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
                        <td class="">001</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nama Lengkap</td>
                        <td>:</td>
                        <td class="">Prof. DR. Zulham Zamrun, Sh.,MH</td>
                      </tr>
                      <tr>
                        <td class="text-grey">NPWP</td>
                        <td>:</td>
                        <td class="">34566654321</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Golongan</td>
                        <td>:</td>
                        <td class="">IV A</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Jabatan</td>
                        <td>:</td>
                        <td class="">-</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Nama Bank</td>
                        <td>:</td>
                        <td class="">Mandiri</td>
                      </tr>
                      <tr>
                        <td class="text-grey">No Rekening</td>
                        <td>:</td>
                        <td class="">35677543</td>
                      </tr>
                      <tr>
                        <td class="text-grey">Periode</td>
                        <td>:</td>
                        <td class="">Januari 2023</td>
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
                    <select v-model="selectedPeriod" class="p-2 border rounded">
                      <option
                        v-for="period in periods"
                        :key="period.periode.month + period.periode.year"
                        :value="period"
                      >
                        {{ period.periode.month }} {{ period.periode.year }}
                      </option>
                    </select>
                    <button
                      class="hidden px-6 py-0 text-white rounded-full w-[125px] md:w-auto bg-primary md:inline"
                      @click="fetchGajiData"
                    >
                      Pilih
                    </button>
                    <div class="flex justify-end space-x-2">
                      <!-- Icon ubah/pensil -->
                      <div
                        class="flex items-center justify-center w-6 h-6 border border-black"
                      >
                        u
                      </div>

                      <!-- Icon cetak/print -->
                      <div
                        class="flex items-center justify-center w-6 h-6 border border-black"
                      >
                        p
                      </div>

                      <!-- Icon hapus/tempat sampah -->
                      <div
                        class="flex items-center justify-center w-6 h-6 border border-black"
                      >
                        d
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section Gaji Pusat -->
              <div
                class="w-full py-2 text-xl font-semibold text-center text-white bg-navy"
              >
                Gaji Pusat
              </div>

              <!-- Konten Gaji Pusat -->

              <div
                class="grid grid-cols-1 px-6 md:mx-[74px] gap-x-12 gap-y-2 md:grid-cols-2"
              >
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Gaji Pokok</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Tunjangan Fungsional</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Tunjangan Struktural</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Tunjangan Khusus Istimewa</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Tunjangan Presensi Kerja</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Tunjangan Tambahan</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Uang Lembur Harian Kontrak</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Honor</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-3/4">
                  <label for="" class="text-navy"
                    >Uang Lembur Harian Lepas</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-3/4">
                  <label for="" class="text-navy">Tunjangan Suami/Istri</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Transport Kehadiran</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-3/4">
                  <label for="" class="text-navy">Tunjangan Anak</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-3/4">
                  <label for="" class="font-bold text-navy"
                    >Total Gaji Pusat</label
                  >
                  <input type="text" class="font-medium input-field" />
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
                  <label for="" class="text-navy">Tunjangan Tambahan</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Penyesuaian Honor Mengajar</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Honor Kinerja</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Tunjangan Guru Besar</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Honor Kelebihan Mengajar</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Honor</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Honor Mengajar Dosen Pengajar Kopertis</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-[36%] md:col-span-2">
                  <label for="" class="font-bold text-navy"
                    >Total Gaji Fakultas Hukum</label
                  >
                  <input type="text" class="font-medium input-field" />
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
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Simpan Pinjam Fakultas Hukum</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Infaq</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-[36%] md:col-span-2">
                  <label for="" class="font-bold text-navy"
                    >Total Potongan</label
                  >
                  <input type="text" class="font-medium input-field" />
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
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Pensiun</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Jumlah Setoran Potongan Kena Pajak</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Bruto Untuk Pajak</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">PTKP</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Bruto Murni</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">PKP</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Biaya Jabatan</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Pajak PPh 21</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Asuransi Aksa Mandiri</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Jumlah Setoran Pajak</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">DPLK Pensiun</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy">Potongan Kena Pajak</label>
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="md:w-3/4 form-group">
                  <label for="" class="text-navy"
                    >Jumlah Potongan Kena Pajak</label
                  >
                  <input type="text" class="font-medium input-field" />
                </div>
                <div class="form-group md:w-[36%] md:col-span-2">
                  <label for="" class="font-bold text-navy"
                    >Pendapatan Bersih</label
                  >
                  <input
                    type="text"
                    class="font-medium input-field bg-disabled"
                    disabled
                  />
                </div>
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
      dosenData: {},
      periods: [],
      selectedPeriod: null,
      selectedGajiData: null,
    }
  },
  async asyncData({ params, $axios }) {
    try {
      const token = localStorage.getItem('token')
      const headers = token ? { Authorization: `Bearer ${token}` } : {}
      const { data } = await $axios.get(`/dosentetap-gaji/${params.id}`, {
        headers,
      })

      // Log data yang diterima dari API
      console.log('Data dari API:', data)

      // Proses data yang diterima dari API
      const dosenData = data.data[0]
      const periods = data.data.slice(1)

      // Log data yang telah diproses
      console.log('Data Dosen:', dosenData)
      console.log('Data Periods:', periods)

      return { dosenData, periods }
    } catch (error) {
      console.error(error)
      throw error
    }
  },
  methods: {
    fetchGajiData() {
      if (this.selectedPeriod) {
        // Filter the data based on the selected period
        const selectedData = this.periods.find((item) => {
          return (
            item.periode.month === this.selectedPeriod.periode.month &&
            item.periode.year === this.selectedPeriod.periode.year
          )
        })

        // If data for the selected period is found, update the selectedGajiData variable
        if (selectedData) {
          this.selectedGajiData = selectedData
        } else {
          this.selectedGajiData = null // Clear selectedGajiData if data is not found
        }
      } else {
        this.selectedGajiData = null // Clear selectedGajiData if no period is selected
      }
    },
    formatRupiah(nominal) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(nominal)
    },
  },
}
</script>

<style></style>
