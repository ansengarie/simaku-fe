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
          <td>001</td>
        </tr>
        <tr>
          <td class="text-label">Nama Lengkap</td>
          <td class="text-label px-[8px]">:</td>
          <td>Prof. DR. Zulham Zamrun, Sh.,MH</td>
        </tr>
        <tr>
          <td class="text-label">Golongan</td>
          <td class="text-label px-[8px]">:</td>
          <td>IV A</td>
        </tr>
        <tr>
          <td class="text-label">Nama Bank</td>
          <td class="text-label px-[8px]">:</td>
          <td>Mandiri</td>
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
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Fungsional</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Struktural</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Khusus Istimewa</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Presensi Kerja</label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Tambahan</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HK</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Honor</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Uang Lembur HL</label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Suami/Istri</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Transport Kehadiran</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Tunjangan Anak</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="flex items-center font-bold">
            Total Gaji Pusat
          </label>
          <input type="email" class="bg-gray-300 input-field" disabled />
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
              <CustomTooltip ref="customTooltip">
                <img
                  src="~/assets/img/ic_info.png"
                  alt=""
                  class="ml-2 cursor-pointer"
                  @mouseover="showTooltip"
                  @mouseleave="hideTooltip"
                  title="Jumlah Setoran Potongan Kena Pajak - Potongan Tak Kena Pajak"
                />
                <template v-slot:tooltip-content>
                  <div class="ml-2 font-bold text-yellow-500">Total Gaji</div>
                  <p>Informasi tambahan tentang gaji.</p>
                </template>
              </CustomTooltip>
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
import CustomTooltip from '~/components/CostumTooltip.vue'

export default {
  components: {
    CustomTooltip,
  },
  data() {
    return {}
  },
  methods: {
    showTooltip() {
      this.$refs.customTooltip.show()
    },
    hideTooltip() {
      this.$refs.customTooltip.hide()
    },
  },
  head() {
    return {
      title: 'Tambah Transaksi Gaji Dosen Tetap',
    }
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
