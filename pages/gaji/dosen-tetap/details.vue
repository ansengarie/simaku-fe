<template>
  <div class="w-full min-h-screen bg-slate-300">
    <!-- Card -->
    <div class="flex justify-center h-full">
      <div class="w-full my-6 space-y-6 md:w-11/12">
        <!-- Judul -->
        <div class="w-full text-2xl font-bold text-center">
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
                      <td class="text-gray-300">Nomor pegawai</td>
                      <td>:</td>
                      <td class="font-semibold">001</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">Nama Lengkap</td>
                      <td>:</td>
                      <td class="font-semibold">
                        Prof. DR. Zulham Zamrun, Sh.,MH
                      </td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">NPWP</td>
                      <td>:</td>
                      <td class="font-semibold">34566654321</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">Golongan</td>
                      <td>:</td>
                      <td class="font-semibold">IV A</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">Jabatan</td>
                      <td>:</td>
                      <td class="font-semibold">-</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">Nama Bank</td>
                      <td>:</td>
                      <td class="font-semibold">Mandiri</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">No Rekening</td>
                      <td>:</td>
                      <td class="font-semibold">35677543</td>
                    </tr>
                    <tr>
                      <td class="text-gray-300">Periode</td>
                      <td>:</td>
                      <td class="font-semibold">Januari 2023</td>
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
                  <select class="px-4 py-2 border border-black rounded-full">
                    <!-- Pilihan dropdown Periode Penggajian -->
                    <option hidden>Periode Penggajian</option>
                    <option value="periode1">Periode 1</option>
                    <option value="periode2">Periode 2</option>
                    <option value="periode4">Periode 3</option>
                    <!-- Tambahkan opsi lain jika diperlukan -->
                  </select>
                  <button
                    class="hidden px-6 py-0 text-white bg-blue-500 rounded-full md:inline"
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
              class="w-full py-2 font-bold text-center text-white bg-blue-950"
            >
              Gaji Pusat
            </div>

            <!-- Konten Gaji Pusat -->
            <div class="grid grid-cols-1 px-6 gap-x-12 gap-y-2 md:grid-cols-2">
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
            </div>

            <!-- Section Gaji Pusat -->
            <div
              class="w-full py-2 font-bold text-center text-white bg-blue-950"
            >
              Gaji Pusat
            </div>

            <!-- Konten Gaji Pusat -->
            <div class="grid grid-cols-1 px-6 gap-x-12 gap-y-2 md:grid-cols-2">
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
              <div>
                <div class="text-gray-300">Label</div>
                <div
                  class="w-full px-4 py-2 border rounded-full border-blue-950 text-blue-950"
                >
                  nominal
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container p-4 mx-auto">
      <h1 class="mb-4 text-2xl font-bold">Data Gaji Dosen</h1>
      <div class="mb-4">
        <h2 class="mb-2 text-lg font-semibold">Informasi Dosen</h2>
        <p>No Pegawai: {{ dosenData.no_pegawai }}</p>
        <p>Nama: {{ dosenData.nama }}</p>
        <p>Golongan: {{ dosenData.golongan }}</p>
        <p>Jabatan: {{ dosenData.jabatan }}</p>
        <p>Nama Bank: {{ dosenData.nama_bank }}</p>
      </div>
      <div class="mb-4">
        <h2 class="mb-2 text-lg font-semibold">Pilih Periode Gaji</h2>
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
          @click="fetchGajiData"
          class="px-4 py-2 ml-4 text-white bg-blue-500 rounded"
        >
          Pilih
        </button>
      </div>
      <div v-if="selectedGajiData">
        <h2 class="mb-2 text-lg font-semibold">Data Gaji</h2>
        <div class="w-full py-2 font-bold text-center text-white bg-blue-900">
          Gaji Pusat
        </div>
        <div class="grid grid-cols-2 gap-4">
          <p class="space-y-2">
            <span class="text-base text-black">Gaji Pokok:</span>
            <span
              class="flex w-3/4 py-[11px] text-lg font-medium bg-white border rounded-full text-navy px-7 border-navy"
            >
              {{
                formatRupiah(selectedGajiData.dostap_gaji_univ[0].gaji_pokok)
              }}
            </span>
          </p>
          <p class="space-y-2">
            <span class="text-base text-black">Gaji Pokok:</span>
            <span
              class="flex w-3/4 py-3 text-lg font-medium bg-gray-300 border rounded-full text-navy px-7 border-navy"
            >
              {{
                formatRupiah(selectedGajiData.dostap_gaji_univ[0].gaji_pokok)
              }}
            </span>
          </p>
          <p class="space-y-2">
            <span class="text-base text-black">Gaji Pokok:</span>
            <span
              class="flex w-3/4 py-3 text-lg font-medium bg-white border rounded-full text-navy px-7 border-navy"
            >
              {{ selectedGajiData.dostap_gaji_univ[0].gaji_pokok }}
            </span>
          </p>
          <p class="space-y-2">
            <span class="text-base text-black">Gaji Pokok:</span>
            <span
              class="flex w-3/4 py-3 text-lg font-medium bg-white border rounded-full text-navy px-7 border-navy"
            >
              {{ selectedGajiData.dostap_gaji_univ[0].gaji_pokok }}
            </span>
          </p>
          <!-- Tambahkan komponen lain dari kategori Gaji Pusat di sini -->
        </div>

        <h3 class="mb-2 text-lg font-semibold">2. Gaji Fakultas Hukum</h3>
        <div>
          <p>
            Total Gaji Fakultas:
            {{ selectedGajiData.dostap_gaji_fakultas[0].total_gaji_fakultas }}
          </p>
          <!-- Tambahkan komponen lain dari kategori Gaji Fakultas Hukum di sini -->
        </div>
        <h3 class="mb-2 text-lg font-semibold">3. Potongan</h3>
        <div>
          <p>
            Total Potongan:
            {{ selectedGajiData.dostap_potongan[0].total_potongan }}
          </p>
          <!-- Tambahkan komponen lain dari kategori Potongan di sini -->
        </div>
        <h3 class="mb-2 text-lg font-semibold">4. Pajak</h3>
        <div>
          <p>
            Pendapatan Bersih:
            {{ selectedGajiData.dostap_pajak[0].pendapatan_bersih }}
          </p>
          <!-- Tambahkan komponen lain dari kategori Pajak di sini -->
        </div>
      </div>
    </div>
  </div>
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
