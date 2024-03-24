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
            name: 'gaji-karyawan-id-detailsGaji',
            params: { id: karyawan_id },
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
            Edit Transaksi Gaji Dosen Tetap
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
                        <td class="">{{ endDateMonthAndYear }}</td>
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
                        class="font-medium input-field bg-grey"
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
                    <div
                      v-for="(nilai, nama) in gaji_fakultas"
                      :key="nama"
                      v-if="
                        nama !== 'komponen_baru' &&
                        nama !== 'honor_kelebihan_mengajar' &&
                        nama !== 'honor_mengajar_dpk' &&
                        nama !== 'peny_honor_mengajar' &&
                        nama !== 'tunjangan_guru_besar'
                      "
                      class="form-group"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="text"
                          class="input-field basis-[95%]"
                          v-model.number="gaji_fakultas[nama]"
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
                              hapusKomponen('gaji_fakultas', nama)
                            "
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <!-- komponen tambahan -->
                    <div
                      v-for="(nilai, nama) in gaji_fakultas.komponen_baru"
                      :key="nama"
                      class="form-group"
                    >
                      <label class="text-navy">{{ formatLabel(nama) }}</label>
                      <div class="flex flex-row">
                        <input
                          type="text"
                          class="input-field basis-[95%]"
                          v-model.number="gaji_fakultas.komponen_baru[nama]"
                        />
                        <button
                          class="ml-2 text-red-500 hover:text-red-700"
                          @click.prevent="hapusKomponen('gaji_fakultas', nama)"
                        >
                          <i class="fas fa-trash"></i>
                        </button>
                      </div>
                    </div>
                    <div class="justify-center mt-5 space-y-auto form-group">
                      <button
                        class="p-2 text-white bg-green-600 border rounded-full"
                        @click.prevent="openModal('gaji_fakultas')"
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
                    <!-- <div class="form-group">
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
                    </div> -->
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
                        v-model.number="hitungPkp"
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
                          :value="formattedPendapatanBersih"
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
      karyawan_id: '',
      transaksiData: null,
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
        honor: 0,
        komponen_baru: {},
      },
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
      dosen_tetap_id: '',
      dostap_bank_id: '',
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
        `/karyawan/gaji/transaksi/${params.id}`,
        { headers }
      )

      console.log(response.data.data)
      // Perbarui state lokal dengan data terbaru dari server

      // Destructure the data you need from the response
      const {
        karyawan_id,
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
        karyawan_id,
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
    console.log(this.gaji_fakultas.komponen_baru)
    if (this.transaksiData) {
      // Isi model form dengan data transaksi untuk gaji universitas
      const gajiUniv = this.transaksiData.gaji_universitas[0]
      this.gaji_pokok = gajiUniv.gaji_pokok
      this.tunjangan_fungsional = gajiUniv.tunjangan_fungsional
      this.tunjangan_struktural = gajiUniv.tunjangan_struktural
      this.tunjangan_khusus_istimewa = gajiUniv.tunjangan_khusus_istimewa
      this.tunjangan_presensi_kerja = gajiUniv.tunjangan_presensi_kerja
      this.tunjangan_tambahan = gajiUniv.tunjangan_tambahan
      this.tunjangan_suami_istri = gajiUniv.tunjangan_suami_istri
      this.tunjangan_anak = gajiUniv.tunjangan_anak
      this.uang_lembur_hk = gajiUniv.uang_lembur_hk
      this.uang_lembur_hl = gajiUniv.uang_lembur_hl
      this.transport_kehadiran = gajiUniv.transport_kehadiran
      this.honor_universitas = gajiUniv.honor_universitas

      // Isi model form dengan data transaksi untuk gaji fakultas
      const gajiFakultas = this.transaksiData.gaji_fakultas[0].gaji_fakultas
      this.gaji_fakultas.tunjangan_tambahan = gajiFakultas.tunjangan_tambahan
      this.gaji_fakultas.honor_kinerja = gajiFakultas.honor_kinerja
      this.gaji_fakultas.honor = gajiFakultas.honor

      // Isi model form dengan data transaksi untuk potongan
      const potongan = this.transaksiData.potongan[0].potongan
      this.potongan.sp_fh = potongan.sp_fh
      this.potongan.infaq = potongan.infaq

      // Isi model form dengan data transaksi untuk pajak
      const pajak = this.transaksiData.pajak[0]
      this.pensiun = pajak.pensiun
      this.bruto_pajak = pajak.bruto_pajak
      this.bruto_murni = pajak.bruto_murni
      this.biaya_jabatan = pajak.biaya_jabatan
      this.aksa_mandiri = pajak.aksa_mandiri
      this.dplk_pensiun = pajak.dplk_pensiun
      this.jumlah_potongan_kena_pajak = pajak.jumlah_potongan_kena_pajak
      this.jumlah_set_potongan_kena_pajak = pajak.jumlah_set_potongan_kena_pajak
      this.ptkp = pajak.ptkp
      this.pkp = pajak.pkp
      this.pajak_pph21 = pajak.pajak_pph21
      this.jumlah_set_pajak = pajak.jumlah_set_pajak
      this.potongan_tak_kena_pajak = pajak.potongan_tak_kena_pajak
      this.pendapatan_bersih = pajak.pendapatan_bersih

      // Jika ada komponen dinamis dalam gaji_fakultas atau potongan, isi mereka juga
      for (let key in gajiFakultas) {
        if (
          !this.gaji_fakultas.hasOwnProperty(key) &&
          key !== 'id' &&
          key !== 'deleted_at' &&
          key !== 'created_at' &&
          key !== 'updated_at'
        ) {
          this.$set(this.gaji_fakultas, key, gajiFakultas[key])
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
          ...this.gaji_fakultas,
          ...Object.fromEntries(
            Object.entries(this.gaji_fakultas.komponen_baru).map(
              ([key, value]) => [key, parseInt(value)]
            )
          ),
        }

        // Hapus key 'komponen_baru' dari gaji_fakultas
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
          // gaji_fakultas: this.gaji_fakultas,
          // gaji_fakultas: {
          //   tunjangan_tambahan: this.gaji_fakultas.tunjangan_tambahan,
          //   honor_kinerja: this.gaji_fakultas.honor_kinerja,
          //   honor_kelebihan_mengajar:
          //     this.gaji_fakultas.honor_kelebihan_mengajar,
          //   honor_mengajar_dpk: this.gaji_fakultas.honor_mengajar_dpk,
          //   peny_honor_mengajar: this.gaji_fakultas.peny_honor_mengajar,
          //   tunjangan_guru_besar: this.gaji_fakultas.tunjangan_guru_besar,
          //   honor: this.gaji_fakultas.honor,
          //   // Array untuk menyimpan komponen baru
          //   ...this.gaji_fakultas.komponen_baru,
          // },
          // potongan: {
          //   sp_fh: this.potongan.sp_fh,
          //   infaq: this.potongan.infaq,
          //   ...this.potongan.komponen_baru,
          // },
          gaji_fakultas: gajiFakultasWithIntegers,
          potongan: potonganWithIntegers,
          // ... data lainnya
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
          karyawan_bank_id: this.selectedBank,
        }

        // Menampilkan data yang akan dikirim ke API di console log
        console.log('Data to post:', dataToPost)

        // console.log(this.hasil)
        const response = await this.$axios.put(
          `/karyawan/gaji/transaksi/update/${this.transaksiData.id}`,
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
        this.flashMsg = 'Data transaksi gaji karyawan berhasil diperbarui!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false

          // Mengalihkan ke halaman yang diinginkan
          this.$router.push('/gaji/karyawan')
        }, 2000)
      } catch (error) {
        console.error('Error tambah karaywan:', error)
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
            'Terjadi kesalahan saat memperbarui data transaksi gaji karyawan.'
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
      // Periksa apakah response server berisi data untuk gaji_fakultas dan potongan
      if (dataFromServer.gaji_fakultas) {
        // Perbarui state gaji_fakultas dengan data terbaru dari server
        this.gaji_fakultas = {
          ...this.gaji_fakultas, // Spread operator untuk menyertakan properti yang ada
          ...dataFromServer.gaji_fakultas, // Perbarui dengan data terbaru dari server
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
      console.log('State gaji_fakultas setelah update:', this.gaji_fakultas)
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
      if (this.modalContext === 'gaji_fakultas') {
        this.$set(
          this.gaji_fakultas.komponen_baru,
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
      if (context === 'gaji_fakultas') {
        // Periksa jika komponen merupakan bagian dari 'komponen_baru'
        if (this.gaji_fakultas.komponen_baru.hasOwnProperty(namaKomponen)) {
          // Hapus dari 'komponen_baru'
          this.$delete(this.gaji_fakultas.komponen_baru, namaKomponen)
        } else {
          // Jika tidak, hapus dari 'gaji_fakultas' utama
          this.$delete(this.gaji_fakultas, namaKomponen)
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
            key !== 'karyawan_id' &&
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
    endDateMonthAndYear() {
      if (this.transaksiData) {
        // Ambil tanggal dari respons
        const endDate = new Date(this.transaksiData.gaji_date_end)

        // Dapatkan bulan dan tahun dari tanggal
        const month = endDate.toLocaleString('default', { month: 'long' })
        const year = endDate.getFullYear()

        // Kembalikan string bulan dan tahun
        return `${month} ${year}`
      }
      return ''
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
      for (let key in this.gaji_fakultas) {
        if (key !== 'komponen_baru') {
          total += parseFloat(this.gaji_fakultas[key]) || 0
        }
      }

      // Tambahkan setiap nilai dari komponen_baru ke total
      for (let key in this.gaji_fakultas.komponen_baru) {
        total += parseFloat(this.gaji_fakultas.komponen_baru[key]) || 0
      }

      // Mengembalikan total
      return total
    },

    formattedTotalGajiFakultas() {
      return this.formatRupiah(this.totalGajiFakultas)
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
    pajakPph21() {
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
