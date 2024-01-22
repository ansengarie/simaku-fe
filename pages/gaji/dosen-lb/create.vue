<template>
  <section class="pt-[50px] flex flex-col px-[50px] mb-[50px]">
    <!-- <NuxtLogo/> -->
    <div class="flex justify-between">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <nuxt-link to="/gaji/dosen-tetap">
          <img src="~/assets/img/btn_close.png" class="mx-[50px]" />
        </nuxt-link>
      </div>
    </div>
    <div class="items-center justify-center mt-[19px]">
      <p class="text-center text-title">Tambah Transaksi Gaji Dosen Tetap</p>
    </div>
    <div>
      <table class="mx-[176px] mt-[64px]">
        <tr>
          <td class="text-label">Nomor Pegawai</td>
          <td class="text-label px-[8px]">:</td>
          <td>{{ dosenData.no_pegawai }}</td>
        </tr>
        <tr>
          <td class="text-label">Nama Lengkap</td>
          <td class="text-label px-[8px]">:</td>
          <td>{{ dosenData.nama }}</td>
        </tr>
        <tr>
          <td class="text-label">Golongan</td>
          <td class="text-label px-[8px]">:</td>
          <td>{{ dosenData.golongan }}</td>
        </tr>
        <tr>
          <td class="text-label">Nama Bank</td>
          <td class="text-label px-[8px]">:</td>
          <td>{{ dosenData.nama_bank }}</td>
        </tr>
      </table>
    </div>
    <div class="flex flex-col items-center justify-center mt-[24px]">
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Gaji Pusat</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey">Gaji Pokok</label>
          <input type="text" class="input-field" v-model="gaji_pokok" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Fungsional</label>
          <input type="text" class="input-field" v-model="tj_fungsional" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Struktural</label>
          <input type="text" class="input-field" v-model="tj_struktural" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Khusus Istimewa</label>
          <input type="text" class="input-field" v-model="tj_khs_istimewa" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Presensi Kerja</label>
          <input type="text" class="input-field" v-model="tj_pres_kerja" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Tambahan</label>
          <input type="text" class="input-field" v-model="tj_tambahan" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HK</label>
          <input type="text" class="input-field" v-model="u_lembur_hk" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor</label>
          <input type="text" class="input-field" v-model="honor_univ" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HL</label>
          <input type="text" class="input-field" v-model="u_lembur_hl" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Suami/Istri</label>
          <input type="text" class="input-field" v-model="tj_suami_istri" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Transport Kehadiran</label>
          <input type="text" class="input-field" v-model="trans_kehadiran" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Anak</label>
          <input type="text" class="input-field" v-model="tj_anak" />
        </div>
        <div class="form-group">
          <label for="" class="flex items-center font-bold">
            Total Gaji Pusat
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
          <button
            @click.prevent="tambahGajiPusat"
            class="font-bold text-white rounded-full w-[50%] btn bg-primary mt-4"
          >
            Tambah
          </button>
        </div>
      </form>
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Gaji Fakultas Hukum</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Tambahan</label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Peny. Honor Mengajar</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor Kinerja</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Guru Besar</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor Kelebihan Mengajar</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor Mengajar DPK</label>
          <input type="text" class="input-field" />
        </div>
        <div class="col-span-2">
          <div class="form-group w-[50%]">
            <label for="" class="font-bold">Total Gaji Fakultas Hukum</label>
            <input type="text" class="bg-gray-300 input-field" disabled />
          </div>
        </div>
      </form>
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Pajak</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey">Pensiun</label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Jumlah Setoran Potongan Kena Pajak
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Bruto Untuk Pajak - Jumlah Potongan Kena Pajak"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Bruto Untuk Pajak
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Gaji Pusat + Gaji Fakultas Hukum + Pensiun"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">PTKP</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Bruto Murni
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Gaji Pusat + Gaji Fakultas Hukum"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            PKP
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Jumlah Setoran Kena Pajak - PTKP"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Biaya Jabatan
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Pendapatan Bruto Murni x 5%"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Pajak PPh 21
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="PKP x 5%"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Asuransi Aksa Mandiri</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Jumlah Setoran Pajak
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Bruto Untuk Pajak - (DPLK Pensiun + Asuransi Aksa Mandiri + Pensiun + PPh21)"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">DPLK Pensiun</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Potongan Tak Kena Pajak
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Jumlah Potongan"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="form-group">
          <label for="" class="flex text-center text-grey">
            Jumlah Potongan Kena Pajak
            <img
              src="~/assets/img/ic_info.png"
              alt=""
              class="ml-2 cursor-pointer"
              title="Asuransi Aksa Mandiri + DPLK Pensiun + Pensiun"
            />
          </label>
          <input type="text" class="bg-gray-300 input-field" disabled />
        </div>
        <div class="col-span-2">
          <div class="form-group w-[50%]">
            <label for="" class="flex items-center font-bold">
              Pendapatan Bersih
            </label>
            <input type="text" class="bg-gray-300 input-field" disabled />
          </div>
        </div>
      </form>
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Potongan</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey"> Simpan Pinjam Fakultas Hukum </label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey"> Infaq </label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group mb-[100px]">
          <label for="" class="flex items-center font-bold">
            Total Potongan
          </label>
          <input type="email" class="bg-gray-300 input-field" disabled />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import InputField from '~/components/InputField.vue'

