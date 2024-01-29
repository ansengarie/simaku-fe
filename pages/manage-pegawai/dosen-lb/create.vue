<template>
  <section class="py-[50px] flex flex-col px-4">
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
    <div class="flex justify-between">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <nuxt-link to="/manage-pegawai/dosen-tetap">
          <img src="~/assets/img/btn_close.png" class="mx-[50px]" />
        </nuxt-link>
      </div>
    </div>

    <div class="items-center justify-center mt-[19px]">
      <p class="text-center text-title">Tambah Dosen Luar Biasa</p>
    </div>
    <flashMessage
      :type="flashType"
      :message="flashMsg"
      :autoClose="5000"
      @clearMessage="clearFlashMessage"
    ></flashMessage>

    <div class="flex justify-center justify-self-center mt-[5px]">
      <form class="w-full card" @submit.prevent="tambahDosenTetap">
        <div class="form-group">
          <label for="" class="text-grey">Nomor Pegawai</label>
          <input
            type="text"
            class="input-field"
            v-model="no_pegawai"
            required
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Lengkap</label>
          <input type="text" class="input-field" v-model="nama" required />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">NPWP</label>
          <input type="text" class="input-field" v-model="npwp" required />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Golongan</label>
          <select class="input-field" v-model="golongan" required>
            <option value="IIA">II A</option>
            <option value="IIB">II B</option>
            <option value="IIC">II C</option>
            <option value="IID">II D</option>
            <option value="IIIA">III A</option>
            <option value="IIIB">III B</option>
            <option value="IIIC">III C</option>
            <option value="IIID">III D</option>
            <option value="IVA">IV A</option>
            <option value="IVB">IV B</option>
            <option value="IVC">IV C</option>
            <option value="IVD">IV D</option>
            <option value="IVE">IV E</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Status</label>
          <select class="input-field" v-model="status" required>
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Jabatan</label>
          <input type="text" class="input-field" v-model="jabatan" required />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Alamat KTP</label>
          <input
            type="text"
            class="input-field"
            v-model="alamat_KTP"
            required
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Alamat Saat Ini</label>
          <input
            type="text"
            class="input-field"
            v-model="alamat_saat_ini"
            required
          />
        </div>
        <!-- <div class="form-group">
          <label for="" class="text-grey">Nama Bank</label>
          <select class="input-field" v-model="nama_bank">
            <option value="BNI">BNI</option>
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
            <option value="Mandiri">Mandiri</option>
          </select>
        </div> -->
        <div v-if="banks && banks.length">
          <div class="form-group">
            <bank-dropdown
              :banks="banks"
              v-model="selectedBankUtama"
              formLabel="Nama Bank Utama"
              formId="bankUtama"
              class="text-grey"
              @update:selectedBank="selectedBankUtama = $event"
            />
          </div>
          <div class="form-group">
            <label for="" class="text-grey">Nomor Rekening Utama</label>
            <input
              type="text"
              class="input-field"
              v-model="norek_bank_utama"
              :disabled="!selectedBankUtama"
              :style="{
                'background-color': selectedBankUtama ? '' : '#D9D9D9',
              }"
            />
          </div>
          <div class="form-group">
            <bank-dropdown
              :banks="banks"
              v-model="selectedBankTambahan"
              formLabel="Nama Bank Tambahan"
              formId="bankTambahan"
              class="text-grey"
              @update:selectedBank="selectedBankTambahan = $event"
              :disabled="!selectedBankUtama"
            />
          </div>
          <div class="form-group">
            <label for="" class="text-grey"
              >Nomor Rekening Tambahan (Optional)</label
            >
            <input
              type="text"
              class="input-field"
              v-model="norek_bank_tambahan"
              :disabled="!selectedBankTambahan"
              :style="{
                'background-color': selectedBankTambahan ? '' : '#D9D9D9',
              }"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="" class="text-grey">Nomor Handphone</label>
          <input type="text" class="input-field" v-model="nomor_hp" required />
        </div>

        <!-- <div class="form-group" v-for="(schema, index) in schemas" :key="index">
          <label for="" class="text-grey">{{ schema.label }}</label>
          <input type="text" class="input-field" v-model="schema.value" />
        </div>

        <div class="form-group">
          <label for="" class="text-grey">Hasil</label>
          <input type="text" class="input-field" :value="hasil" readonly />
        </div> -->

        <div class="flex justify-between mt-[43px] mb-[40px] w-[570]">
          <nuxt-link
            to="/manage-pegawai/dosen-tetap"
            class="btn btn-primary w-[260px] h-[46px] mr-[51px] bg-red-700"
          >
            Batal
          </nuxt-link>
          <button type="submit" class="btn btn-primary h-[46px] w-[260px]">
            Tambah
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import banksData from '~/static/banks.js'
import BankDropdown from '~/components/BankDropdown.vue'
export default {
  name: 'IndexPage',
  components: {
    flashMessage: () => import('~/components/FlashMessage.vue'),
    BankDropdown,
  },
  data() {
    return {
      no_pegawai: '',
      nama: '',
      npwp: '',
      golongan: '',
      status: '',
      jabatan: '',
      alamat_KTP: '',
      alamat_saat_ini: '',
      nama_bank: '',
      nomor_hp: '',
      flashType: '', // 'success' atau 'error'
      flashMsg: '',
      isLoading: false,
      schemas: [
        { label: 'Gaji 1', value: 5 },
        { label: 'Gaji 2', value: 10 },
      ],
      // banks: banksData, // Menggunakan data dari banks.js

      selectedBankUtama: '',
      norek_bank_utama: '',
      selectedBankTambahan: '',
      norek_bank_tambahan: '',
      newDosenTetapId: null,
    }
  },
  methods: {
    async tambahDosenTetap() {
      try {
        const idBankUtama = this.banks.find(
          (bank) => bank.label === this.selectedBankUtama
        )?.value
        const idBankTambahan = this.banks.find(
          (bank) => bank.label === this.selectedBankTambahan
        )?.value

        // Menampilkan informasi di console log
        console.log('Selected Bank Utama:', this.selectedBankUtama)
        console.log('Selected Bank Tambahan:', this.selectedBankTambahan)

        const dataToPost = {
          nama: this.nama,
          no_pegawai: this.no_pegawai,
          npwp: this.npwp,
          status: this.status,
          golongan: this.golongan,
          jabatan: this.jabatan,
          alamat_KTP: this.alamat_KTP,
          alamat_saat_ini: this.alamat_saat_ini,
          nomor_hp: this.nomor_hp,
          banks: [
            {
              nama_bank: this.selectedBankUtama,
              no_rekening: this.norek_bank_utama,
            },
            {
              nama_bank: this.selectedBankTambahan,
              no_rekening: this.norek_bank_tambahan,
            },
          ],
        }

        // Menampilkan data yang akan dikirim ke API di console log
        console.log('Data to post:', dataToPost)

        // console.log(this.hasil)
        const response = await this.$axios.post('dosenlb/create', dataToPost, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        this.flashType = 'success'
        this.flashMsg = 'Data dosen berhasil ditambahkan!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false

          // Mengalihkan ke halaman yang diinginkan
          this.$router.push('/manage-pegawai/dosen-lb')
        }, 2000)
      } catch (error) {
        console.error('Error tambah Dosen Tetap:', error)
        console.error('Error tambah Dosen Tetap:', error.response)
        this.flashType = 'error'
        this.flashMsg = 'Terjadi kesalahan saat menambahkan data dosen.'
      }
    },
    clearFlashMessage() {
      this.flashType = ''
      this.flashMsg = ''
    },
    handleSelectedBankUtama(newValue) {
      // Handle the selected bank value here
      this.selectedBankUtama = newValue
    },
    handleSelectedBankTambahan(newValue) {
      // Handle the selected bank value here
      this.selectedBankTambahan = newValue
    },
    handleSomeEvent() {
      console.log('Selected Bank Utama:', this.selectedBankUtama)
      console.log('Selected Bank Tambahan:', this.selectedBankTambahan)
      this.tambahDosenTetap()
    },
  },
  computed: {
    // Computed property named "count", depending on the
    // "text" variable
    hasil() {
      let hasil = Number(this.schemas[0].value) + Number(this.schemas[1].value)
      return hasil
    },
    banks() {
      return banksData
    },
  },
}
</script>
