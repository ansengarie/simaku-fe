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
        <nuxt-link to="/manage-pegawai/dosen-lb">
          <img src="~/assets/img/btn_close.png" class="mx-[50px]" />
        </nuxt-link>
      </div>
    </div>

    <flashMessage
      :type="flashType"
      :message="flashMsg"
      :autoClose="5000"
      @clearMessage="clearFlashMessage"
    ></flashMessage>

    <div class="items-center justify-center mt-[19px]">
      <p class="text-center text-title">Edit Dosen Luar Biasa</p>
    </div>
    <div class="flex justify-center justify-self-center mt-[5px]">
      <form class="w-full card" @submit.prevent="editDosenLuarBiasa">
        <div class="form-group">
          <label for="" class="text-grey">Nomor Pegawai</label>
          <input type="text" class="input-field" v-model="no_pegawai" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Lengkap</label>
          <input type="text" class="input-field" v-model="nama" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">NPWP</label>
          <input type="text" class="input-field" v-model="npwp" required />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Golongan</label>
          <select class="input-field" v-model="golongan">
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
          <select class="input-field" v-model="status">
            <option value="Aktif">Aktif</option>
            <option value="Tidak Aktif">Tidak Aktif</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Jabatan</label>
          <input type="text" class="input-field" v-model="jabatan" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Alamat KTP</label>
          <input type="text" class="input-field" v-model="alamat_KTP" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Alamat Saat Ini</label>
          <input type="text" class="input-field" v-model="alamat_saat_ini" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Bank Utama</label>
          <select class="input-field" v-model="selectedBankUtama">
            <option value="Bank BCA">Bank BCA</option>
            <option value="Bank Mandiri">Bank Mandiri</option>
            <option value="Bank BRI">Bank BRI</option>
            <option value="Bank BNI">Bank BNI</option>
            <option value="Bank CIMB Niaga">Bank CIMB Niaga</option>
            <option value="Bank Danamon">Bank Danamon</option>
            <option value="Bank Panin">Bank Panin</option>
            <option value="Bank Maybank">Bank Maybank</option>
            <option value="Bank OCBC NISP">Bank OCBC NISP</option>
            <option value="Bank Permata">Bank Permata</option>
            <option value="Bank Syariah Indonesia">
              Bank Syariah Indonesia
            </option>
          </select>
        </div>
        <div v-if="banks && banks.length">
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
            <label for="" class="text-grey">Nama Bank Tambahan</label>
            <select class="input-field" v-model="selectedBankTambahan">
              <option value="Bank BCA">Bank BCA</option>
              <option value="Bank Mandiri">Bank Mandiri</option>
              <option value="Bank BRI">Bank BRI</option>
              <option value="Bank BNI">Bank BNI</option>
              <option value="Bank CIMB Niaga">Bank CIMB Niaga</option>
              <option value="Bank Danamon">Bank Danamon</option>
              <option value="Bank Panin">Bank Panin</option>
              <option value="Bank Maybank">Bank Maybank</option>
              <option value="Bank OCBC NISP">Bank OCBC NISP</option>
              <option value="Bank Permata">Bank Permata</option>
              <option value="Bank Syariah Indonesia">
                Bank Syariah Indonesia
              </option>
            </select>
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
          <input type="text" class="input-field" v-model="nomor_hp" />
        </div>
        <div class="flex justify-between mt-[43px] mb-[40px] w-[570]">
          <nuxt-link
            to="/manage-pegawai/dosen-lb"
            class="btn btn-primary w-[260px] h-[46px] mr-[51px] bg-red-700"
          >
            Batal
          </nuxt-link>
          <button type="submit" class="btn btn-primary h-[46px] w-[260px]">
            Simpan
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import banksData from '~/static/banks.js'
export default {
  name: 'EditPage',
  components: {
    flashMessage: () => import('~/components/FlashMessage.vue'),
  },
  data() {
    return {
      no_pegawai: '',
      nama: '',
      golongan: '',
      npwp: '',
      status: '',
      jabatan: '',
      alamat_KTP: '',
      alamat_saat_ini: '',
      selectedBankUtama: '',
      norek_bank_utama: '',
      selectedBankTambahan: '',
      norek_bank_tambahan: '',
      nomor_hp: '',
      flashType: '', // 'success' atau 'error'
      flashMsg: '',
      isLoading: false,
      idBankUtama: '',
      idBankTambahan: '',
    }
  },
  mounted() {
    this.getDosenTetap()
  },
  methods: {
    // Method untuk mengambil data dosen tetap dari API
    async getDosenTetap() {
      try {
        const token = localStorage.getItem('token')

        if (!token) {
          console.error('Token tidak ditemukan!')
          // Handle kasus ketika token tidak ditemukan, misalnya, redirect ke halaman login.
          return
        }
        console.log(localStorage.getItem('token'), 'ini token')
        const response = await this.$axios.$get(
          `/dosenlb?id=${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(response, 'response')
        console.log(this.$route.params.id, 'id')
        this.no_pegawai = response.data[0].no_pegawai
        this.nama = response.data[0].nama
        this.npwp = response.data[0].npwp
        this.golongan = response.data[0].golongan
        this.status = response.data[0].status
        this.jabatan = response.data[0].jabatan
        this.alamat_KTP = response.data[0].alamat_KTP
        this.alamat_saat_ini = response.data[0].alamat_saat_ini
        this.idBankUtama = response.data[0].banks[0].id
        this.selectedBankUtama = response.data[0].banks[0].nama_bank
        this.norek_bank_utama = response.data[0].banks[0].no_rekening
        this.idBankTambahan = response.data[0].banks[1].id
        this.selectedBankTambahan = response.data[0].banks[1].nama_bank
        this.norek_bank_tambahan = response.data[0].banks[1].no_rekening
        this.nomor_hp = response.data[0].nomor_hp
        console.log(this.selectedBankUtama)
      } catch (error) {
        console.log(error)
      }
    },
    // Method untuk mengedit data dosen tetap
    async editDosenLuarBiasa() {
      try {
        const response = await this.$axios.put(
          `/dosenlb/update/${this.$route.params.id}`,
          {
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
                id: this.idBankUtama,
                nama_bank: this.selectedBankUtama,
                no_rekening: this.norek_bank_utama,
              },
              {
                id: this.idBankTambahan,
                nama_bank: this.selectedBankTambahan,
                no_rekening: this.norek_bank_tambahan,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(localStorage.getItem('token'), 'ini token put')
        this.flashType = 'success'
        this.flashMsg = 'Data dosen berhasil diubah!'
        // Menampilkan indikator loading
        this.isLoading = true

        // Delay pengalihan selama 2 detik
        setTimeout(() => {
          // Menghilangkan indikator loading
          this.isLoading = false
          this.$router.push('/manage-pegawai/dosen-lb')
        }, 2000)
      } catch (error) {
        console.error('Error edit Dosen Luar Biasa:', error)
        this.flashType = 'error'
        this.flashMsg = 'Terjadi kesalahan saat mengubah data dosen.'
      }
    },
    clearFlashMessage() {
      this.flashType = ''
      this.flashMsg = ''
    },
  },
  computed: {
    banks() {
      return banksData
    },
  },
}
</script>
