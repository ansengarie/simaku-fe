<template>
  <section class="py-[50px] flex flex-col px-4">
    <!-- <NuxtLogo/> -->
    <div class="flex justify-between">
      <div class="flex justify-start justify-self-start">
        <img src="~/assets/img/logo-simaku-index.png" class="mx-[50px]" />
      </div>
      <div class="flex justify-end justify-self-end">
        <a href="../dosen_tetap/dosen_tetap">
          <img src="~/assets/img/btn_close.png" class="mx-[50px]" />
        </a>
      </div>
    </div>

    <div class="items-center justify-center mt-[19px]">
      <p class="text-center text-title">Tambah Dosen Tetap</p>
    </div>
    <div class="flex justify-center justify-self-center mt-[5px]">
      <form class="w-full card">
        <div class="form-group">
          <label for="" class="text-grey">Nomor Pegawai</label>
          <input type="email" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Lengkap</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Golongan</label>
          <select class="input-field">
            <option value="admin">IV A</option>
            <option value="admin">IV B</option>
            <option value="admin">IV C</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Status</label>
          <select class="input-field">
            <option value="admin">Aktif</option>
            <option value="admin">Tidak Aktif</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Jabatan</label>
          <input type="text" class="input-field" />
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nama Bank</label>
          <select class="input-field">
            <option value="admin">BNI</option>
            <option value="admin">BCA</option>
            <option value="admin">BRI</option>
            <option value="user">Mandiri</option>
          </select>
        </div>
        <div class="form-group">
          <label for="" class="text-grey">Nomor Rekening</label>
          <input type="Number" class="input-field" />
        </div>
        <div class="flex justify-between mt-[43px] mb-[40px] w-[570]">
          <a
            href="index.html"
            class="btn btn-primary w-[260px] h-[46px] mr-[51px] bg-red-700"
          >
            Batal
          </a>
          <a href="index.html" class="btn btn-primary h-[46px] w-[260px]">
            Tambah
          </a>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
export default {
  name: 'IndexPage',
}
</script>