export default {
  head() {
    return {
      title: 'Tambah Transaksi Gaji Dosen Tetap',
    }
  },
  components: {
    InputField,
  },
  data() {
    return {
      gaji_pokok: null,
      tj_struktural: null,
      tj_pres_kerja: null,
      u_lembur_hk: null,
      u_lembur_hl: null,
      trans_kehadiran: null,
      tj_fungsional: null,
      tj_khs_istimewa: null,
      tj_tambahan: null,
      honor_univ: null,
      tj_suami_istri: null,
      tj_anak: null,
      dosen_tetap_id: null,
    }
  },
  async asyncData({ params, $axios }) {
    let dosenData = {}

    // Menyiapkan header untuk permintaan
    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      const response = await $axios.get(`/dosentetap?id=${params.id}`, {
        headers,
      })
      dosenData = response.data.data
      console.log(dosenData, 'dosenData:')
    } catch (error) {
      console.error('Failed to fetch dosen data:', error)
    }

    return { dosenData, dosen_tetap_id: params.id }
  },

  methods: {
    async tambahGajiPusat() {
      try {
        // Definisi data yang akan dikirimkan
        const dataGaji = {
          gaji_pokok: this.gaji_pokok,
          tj_struktural: this.tj_struktural,
          tj_pres_kerja: this.tj_pres_kerja,
          u_lembur_hk: this.u_lembur_hk,
          u_lembur_hl: this.u_lembur_hl,
          trans_kehadiran: this.trans_kehadiran,
          tj_fungsional: this.tj_fungsional,
          tj_khs_istimewa: this.tj_khs_istimewa,
          tj_tambahan: this.tj_tambahan,
          honor_univ: this.honor_univ,
          tj_suami_istri: this.tj_suami_istri,
          tj_anak: this.tj_anak,
          dosen_tetap_id: this.dosenData.id,
        }

        // Mengambil token dari localStorage dan membuat header
        const token = localStorage.getItem('token')
        const headers = token ? { Authorization: `Bearer ${token}` } : {}

        // Melakukan POST request dengan data dan headers
        const response = await this.$axios.post(
          '/dosentetap-gajiuniv/create',
          dataGaji,
          {
            headers: headers,
          }
        )

        if (response.data.success) {
          // Ambil data yang sudah ditambahkan
          this.getData()
        }
      } catch (error) {
        console.error('Error saat menambahkan gaji pusat:', error)
      }
    },

    async getData() {
      try {
        const response = await this.$axios.get(
          '/dosentetap-gajiuniv/?id=${params.id}'
        )
        this.dosenData = response.data.data // atau sesuaikan dengan struktur data Anda
      } catch (error) {
        console.error('Error saat mengambil data:', error)
      }
    },
  },
}
</script>

<style scoped>
.text-label {
  color: #abb3c4;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

.border-bold {
  width: 1248px;
  height: 50px;
  flex-shrink: 0;
  background: #1f2b48;
}

.text-title-border {
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.card-input {
  width: 1248px;
  height: auto;
  flex-shrink: 0;
  background: #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
}
</style>
