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
            Dosen Luar Biasa
          </div>
        </div>
        <div class="flex items-center gap-4">
          <form class="shrink md:w-[516px] w-full">
            <div class="relative">
              <input
                type="text"
                name=""
                id=""
                class="input-field !outline-none !border-none italic form-icon-search ring-indigo-200 focus:ring-2 transition-all duration-300 w-full pr-10"
                placeholder="Search ..."
              />
              <img
                src="../../../assets/img/ic_search.png"
                alt="Search Icon"
                class="absolute inset-y-0 right-0 flex items-center my-auto mr-[20px]"
              />
            </div>
          </form>
        </div>
      </section>

      <section class="pt-[50px]">
        <!-- Section Header -->
        <div class="mb-[30px]">
          <div class="flex items-center justify-end gap-6">
            <div>
              <a href="tambah_dosen_tetap">
                <button
                  class="px-8 py-2 text-lg font-bold text-white rounded-full bg-primary w-190 h-46"
                >
                  Tambah Dosen
                </button>
              </a>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  In Total
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">15</div>
              </div>
            </div>
          </div>

          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Active
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">13</div>
              </div>
            </div>
          </div>
          <div class="card !gap-y-10 max-h-[126px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Inactive
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <div class="">
          <div>
            <div class="card min-h-[468px] max-w-[1078px]">
              <div class="text-center">
                <table class="w-full h-full table-auto">
                  <thead>
                    <tr class="border-b">
                      <th class="px-4 py-2 font-head-tabel">No Pegawai</th>
                      <th class="px-4 py-2 font-head-tabel">Nama Lengkap</th>
                      <th class="px-4 py-2 font-head-tabel">Golongan</th>
                      <th class="px-4 py-2 font-head-tabel">Status</th>
                      <th class="px-4 py-2 font-head-tabel">Jabatan</th>
                      <th class="px-4 py-2 font-head-tabel">Bank</th>
                      <th class="px-4 py-2 font-head-tabel">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="pt-[16px]">
                    <!-- Isi tabel -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>
                        <p
                          class="bg-green-400 rounded-full w-[60px] m-auto text-green-700 font-bold"
                        >
                          AKTIF
                        </p>
                      </td>
                      <td>Koordinator Laboratorium</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <img
                            src="../../../assets/img/ic_edit.png"
                            alt="Edit Icon"
                            class="w-[24px] col-span-1"
                          />
                          <img
                            src="../../../assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">002</td>
                      <td>Ade Sukendar, ST.,MT</td>
                      <td>IV A</td>
                      <td>
                        <p
                          class="bg-green-400 rounded-full w-[60px] m-auto text-green-700 font-bold"
                        >
                          AKTIF
                        </p>
                      </td>
                      <td>Dosen</td>
                      <td>Mandiri</td>
                      <td>
                        <div class="flex justify-center">
                          <img
                            src="../../../assets/img/ic_edit.png"
                            alt="Edit Icon"
                            class="w-[24px] col-span-1"
                          />
                          <img
                            src="../../../assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">003</td>
                      <td>Erik, ST., M. Kom.</td>
                      <td>IV A</td>
                      <td>
                        <p
                          class="bg-green-400 rounded-full w-[60px] m-auto text-green-700 font-bold"
                        >
                          AKTIF
                        </p>
                      </td>
                      <td>Koordinator Mahasiswa</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <img
                            src="../../../assets/img/ic_edit.png"
                            alt="Edit Icon"
                            class="w-[24px] col-span-1"
                          />
                          <img
                            src="../../../assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">004</td>
                      <td>Hendra Komara, ST.,MT.</td>
                      <td>IV A</td>
                      <td>
                        <p
                          class="bg-red-400 rounded-full w-[110px] m-auto text-red-700 font-bold"
                        >
                          TIDAK AKTIF
                        </p>
                      </td>
                      <td>Dosen</td>
                      <td>Mandiri</td>
                      <td>
                        <div class="flex justify-center">
                          <img
                            src="../../../assets/img/ic_edit.png"
                            alt="Edit Icon"
                            class="w-[24px] col-span-1"
                          />
                          <img
                            src="../../../assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">005</td>
                      <td>R. Sandhika Galih Amalga, ST., MT</td>
                      <td>IV A</td>
                      <td>
                        <p
                          class="bg-green-400 rounded-full w-[60px] m-auto text-green-700 font-bold"
                        >
                          AKTIF
                        </p>
                      </td>
                      <td>Dosen</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <img
                            src="../../../assets/img/ic_edit.png"
                            alt="Edit Icon"
                            class="w-[24px] col-span-1"
                          />
                          <img
                            src="../../../assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] col-span-1"
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="flex justify-between mt-auto px-[25px] py-[25px]">
                <p class="text-muted">1 - 5 dari 4</p>
                <div class="flex justify-end"></div>
                <div class="flex">
                  <p class="mr-[16px] text-muted">Halaman</p>
                  <p class="mr-[20px] text-paging">1</p>
                  <img
                    src="../../../assets/img/ic_nav-left.png"
                    alt="Left Arrow"
                    class="w-[24px] col-span-1 ml-[6px]"
                  />
                  <img
                    src="../../../assets/img/ic_nav-right.png"
                    alt="Right Arrow"
                    class="w-[24px] col-span-1 mr-[6px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar.vue' // Impor komponen Sidebar

export default {
  name: 'Index',
  components: {
    Sidebar, // Daftarkan komponen Sidebar di sini
  },
  // Logika dan konten halaman
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
