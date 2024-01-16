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
            Rekapitulasi Bank {{ this.pegawaiTerpilih }}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                name=""
                id=""
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
      <section class="mt-20">
        <!-- Dropdown untuk memilih periode -->
        <div class="flex justify-between mb-3">
          <div>
            <select
              v-model="jenisPayrollTerpilih"
              class="px-[8px] py-2 text-sm input-field"
            >
              <option value="payroll">Payroll</option>
              <option value="non_payroll">Non-Payroll</option>
            </select>
            <button
              @click="confirmPayrollChange"
              class="px-3 py-2 text-sm text-white rounded-full btn bg-primary"
            >
              Konfirmasi
            </button>

            <select
              v-model="tempPegawaiTerpilih"
              class="px-1 py-2 text-sm input-field"
            >
              <option
                v-for="pegawai in jenisPegawai"
                :key="pegawai"
                :value="pegawai"
                class="text-sm"
              >
                {{ pegawai }}
              </option>
            </select>
            <button
              @click="updateDataBerdasarkanPegawai"
              class="px-2 py-2 text-sm text-white rounded-full btn bg-primary"
            >
              Pilih Pegawai
            </button>

            <select
              v-model="tempPeriodeTerpilih"
              class="px-2 py-2 text-sm input-field"
            >
              <option disabled value="" selected>Pilih Periode</option>
              <option
                v-for="periode in periodePajak"
                :key="periode"
                :value="periode"
                class="text-sm"
              >
                {{ periode }}
              </option>
            </select>
            <button
              @click="updateDataBerdasarkanPeriode"
              class="px-2 py-2 text-sm text-white rounded-full btn bg-primary"
            >
              Pilih Periode
            </button>
          </div>
          <div class="flex justify-items-end">
            <button
              @click="generateExcel"
              class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200"
            >
              <span class="material-symbols-outlined"> download </span>
              Download Excel
            </button>
          </div>
        </div>
        <div class="card md:max-w-[1182px] mx-auto shadow-lg">
          <div class="p-4 text-center border-b-4 border-navy">
            <p
              class="text-lg font-semibold text-navy"
              v-html="teksRekapitulasi"
            ></p>
          </div>
          <div class="overflow-x-auto">
            <table
              class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
            >
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3">No Pegawai</th>
                  <th scope="col" class="px-6 py-3">Nama Lengkap</th>
                  <th scope="col" class="px-6 py-3">Golongan</th>
                  <th scope="col" class="px-6 py-3">Jumlah Pendapatan</th>
                  <th scope="col" class="px-6 py-3">Jumlah Potongan</th>
                  <th scope="col" class="px-6 py-3">Pendapatan Bersih</th>
                  <th scope="col" class="px-6 py-3">No Rekening</th>
                  <th scope="col" class="px-6 py-3">Nama Bank</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="filteredRekapitulasiBank.length">
                  <tr
                    v-for="(item, index) in paginatedData"
                    :key="index"
                    class="border-b"
                  >
                    <td class="px-6 py-4">{{ item.no_pegawai }}</td>
                    <td>{{ item.nama }}</td>
                    <td>{{ item.golongan }}</td>
                    <td>{{ item.jumlah_pendapatan }}</td>
                    <td>{{ item.jumlah_potongan }}</td>
                    <td>{{ item.pendapatan_bersih }}</td>
                    <td>{{ item.no_rekening }}</td>
                    <td>{{ item.nama_bank }}</td>
                  </tr>
                </template>
                <tr v-else class="border-b">
                  <td colspan="8" class="py-4 text-center">
                    Tidak ada data yang sesuai dengan pilihan Anda.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex justify-between mt-auto px-[25px] py-[25px]">
            <p class="text-muted">
              {{ (currentPage - 1) * itemsPerPage + 1 }} -
              {{
                Math.min(
                  currentPage * itemsPerPage,
                  filteredRekapitulasiBank.length
                )
              }}
              dari {{ filteredRekapitulasiBank.length }}
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
                  currentPage * itemsPerPage >= filteredLaporanPajak.length
                "
              >
                <span
                  :class="{
                    'material-symbols-outlined': true,
                    'text-gray-500':
                      currentPage * itemsPerPage >= filteredLaporanPajak.length,
                    'opacity-50':
                      currentPage * itemsPerPage >= filteredLaporanPajak.length,
                    'text-black':
                      currentPage * itemsPerPage < filteredLaporanPajak.length,
                  }"
                >
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
// Import XLSX dari SheetJS
import * as XLSX from 'xlsx'
export default {
  data() {
    return {
      searchQuery: '',
      laporanPajak: [],
      periodePajak: [],
      jenisPegawai: ['Dosen Tetap', 'Dosen Luar Biasa', 'Karyawan'],
      pegawaiTerpilih: 'Dosen Tetap', // Default value
      periodeTerpilih: '',
      jenisPayrollTerpilih: 'payroll', // nilai default
      filteredLaporanPajak: [],
      tempPegawaiTerpilih: 'Dosen Tetap',
      tempPeriodeTerpilih: '',
      currentPage: 1,
      rekapitulasiBank: [],
      filteredRekapitulasiBank: [],
      itemsPerPage: 10, // Atau jumlah yang Anda inginkan
      headerDosenTetap: [
        'No Pegawai',
        'Nama Lengkap',
        'Gaji FH',
        'Gaji Pusat',
        'Pensiun',
        'Pend. Bruto',
        'Biaya Jabatan',
        'Asuransi',
        'DPLK Pensiun',
        'Jumlah Potongan',
        'PTKP',
        'PKP',
        'PPH21',
      ],
      headerDosenLuarBiasa: [
        'No Pegawai',
        'Nama Lengkap',
        'Jumlah Pendapatan',
        'Jumlah Potongan',
        'Pendapatan Bruto',
        'Pajak PPH25',
      ],
    }
  },
  async mounted() {
    await this.fetchRekapitulasiBank() // Memuat data awal berdasarkan jenis pegawai default
    this.filterDataByPeriode() // Menyaring data berdasarkan periode default
  },
  computed: {
    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage
      let end = start + this.itemsPerPage
      return this.filteredRekapitulasiBank.slice(start, end)
    },
    teksRekapitulasi() {
      let teks =
        'Rekapitulasi pembayaran honorium mengajar dan pendapatan lain '
      teks += this.pegawaiTerpilih + ' Fakultas Hukum UNPAS '

      if (this.periodeTerpilih) {
        const [bulan, tahun] = this.periodeTerpilih.split(' ')
        teks += `Tahun anggaran ${tahun}/${parseInt(tahun) + 1} `

        // Menentukan Semester Ganjil atau Genap
        const semester = this.determineSemester(bulan)
        teks += `Untuk semester ${semester} bulan ${bulan} ${tahun}`
      }

      return teks
    },
    //nambah
    filteredData() {
      if (!this.searchQuery) {
        return this.laporanPajak // Kembali ke data asli jika tidak ada query pencarian
      }
      return this.laporanPajak.filter((item) => {
        // Menggabungkan pencarian nama dan nomor pegawai
        return (
          item?.pajak?.biaya_jabatan !== undefined &&
          (item.nama.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            item.no_pegawai.includes(this.searchQuery))
        )
      })
    },
  },
  methods: {
    async fetchRekapitulasiBank() {
      let endpoint
      switch (this.pegawaiTerpilih) {
        case 'Dosen Tetap':
          endpoint = '/dosentetap/laporan/rekapitulasibank'
          break
        case 'Dosen Luar Biasa':
          endpoint = '/dosenlb/laporan/rekapitulasibank'
          break
        case 'Karyawan':
          endpoint = '/karyawan/laporan/rekapitulasibank'
          break
        default:
          endpoint = '/dosentetap/laporan/rekapitulasibank' // Default endpoint
      }

      try {
        const response = await this.$axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })

        if (response && response.status === 200 && response.data) {
          // Set data untuk dropdown periode
          this.periodePajak = response.data.data.map(
            (d) => `${d.periode.month} ${d.periode.year}`
          )

          // Set rekapitulasiBank dengan data yang digabung dari payroll dan non-payroll
          this.rekapitulasiBank = response.data.data.map((period) => {
            return {
              ...period,
              allData: [...period.payroll, ...period.non_payroll],
            }
          })

          // Menetapkan periode terpilih secara otomatis ke periode terakhir (opsional)
          if (this.rekapitulasiBank.length > 0) {
            const latestPeriod =
              this.rekapitulasiBank[this.rekapitulasiBank.length - 1].periode
            this.periodeTerpilih = `${latestPeriod.month} ${latestPeriod.year}`
          }

          // Panggil metode filterDataByPeriode jika Anda ingin langsung menyaring data
          this.filterDataByPeriode()
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    filterDataByPeriode() {
      if (!this.periodeTerpilih) return

      // Memisahkan bulan dan tahun dari `periodeTerpilih`
      const [selectedMonth, selectedYear] = this.periodeTerpilih.split(' ')

      // Menyaring `rekapitulasiBank` berdasarkan periode yang dipilih
      const filteredPeriod = this.rekapitulasiBank.find(
        (period) =>
          period.periode.month === selectedMonth &&
          period.periode.year === selectedYear
      )

      // Jika ditemukan, gunakan data dari periode tersebut, jika tidak, kosongkan array
      this.filteredRekapitulasiBank = filteredPeriod
        ? filteredPeriod.allData
        : []
    },
    confirmPayrollChange() {
      // Filter data berdasarkan periode yang dipilih
      const [selectedMonth, selectedYear] = this.periodeTerpilih.split(' ')
      const filteredPeriodData = this.rekapitulasiBank.find(
        (period) =>
          period.periode.month === selectedMonth &&
          period.periode.year === selectedYear
      )

      // Jika tidak ada data untuk periode tersebut, set array kosong
      if (!filteredPeriodData) {
        this.filteredRekapitulasiBank = []
      } else {
        // Filter data berdasarkan jenis payroll atau non-payroll yang dipilih
        this.filteredRekapitulasiBank =
          this.jenisPayrollTerpilih === 'payroll'
            ? filteredPeriodData.payroll
            : filteredPeriodData.non_payroll
      }

      // Reset halaman saat ini ke halaman pertama setelah penyaringan
      this.currentPage = 1
    },

    async updateDataBerdasarkanPegawai() {
      this.pegawaiTerpilih = this.tempPegawaiTerpilih
      await this.fetchRekapitulasiBank()
      this.filterDataByPeriode() // Opsional, tergantung pada apakah Anda ingin menyaring langsung setelah pembaruan pegawai
    },

    updateDataBerdasarkanPeriode() {
      this.periodeTerpilih = this.tempPeriodeTerpilih
      this.filterDataByPeriode()
    },
    determineSemester(bulan) {
      // Daftar bulan untuk semester Ganjil
      const ganjil = [
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
        'Januari',
      ]

      // Cek apakah bulan termasuk dalam semester Ganjil
      return ganjil.includes(bulan) ? 'Ganjil' : 'Genap'
    },
    updateData() {
      this.pegawaiTerpilih = this.tempPegawaiTerpilih
      this.periodeTerpilih = this.tempPeriodeTerpilih
      this.fetchRekapitulasiBank() // Jika perlu memanggil API
      this.filterDataByPeriode()
    },
    nextPage() {
      if (
        this.currentPage * this.itemsPerPage <
        this.filteredLaporanPajak.length
      ) {
        this.currentPage++
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    generateExcel() {
      // Membuat workbook baru
      const wb = XLSX.utils.book_new()

      // Gunakan filteredRekapitulasiBank yang sudah terfilter sesuai dengan payroll/non-payroll dan periode
      const dataToExport = this.filteredRekapitulasiBank.map((item) => {
        // Anda bisa menyesuaikan objek ini sesuai dengan struktur kolom yang Anda inginkan di Excel
        return {
          'No Pegawai': item.no_pegawai,
          'Nama Lengkap': item.nama,
          Golongan: item.golongan,
          'Jumlah Pendapatan': item.jumlah_pendapatan,
          'Jumlah Potongan': item.jumlah_potongan,
          'Pendapatan Bersih': item.pendapatan_bersih,
          'No Rekening': item.no_rekening,
          'Nama Bank': item.nama_bank,
        }
      })

      // Mengonversi data ke worksheet
      const ws = XLSX.utils.json_to_sheet(dataToExport)

      // Menambahkan worksheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Rekapitulasi Bank')

      // Tentukan nama file berdasarkan jenis pegawai dan periode
      const jenisPegawai = this.pegawaiTerpilih
        .toLowerCase()
        .replace(/\s+/g, '-')
      const periode = this.periodeTerpilih.replace(/\s+/g, '-')
      const jenisPayroll = this.jenisPayrollTerpilih
      const fileName = `rekapitulasi-bank-${jenisPegawai}-${jenisPayroll}-${periode}.xlsx`

      // Menyimpan file Excel
      XLSX.writeFile(wb, fileName)
    },

    getFilteredData() {
      const filteredData = this.laporanPajak
        .filter((item) => {
          const periodeMatches =
            item.periode.month === this.periodeTerpilih.split(' ')[0] &&
            item.periode.year === this.periodeTerpilih.split(' ')[1]
          return periodeMatches
        })
        .flatMap((item) => item.laporanpajak)
      console.log(filteredData) // Periksa output di konsol
      return filteredData
    },
    generateExcel() {
      // Log untuk men-debug
      console.log('Filtered Data:', this.filteredRekapitulasiBank)

      const wb = XLSX.utils.book_new()
      const dataToExport = this.filteredRekapitulasiBank.map((item) => ({
        'No Pegawai': item.no_pegawai,
        'Nama Lengkap': item.nama,
        Golongan: item.golongan,
        'Jumlah Pendapatan': item.jumlah_pendapatan,
        'Jumlah Potongan': item.jumlah_potongan,
        'Pendapatan Bersih': item.pendapatan_bersih,
        'No Rekening': item.no_rekening,
        'Nama Bank': item.nama_bank,
      }))

      // Log untuk men-debug
      console.log('Data to Export:', dataToExport)

      const ws = XLSX.utils.json_to_sheet(dataToExport)
      XLSX.utils.book_append_sheet(wb, ws, 'Rekapitulasi Bank')

      const jenisPegawai = this.pegawaiTerpilih
        .toLowerCase()
        .replace(/\s+/g, '-')
      const periode = this.periodeTerpilih.replace(/\s+/g, '-')
      const jenisPayroll = this.jenisPayrollTerpilih
      const fileName = `rekapitulasi-bank-${jenisPegawai}-${jenisPayroll}-${periode}.xlsx`

      // Cek jika worksheet kosong
      if (ws['!ref'] == null) {
        alert('Tidak ada data untuk di-export.')
        return
      }

      // Tulis workbook ke file XLSX
      XLSX.writeFile(wb, fileName)
    },

    getKeyMap() {
      if (this.pegawaiTerpilih === 'Dosen Luar Biasa') {
        // Pemetaan untuk dosen luar biasa
        return {
          'No Pegawai': 'no_pegawai',
          'Nama Lengkap': 'nama',
          'Jumlah Pendapatan': 'jumlah_pendapatan',
          'Pendapatan Bruto': 'pendapatan_bruto',
          'Pajak PPH25': 'pajak_pph25',
        }
      } else {
        // Pemetaan untuk dosen tetap
        return {
          'No Pegawai': 'no_pegawai',
          'Nama Lengkap': 'nama',
          'Gaji FH': 'gaji_fh',
          'Gaji Pusat': 'gaji_pusat',
          Pensiun: 'pensiun',
          'Pend. Bruto': 'pendapatan_bruto',
          'Biaya Jabatan': (item) => item.pajak?.biaya_jabatan ?? '',
          Asuransi: (item) => item.pajak?.aksa_mandiri ?? '',
          'DPLK Pensiun': (item) => item.pajak?.dplk_pensiun ?? '',
          'Jumlah Potongan': 'jumlah_potongan',
          PTKP: (item) => item.pajak?.ptkp ?? '',
          PKP: (item) => item.pajak?.pkp ?? '',
          PPH21: (item) => item.pajak?.pajak_pph21 ?? '',
        }
      }
    },

    getFilteredDataForExcel() {
      // Filter data berdasarkan periode dan jenis pegawai
      // Pastikan ini mengembalikan dataset yang lengkap, tidak hanya yang terbatas oleh pagination
      // Anda perlu menyesuaikan logika ini berdasarkan struktur data dan kebutuhan Anda
      const filteredData = this.laporanPajak
        .filter((item) => {
          return (
            item.periode.month === this.periodeTerpilih.split(' ')[0] &&
            item.periode.year === this.periodeTerpilih.split(' ')[1]
          )
        })
        .flatMap((item) => item.laporanpajak)

      // Sesuaikan dataset untuk Dosen Luar Biasa
      if (this.pegawaiTerpilih === 'Dosen Luar Biasa') {
        return filteredData.map((item) => ({
          no_pegawai: item.no_pegawai,
          nama: item.nama,
          jumlah_pendapatan: item.jumlah_pendapatan,
          pendapatan_bruto: item.pendapatan_bruto,
          pajak_pph25: item.pajak && item.pajak.pajak_pph25,
        }))
      }

      // Kembalikan data as is untuk Dosen Tetap dan Karyawan
      return filteredData
    },
  },
}
</script>

<style></style>
