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
            Pendapatan Bersih {{ this.pegawaiTerpilih }}
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
            <select v-model="tempPegawaiTerpilih" class="text-sm input-field">
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
              class="text-sm text-white rounded-full btn bg-primary"
            >
              Pilih Pegawai
            </button>

            <select v-model="tempPeriodeTerpilih" class="text-sm input-field">
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
              <thead>
                <tr>
                  <th scope="col" class="px-6 py-3">No Pegawai</th>
                  <th scope="col" class="px-6 py-3">Nama Lengkap</th>
                  <th scope="col" class="px-6 py-3">Golongan</th>
                  <th
                    scope="col"
                    class="px-6 py-3"
                    v-if="pegawaiTerpilih !== 'Dosen Luar Biasa'"
                  >
                    Jumlah Gaji FH
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3"
                    v-if="pegawaiTerpilih !== 'Dosen Luar Biasa'"
                  >
                    Jumlah Gaji Pusat
                  </th>
                  <th scope="col" class="px-6 py-3">Jumlah Pendapatan</th>
                  <th scope="col" class="px-6 py-3">Jumlah Potongan</th>
                  <th scope="col" class="px-6 py-3">Pendapatan Bersih</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(laporan, index) in paginatedData"
                  :key="`${laporan.no_pegawai}-${index}`"
                >
                  <td class="px-8 py-4">{{ laporan.no_pegawai }}</td>
                  <td>{{ laporan.nama }}</td>
                  <td>{{ laporan.golongan }}</td>
                  <td v-if="pegawaiTerpilih !== 'Dosen Luar Biasa'">
                    {{ laporan.jumlah_gaji_fh }}
                  </td>
                  <td v-if="pegawaiTerpilih !== 'Dosen Luar Biasa'">
                    {{ laporan.jumlah_gaji_pusat }}
                  </td>
                  <td>{{ laporan.jumlah_pendapatan }}</td>
                  <td>{{ laporan.jumlah_potongan }}</td>
                  <td>{{ laporan.pendapatan_bersih }}</td>
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
      searchQuery: '',
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
        'Golongan',
        'Jumlah Gaji FH',
        'Jumlah Gaji Pusat',
        'Jumlah Pendapatan',
        'Jumlah Potongan',
        'Pendapatan Bersih',
      ],
      headerDosenLuarBiasa: [
        'No Pegawai',
        'Nama Lengkap',
        'Golongan',
        'Jumlah Pendapatan',
        'Jumlah Potongan',
        'Pendapatan Bersih',
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
        'Rekapitulasi pembayaran honorium mengajar dan pendapatan bersih '
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
    async fetchLaporanPajak() {
      let endpoint
      switch (this.pegawaiTerpilih) {
        case 'Dosen Tetap':
          endpoint = '/dosentetap/laporan/pendapatanbersih'
          break
        case 'Dosen Luar Biasa':
          endpoint = '/dosenlb/laporan/pendapatanbersih'
          break
        case 'Karyawan':
          endpoint = '/karyawan/laporan/pendapatanbersih'
          break
        default:
          endpoint = '/dosentetap/laporan/pendapatanbersih' // Default endpoint
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
        console.log(this.laporanPajak)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    filterDataByPeriode() {
      const [selectedMonth, selectedYear] = this.periodeTerpilih.split(' ')
      const foundItem = this.laporanPajak.find(
        (item) =>
          item.periode.month === selectedMonth &&
          item.periode.year === selectedYear
      )

      // Pastikan foundItem tidak undefined sebelum mengakses propertinya
      if (foundItem && foundItem.pendapatanbersih) {
        this.filteredLaporanPajak = foundItem.pendapatanbersih
      } else {
        this.filteredLaporanPajak = [] // Atur sebagai array kosong jika tidak ada data yang cocok
      }
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
      const filteredData = this.getFilteredData()

      // Tambahkan isi data
      filteredData.forEach((row) => {
        let rowData = headers
          .map((header) => {
            // Sesuaikan dengan struktur data pendapatan bersih
            return `"${row[header] ?? ''}"` // Kutip setiap nilai
          })
          .join(',')
        csvContent += rowData + '\r\n'
      })

      // Membuat link untuk download
      var encodedUri = encodeURI(csvContent)
      var link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', 'laporan_pendapatan_bersih.csv')
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
        .flatMap((item) => item.pendapatanbersih) // Gunakan pendapatanbersih
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
      const fileName = `pendapatan-bersih_${jenisPegawai}_${bulan.toLowerCase()}_${tahun}.xlsx`

      // Tulis workbook ke file XLSX
      XLSX.writeFile(wb, fileName)
    },

    getKeyMap() {
      // Pemetaan kunci berdasarkan jenis pegawai
      if (this.pegawaiTerpilih === 'Dosen Luar Biasa') {
        // Pemetaan untuk dosen luar biasa
        return {
          'No Pegawai': 'no_pegawai',
          'Nama Lengkap': 'nama',
          Golongan: 'golongan',
          'Jumlah Pendapatan': 'jumlah_pendapatan',
          'Jumlah Potongan': 'jumlah_potongan',
          'Pendapatan Bersih': 'pendapatan_bersih',
        }
      } else {
        // Pemetaan untuk dosen tetap dan karyawan
        return {
          'No Pegawai': 'no_pegawai',
          'Nama Lengkap': 'nama',
          Golongan: 'golongan',
          'Jumlah Gaji FH': 'jumlah_gaji_fh',
          'Jumlah Gaji Pusat': 'jumlah_gaji_pusat',
          'Jumlah Pendapatan': 'jumlah_pendapatan',
          'Jumlah Potongan': 'jumlah_potongan',
          'Pendapatan Bersih': 'pendapatan_bersih',
        }
      }
    },

    getFilteredDataForExcel() {
      const filteredData = this.laporanPajak
        .filter((item) => {
          return (
            item.periode.month === this.periodeTerpilih.split(' ')[0] &&
            item.periode.year === this.periodeTerpilih.split(' ')[1]
          )
        })
        .flatMap((item) => item.pendapatanbersih) // Gunakan pendapatanbersih
      return filteredData
    },
  },
}
</script>

<style></style>
