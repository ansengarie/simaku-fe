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
                    <div
                      class="form-group"
                      v-for="(nilai, nama) in gaji_fakultas.komponen_baru"
                      :key="nama"
                    >
                      <label class="text-navy">{{ nama }}</label>
                      <div class="flex flex-row">
                        <input
                          type="number"
                          class="input-field basis-[95%]"
                          v-model="gaji_fakultas.komponen_baru[nama]"
                        />
                        <button
                          class="ml-2 text-red-500 hover:text-red-700"
                          @click.prevent="hapusKomponen('gaji_fakultas', nama)"
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
                        @click.prevent="openModal('gaji_fakultas')"
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
        const startDate = this.selectedDateRange.startDate
          ? this.selectedDateRange.startDate.toISOString().slice(0, 10)
          : null
        const endDate = this.selectedDateRange.endDate
          ? this.selectedDateRange.endDate.toISOString().slice(0, 10)
          : null

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
          gaji_fakultas: {
            tunjangan_tambahan: this.gaji_fakultas.tunjangan_tambahan,
            honor_kinerja: this.gaji_fakultas.honor_kinerja,
            honor_kelebihan_mengajar:
              this.gaji_fakultas.honor_kelebihan_mengajar,
            honor_mengajar_dpk: this.gaji_fakultas.honor_mengajar_dpk,
            peny_honor_mengajar: this.gaji_fakultas.peny_honor_mengajar,
            tunjangan_guru_besar: this.gaji_fakultas.tunjangan_guru_besar,
            honor: this.gaji_fakultas.honor,
            // Array untuk menyimpan komponen baru
            ...this.gaji_fakultas.komponen_baru,
          },
          potongan: {
            sp_fh: this.potongan.sp_fh,
            infaq: this.potongan.infaq,
            ...this.potongan.komponen_baru,
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
          status_bank: this.statusBank,
          gaji_date_start: startDate,
          gaji_date_end: endDate,
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
        this.flashMsg = 'Data transaksi gaji dosen berhasil ditambahkan!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false

          // Mengalihkan ke halaman yang diinginkan
          this.$router.push('/gaji/dosen-tetap')
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
        // Hapus komponen dari gaji_fakultas
        this.$delete(this.gaji_fakultas.komponen_baru, namaKomponen)
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
      let total = 0

      // Jumlahkan nilai komponen yang sudah diketahui
      total += this.gaji_fakultas.tunjangan_tambahan
      total += this.gaji_fakultas.honor_kinerja
      total += this.gaji_fakultas.honor_kelebihan_mengajar
      total += this.gaji_fakultas.honor_mengajar_dpk
      total += this.gaji_fakultas.peny_honor_mengajar
      total += this.gaji_fakultas.tunjangan_guru_besar
      total += this.gaji_fakultas.honor

      // Jumlahkan nilai dari komponen baru, jika ada
      if (this.gaji_fakultas.komponen_baru) {
        for (let key in this.gaji_fakultas.komponen_baru) {
          if (this.gaji_fakultas.komponen_baru.hasOwnProperty(key)) {
            total += parseFloat(this.gaji_fakultas.komponen_baru[key]) || 0
          }
        }
      }

      return total
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
