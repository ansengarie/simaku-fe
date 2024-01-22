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
            Rekapitulasi Pendapatan {{ this.pegawaiTerpilih }}
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[400px] w-full">
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
                v-for="periode in periodePotongan"
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
              <thead
                class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
              >
                <tr>
                  <th
                    v-for="header in tableHeaders"
                    :key="header"
                    scope="col"
                    class="px-6 py-3"
                  >
                    {{ formatHeader(header) }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, index) in filteredRekapitulasiPendapatan"
                  :key="`row-${index}`"
                  class="border-b"
                >
                  <td class="px-8 py-4">{{ item.no_pegawai }}</td>
                  <td class="px-8 py-4">{{ item.nama }}</td>
                  <td class="px-8 py-4">{{ item.golongan }}</td>
                  <!-- Loop untuk setiap komponen pendapatan -->
                  <td
                    v-for="(value, key) in item.gaji_fakultas ||
                    item.komponen_pendapatan"
                    :key="`detail-${index}-${key}`"
                    class="px-8 py-4"
                  >
                    {{ value }}
                  </td>
                  <!-- Kolom untuk jumlah gaji FH dan pusat jika ada -->
                  <td v-if="item.jumlah_gaji_fh">{{ item.jumlah_gaji_fh }}</td>
                  <td v-if="item.jumlah_gaji_pusat">
                    {{ item.jumlah_gaji_pusat }}
                  </td>
                  <!-- Kolom untuk total -->
                  <td>{{ item.total }}</td>
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
                  filteredRekapitulasiPendapatan.length
                )
              }}
              dari {{ filteredRekapitulasiPendapatan.length }}
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
                  currentPage * itemsPerPage >=
                  filteredRekapitulasiPendapatan.length
                "
              >
                <span
                  :class="{
                    'material-symbols-outlined': true,
                    'text-gray-500':
                      currentPage * itemsPerPage >=
                      filteredRekapitulasiPendapatan.length,
                    'opacity-50':
                      currentPage * itemsPerPage >=
                      filteredRekapitulasiPendapatan.length,
                    'text-black':
                      currentPage * itemsPerPage <
                      filteredRekapitulasiPendapatan.length,
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
      periodePotongan: [],
      jenisPegawai: ['Dosen Tetap', 'Dosen Luar Biasa', 'Karyawan'],
      pegawaiTerpilih: 'Dosen Tetap', // Default value
      periodeTerpilih: '',
      filteredRekapitulasiPendapatan: [],
      tempPegawaiTerpilih: 'Dosen Tetap',
      tempPeriodeTerpilih: '',
      currentPage: 1,
      filteredRekapitulasiPendapatan: [],
      itemsPerPage: 10, // Atau jumlah yang Anda inginkan
    }
  },
  created() {
    this.fetchRekapitulasiPendapatan().then(() => {
      this.filterDataByPeriode()
      console.log('Headers after fetch:', this.tableHeaders)
      console.log('Data after filter:', this.filteredRekapitulasiPendapatan)
    })
  },

  async mounted() {
    await this.fetchRekapitulasiPendapatan() // Memuat data awal berdasarkan jenis pegawai default
    this.filterDataByPeriode() // Menyaring data berdasarkan periode default
  },
  computed: {
    paginatedData() {
      let start = (this.currentPage - 1) * this.itemsPerPage
      let end = start + this.itemsPerPage
      return this.filteredRekapitulasiPendapatan.slice(start, end)
    },

    teksRekapitulasi() {
      let teks = 'Rekapitulasi Pendapatan '
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
    tableHeaders() {
      if (this.filteredRekapitulasiPendapatan.length > 0) {
        let headers = ['No Pegawai', 'Nama', 'Golongan']

        // Menambahkan header dinamis berdasarkan jenis pegawai
        const firstEntry = this.filteredRekapitulasiPendapatan[0]
        if (firstEntry.gaji_fakultas) {
          headers = headers.concat(Object.keys(firstEntry.gaji_fakultas))
        } else if (firstEntry.komponen_pendapatan) {
          headers = headers.concat(Object.keys(firstEntry.komponen_pendapatan))
        }

        // Menambahkan header untuk jumlah gaji FH dan pusat jika ada
        if (firstEntry.jumlah_gaji_fh) headers.push('Jumlah Gaji FH')
        if (firstEntry.jumlah_gaji_pusat) headers.push('Jumlah Gaji Pusat')

        // Selalu menambahkan header untuk total
        headers.push('Total')

        return headers.map(this.formatHeader)
      }
      return []
    },

    getValueFromNestedObject(item, path) {
      console.log('Called getValueFromNestedObject with:', item, path)
      if (!path) return null
      const properties = path.split('.')
      return properties.reduce((prev, curr) => prev && prev[curr], item)
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
    async fetchRekapitulasiPendapatan() {
      let endpoint
      switch (this.pegawaiTerpilih) {
        case 'Dosen Tetap':
          endpoint = '/dosentetap/laporan/rekapitulasipendapatan'
          break
        case 'Dosen Luar Biasa':
          endpoint = '/dosenlb/laporan/rekapitulasipendapatan'
          break
        case 'Karyawan':
          endpoint = '/karyawan/laporan/rekapitulasipendapatan'
          break
        default:
          endpoint = '/dosentetap/laporan/rekapitulasipendapatan' // Default endpoint
      }

      try {
        const response = await this.$axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        if (response && response.status === 200 && response.data) {
          this.laporanRekapitulasiPendapatan = response.data.data
          this.periodePotongan = response.data.data.map(
            (item) => item.periode.month + ' ' + item.periode.year
          )
          this.periodeTerpilih = this.periodePotongan[0] // Set default value
        }
        console.log(this.laporanRekapitulasiPendapatan)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },

    filterDataByPeriode() {
      // Pastikan bahwa data sudah tersedia dan dalam format yang benar
      if (!Array.isArray(this.laporanRekapitulasiPendapatan)) {
        console.error(
          'Data rekapitulasi pendapatan belum tersedia atau bukan array'
        )
        return
      }

      const [selectedMonth, selectedYear] = this.periodeTerpilih.split(' ')
      const foundData = this.laporanRekapitulasiPendapatan.find(
        (item) =>
          item.periode &&
          item.periode.month === selectedMonth &&
          item.periode.year === selectedYear
      )

      this.filteredRekapitulasiPendapatan = foundData
        ? foundData.rekapitulasipendapatan
        : []
      console.log(this.filteredRekapitulasiPendapatan)
    },
    async updateDataBerdasarkanPegawai() {
      this.pegawaiTerpilih = this.tempPegawaiTerpilih
      await this.fetchRekapitulasiPendapatan()
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
      this.fetchRekapitulasiPendapatan() // Jika perlu memanggil API
      this.filterDataByPeriode()
    },
    nextPage() {
      if (
        this.currentPage * this.itemsPerPage <
        this.filteredRekapitulasiPendapatan.length
      ) {
        this.currentPage++
      }
    },

    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    // Bagian CSV
    generateCSV() {
      let csvContent = 'data:text/csv;charset=utf-8,'
      const headers = this.tableHeaders // Menggunakan tableHeaders yang sudah dinamis

      csvContent += headers.join(',') + '\r\n'

      this.getFilteredData().forEach((item) => {
        const row = headers
          .map((header) => {
            let value = item[header] ?? item.potongan[header] ?? '' // Akses nilai dari potongan atau langsung
            return `"${value}"`
          })
          .join(',')

        csvContent += row + '\r\n'
      })

      // Membuat Blob dan link untuk download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.download = 'laporan_potongan.csv'
      link.click()
      URL.revokeObjectURL(url)
    },

    getFilteredData() {
      const filteredData = this.laporanRekapitulasiPendapatan
        .filter((item) => {
          const periodeMatches =
            item.periode.month === this.periodeTerpilih.split(' ')[0] &&
            item.periode.year === this.periodeTerpilih.split(' ')[1]
          return periodeMatches
        })
        .flatMap((item) => item.laporanRekapitulasiPendapatan)
      console.log(filteredData)
      return filteredData
    },
    formatHeader(header) {
      // Format header: ganti underscore dengan spasi dan kapitalisasi setiap kata
      return header
        .split('_')
        .join(' ')
        .split('.')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    },

    generateExcel() {
      const wb = XLSX.utils.book_new()
      const wsData = []

      // Menentukan header berdasarkan jenis pegawai
      let headers = []
      if (this.pegawaiTerpilih === 'Dosen Tetap') {
        headers = [
          'No Pegawai',
          'Nama',
          'Golongan',
          'Tunjangan Tambahan',
          'Honor Kinerja',
          'Honor Kelebihan Mengajar',
          'Honor Mengajar DPK',
          'Peny Honor Mengajar',
          'Tunjangan Guru Besar',
          'Honor',
          'Jumlah Gaji FH',
          'Jumlah Gaji Pusat',
          'Total',
        ]
      } else if (this.pegawaiTerpilih === 'Dosen Luar Biasa') {
        headers = [
          'No Pegawai',
          'Nama',
          'Golongan',
          'Tunjangan Tambahan',
          'Honor Kinerja',
          'Honor Mengajar',
          'Tunjangan Guru Besar',
          'Total',
        ]
      } else if (this.pegawaiTerpilih === 'Karyawan') {
        headers = [
          'No Pegawai',
          'Nama',
          'Golongan',
          'Tunjangan Tambahan',
          'Honor Kinerja',
          'Honor',
          'Jumlah Gaji FH',
          'Jumlah Gaji Pusat',
          'Total',
        ]
      }
      wsData.push(headers)

      // Menentukan dan menambahkan data untuk setiap jenis pegawai
      this.filteredRekapitulasiPendapatan.forEach((item) => {
        let rowData = []
        switch (this.pegawaiTerpilih) {
          case 'Dosen Tetap':
            rowData = [
              item.no_pegawai,
              item.nama,
              item.golongan,
              ...Object.values(item.gaji_fakultas),
              item.jumlah_gaji_fh,
              item.jumlah_gaji_pusat,
              item.total,
            ]
            break
          case 'Dosen Luar Biasa':
            rowData = [
              item.no_pegawai,
              item.nama,
              item.golongan,
              ...Object.values(item.komponen_pendapatan),
              item.total,
            ]
            break
          case 'Karyawan':
            rowData = [
              item.no_pegawai,
              item.nama,
              item.golongan,
              ...Object.values(item.gaji_fakultas),
              item.jumlah_gaji_fh,
              item.jumlah_gaji_pusat,
              item.total,
            ]
            break
          default:
            // Handle other cases or provide a default
            rowData = []
        }
        wsData.push(rowData)
      })

      const ws = XLSX.utils.aoa_to_sheet(wsData)
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

      // Tentukan nama file
      const jenisPegawai = this.pegawaiTerpilih
        .toLowerCase()
        .replace(/\s+/g, '-')
      const [bulan, tahun] = this.periodeTerpilih.split(' ')
      const fileName = `rekapitulasi-pendapatan_${jenisPegawai}_${bulan.toLowerCase()}_${tahun}.xlsx`
    },

    getFilteredDataForExcel() {
      // Pastikan untuk menyesuaikan dengan struktur data yang Anda miliki
      return this.filteredRekapitulasiPendapatan.map((item) => {
        // Menggabungkan properti pada objek item dengan properti pada objek item.potongan
        const newItem = {
          ...item,
          ...item.potongan,
        }
        delete newItem.potongan // Menghapus properti potongan yang tidak diinginkan
        return newItem
      })
    },
  },
}
</script>

<style></style>
