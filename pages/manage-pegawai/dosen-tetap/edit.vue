<template>
  <section class="py-[50px] flex flex-col px-4">
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
      <p class="text-center text-title">
        Edit Dosen Tetap {{ $route.params.id }}
      </p>
    </div>
    <div class="flex justify-center justify-self-center mt-[5px]">
      <form class="w-full card" @submit.prevent="editDosenTetap">
        <div class="form-group">
          <label for="" class="text-grey">Nomor Pegawai</label>
          <input type="text" class="input-field" v-model="no_pegawai" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Lengkap</label>
          <input type="text" class="input-field" v-model="nama" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Golongan</label>
          <select class="input-field" v-model="golongan">
            <option value="IVA">IV A</option>
            <option value="IVB">IV B</option>
            <option value="IVC">IV C</option>
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
          <input type="text" class="input-field" v-model="alamat_saatini" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Bank</label>
          <select class="input-field" v-model="nama_bank">
            <option value="BNI">BNI</option>
            <option value="BCA">BCA</option>
            <option value="BRI">BRI</option>
            <option value="Mandiri">Mandiri</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nomor Rekening</label>
          <input type="text" class="input-field" v-model="norek_bank" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nomor Handphone</label>
          <input type="text" class="input-field" v-model="nomor_hp" />
        </div>
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
export default {
  name: 'EditPage',
  components: {},
  data() {
    return {
      no_pegawai: '',
      nama: '',
      golongan: '',
      status: '',
      jabatan: '',
      alamat_KTP: '',
      alamat_saatini: '',
      nama_bank: '',
      norek_bank: '',
      nomor_hp: '',
    }
  },
  mounted() {
    this.getDosenTetap()
  },
  methods: {
    // Method untuk mengambil data dosen tetap dari API
    async getDosenTetap() {
      try {
        const response = await this.$axios.$get(
          `/dosentetap?id=${this.$route.params.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        console.log(this.$route.params.id, 'id')
        this.no_pegawai = response.data.no_pegawai
        this.nama = response.data.nama
        this.golongan = response.data.golongan
        this.status = response.data.status
        this.jabatan = response.data.jabatan
        this.alamat_KTP = response.data.alamat_KTP
        this.alamat_saatini = response.data.alamat_saatini
        this.nama_bank = response.data.nama_bank
        this.norek_bank = response.data.norek_bank
        this.nomor_hp = response.data.nomor_hp
      } catch (error) {
        console.log(error)
      }
    },
    // Method untuk mengedit data dosen tetap
    async editDosenTetap() {
      try {
        const response = await this.$axios.post(
          `/dosentetap/update/${this.$route.params.id}`,
          {
            no_pegawai: this.no_pegawai,
            nama: this.nama,
            golongan: this.golongan,
            status: this.status,
            jabatan: this.jabatan,
            alamat_KTP: this.alamat_KTP,
            alamat_saatini: this.alamat_saatini,
            nama_bank: this.nama_bank,
            norek_bank: this.norek_bank,
            nomor_hp: this.nomor_hp,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        this.$router.push('/manage-pegawai/dosen-tetap')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
