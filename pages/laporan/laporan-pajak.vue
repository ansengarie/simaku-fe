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
            Laporan Pajak {{ this.pegawaiTerpilih }}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <div class="relative">
              <input
                type="text"
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
            <select v-model="tempPegawaiTerpilih" class="text-sm input-field">
              <option
                v-for="pegawai in jenisPegawai"
                :key="pegawai"
                :value="pegawai"
              >
                {{ pegawai }}
              </option>
            </select>
            <button
              @click="updateDataBerdasarkanPegawai"
              class="text-sm text-white rounded-full btn bg-primary"
            >
              Pilih Pegawai
            </button>

            <select v-model="tempPeriodeTerpilih" class="text-sm input-field">
              <option
                v-for="periode in periodePajak"
                :key="periode"
                :value="periode"
              >
                {{ periode }}
              </option>
            </select>
            <button
              @click="updateDataBerdasarkanPeriode"
              class="text-sm text-white rounded-full btn bg-primary"
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
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th
                    v-for="col in pegawaiTerpilih === 'Dosen Tetap' ||
                    pegawaiTerpilih === 'Karyawan'
                      ? headerDosenTetap
                      : headerDosenLuarBiasa"
                    :key="col"
                    scope="col"
                    class="px-6 py-3"
                  >
                    {{ col }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(laporan, index) in paginatedData"
                  :key="`${laporan.no_pegawai}-${index}`"
                  class="ml-4 border-b"
                >
                  <td class="px-8 py-4 mr-2">{{ laporan.no_pegawai }}</td>
                  <td>{{ laporan.nama }}</td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.gaji_fh }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.gaji_pusat }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pensiun }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pendapatan_bruto }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.biaya_jabatan }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.aksa_mandiri }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.dplk_pensiun }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.jumlah_potongan }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.ptkp }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.pkp }}
                  </td>
                  <td
                    v-if="
                      pegawaiTerpilih === 'Dosen Tetap' ||
                      pegawaiTerpilih === 'Karyawan'
                    "
                  >
                    {{ laporan.pajak.pajak_pph21 }}
                  </td>
                  <!-- Hanya tampilkan kolom pendapatan bruto dan pajak PPH25 untuk dosen luar biasa -->
                  <td v-if="pegawaiTerpilih === 'Dosen Luar Biasa'">
                    {{ laporan.jumlah_pendapatan }}
                  </td>
                  <td v-if="pegawaiTerpilih === 'Dosen Luar Biasa'">
                    {{ laporan.jumlah_potongan }}
                  </td>
                  <td v-if="pegawaiTerpilih === 'Dosen Luar Biasa'">
                    {{ laporan.pendapatan_bruto }}
                  </td>
                  <td v-if="pegawaiTerpilih === 'Dosen Luar Biasa'">
                    {{ laporan.pajak.pajak_pph25 }}
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
                  filteredLaporanPajak.length
                )
              }}
              dari {{ filteredLaporanPajak.length }}
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
      laporanPajak: [],
      periodePajak: [],
      jenisPegawai: ['Dosen Tetap', 'Dosen Luar Biasa', 'Karyawan'],
      pegawaiTerpilih: 'Dosen Tetap', // Default value
      periodeTerpilih: '',
      filteredLaporanPajak: [],
      tempPegawaiTerpilih: 'Dosen Tetap',
      tempPeriodeTerpilih: '',
      currentPage: 1,
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
    await this.fetchLaporanPajak() // Memuat data awal berdasarkan jenis pegawai default
    this.filterDataByPeriode() // Menyaring data berdasarkan periode default
  },
  computed: {
    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage
      let end = start + this.itemsPerPage
      return this.filteredLaporanPajak.slice(start, end)
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
  },
  methods: {
    async fetchLaporanPajak() {
      let endpoint
      switch (this.pegawaiTerpilih) {
        case 'Dosen Tetap':
          endpoint = '/dosentetap/laporan/pajak'
          break
        case 'Dosen Luar Biasa':
          endpoint = '/dosenlb/laporan/pajak'
          break
        case 'Karyawan':
          endpoint = '/karyawan/laporan/pajak'
          break
        default:
          endpoint = '/dosentetap/laporan/pajak' // Default endpoint
      }

      try {
        const response = await this.$axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response && response.status === 200 && response.data) {
          this.laporanPajak = response.data.data
          this.periodePajak = response.data.data.map(
            (item) => item.periode.month + ' ' + item.periode.year
          )
          this.periodeTerpilih = this.periodePajak[0] // Set default value
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    filterDataByPeriode() {
      const [selectedMonth, selectedYear] = this.periodeTerpilih.split(' ')
      this.filteredLaporanPajak = this.laporanPajak.find(
        (item) =>
          item.periode.month === selectedMonth &&
          item.periode.year === selectedYear
      ).laporanpajak
    },
    async updateDataBerdasarkanPegawai() {
      this.pegawaiTerpilih = this.tempPegawaiTerpilih
      await this.fetchLaporanPajak()
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
      this.fetchLaporanPajak() // Jika perlu memanggil API
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
    generateCSV() {
      let csvContent = 'data:text/csv;charset=utf-8,'

      // Tambahkan header berdasarkan jenis pegawai
      const headers =
        this.pegawaiTerpilih === 'Dosen Luar Biasa'
          ? this.headerDosenLuarBiasa
          : this.headerDosenTetap
      csvContent += headers.join(',') + '\r\n'

      // Dapatkan data yang difilter tanpa memperhatikan pagination
      const filteredData = this.getFilteredData() // Fungsi yang perlu Anda definisikan

      // Tambahkan isi data
      filteredData.forEach((row) => {
        let rowData = headers
          .map((header) => {
            // Ambil nilai berdasarkan header dan struktur data
            let value = row[header] || (row.pajak && row.pajak[header])
            return `"${value}"` // Kutip setiap nilai untuk menangani koma dan karakter spesial
          })
          .join(',')
        csvContent += rowData + '\r\n'
      })

      // Membuat link untuk download
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'laporan_pajak.csv')
      document.body.appendChild(link) // Diperlukan untuk Firefox

      link.click() // Lakukan klik untuk mendownload
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
      const wb = XLSX.utils.book_new()
      const filteredData = this.getFilteredDataForExcel()

      const dataToExport = filteredData.map((item) => {
        // Inisialisasi objek untuk baris data Excel
        const row = {}

        // Sesuaikan pemetaan key dan header berdasarkan jenis pegawai
        const keyMap = this.getKeyMap()

        // Isi row dengan data yang sesuai dari item
        Object.keys(keyMap).forEach((header) => {
          const key = keyMap[header]
          if (typeof key === 'function') {
            // Untuk key yang memerlukan akses fungsi khusus
            row[header] = key(item)
          } else {
            // Untuk key dengan akses langsung
            row[header] = item[key] ?? ''
          }
        })

        return row
      })

      const ws = XLSX.utils.json_to_sheet(dataToExport)

      // Tambahkan sheet ke workbook
      XLSX.utils.book_append_sheet(wb, ws, 'Laporan')

      // Format nama file berdasarkan jenis pegawai dan periode
      const jenisPegawai = this.pegawaiTerpilih
        .toLowerCase()
        .replace(/\s+/g, '-')
      const [bulan, tahun] = this.periodeTerpilih.split(' ')
      const fileName = `laporan_pajak_${jenisPegawai}_${bulan.toLowerCase()}_${tahun}.xlsx`

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
