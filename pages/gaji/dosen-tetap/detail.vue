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
    <div class="items-center justify-center mt-[19px] mb-5">
      <p class="text-center text-title">Tambah Transaksi Gaji Dosen Tetap</p>
    </div>
    <!-- card -->
    <div class="flex justify-center">
      <div class="w-full max-w-[1248px] bg-white rounded-lg">
        <!-- warp -->
        <div class="px-6 mb-6 space-y-4 md:flex">
          <!-- left -->
          <div>
            <table class="w-full ml-[44px] mt-[12px]">
              <tbody>
                <tr class="">
                  <td class="text-gray-400 w-[140px]">Nomor Pegawai</td>
                  <td class="">:</td>
                  <td>{{ gajiData.no_pegawai }}</td>
                </tr>
                <tr>
                  <td class="text-gray-400">Nama Lengkap</td>
                  <td class="">:</td>
                  <td>{{ gajiData.nama }}</td>
                </tr>
                <tr>
                  <td class="text-gray-400">NPWP</td>
                  <td class="">:</td>
                  <td>Belum ada response</td>
                </tr>
                <tr>
                  <td class="text-gray-400">Golongan</td>
                  <td class="">:</td>
                  <td>{{ gajiData.golongan }}</td>
                </tr>
                <tr>
                  <td class="text-gray-400">Jabatan</td>
                  <td class="">:</td>
                  <td>{{ gajiData.jabatan }}</td>
                </tr>
                <tr>
                  <td class="text-gray-400">Nama Bank</td>
                  <td class="">:</td>
                  <td>{{ gajiData.nama_bank }}</td>
                </tr>
                <tr>
                  <td class="text-gray-400">Nomor Rekening</td>
                  <td class="">:</td>
                  <td>Belum ada respinse</td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- right -->
          <div class="flex items-end justify-end flex-1 space-x-2">
            <h1>kanan</h1>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Gaji Pusat</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey">Gaji Pokok</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.gaji_pokok"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Fungsional</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_fungsional"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Struktural</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_struktural"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Khusus Istimewa</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_khs_istimewa"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Presensi Kerja</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_pres_kerja"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Tambahan</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_tambahan"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HK</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.u_lembur_hk"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.honor_univ"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HL</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.u_lembur_hl"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Suami/Istri</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_suami_istri"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Transport Kehadiran</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.trans_kehadiran"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Anak</label>
          <input type="text" class="input-field" v-model="gajiData.tj_anak" />
        </div>
        <div class="form-group">
          <label for="" class="flex items-center font-bold">
            Total Gaji Pusat
          </label>
          <input
            type="text"
            class="bg-gray-300 input-field"
            v-model="gajiData.total_gaji_univ"
            disabled
          />
        </div>
      </form>
    </div>

    <div class="flex flex-col items-center justify-center">
      <div class="pb-2 border-bold">
        <p class="py-2 text-title-border">Gaji Fakultas Hukum</p>
      </div>
      <form
        action=""
        class="grid w-[1248px] grid-cols-2 gap-4 p-6 mx-4 card-input"
      >
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Tambahan</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.gaji_pokok"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Penyesuaian Honor Mengajar</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_fungsional"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor Kinerja</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_struktural"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Guru Besar</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_khs_istimewa"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor Kelebihan Mengajar</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_pres_kerja"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor</label>
          <input
            type="text"
            class="input-field"
            v-model="gajiData.tj_tambahan"
          />
        </div>
        <div class="form-group">
          <label for="" class="text-grey"
            >Honor Mengajar Dosen Pengajar Kopertis</label
          >
          <input
            type="text"
            class="input-field"
            v-model="gajiData.u_lembur_hk"
          />
        </div>
        <div class="form-group">
          <label for="" class="flex items-center font-bold">
            Total Gaji Pusat
          </label>
          <input
            type="text"
            class="bg-gray-300 input-field"
            v-model="gajiData.total_gaji_univ"
            disabled
          />
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    // let dosenData = {}
    let gajiData = {}

    const token = localStorage.getItem('token')
    const headers = token ? { Authorization: `Bearer ${token}` } : {}

    try {
      // const responseDosen = await $axios.get(`/dosentetap?id=${params.id}`, {
      //   headers,
      // })
      // dosenData = responseDosen.data.data

      const responseGaji = await $axios.get(`/dosentetap-gaji/${params.id}`, {
        headers,
      })
      gajiData = responseGaji.data.data
      gajiData = responseGaji.data.data
      console.log(gajiData)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    }

    return { dosen_tetap_id: params.id, gajiData }
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
