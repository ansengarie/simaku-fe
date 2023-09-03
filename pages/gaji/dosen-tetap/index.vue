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
            Transaksi Gaji Dosen Tetap
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
        <div class="ml-auto">
          <!-- <Dropdown /> -->
          <MonthYearDropdown />
        </div>
      </section>
      <!-- End of Top Section -->
      <section class="pt-[10px]">
        <div class="">
          <div>
            <div class="card min-h-[730px] max-w-[1078px]">
              <div class="text-center">
                <table class="w-full h-full table-auto">
                  <thead class="">
                    <tr class="border-b">
                      <th class="px-4 py-2 font-head-tabel">No Pegawai</th>
                      <th class="px-4 py-2 font-head-tabel">Nama Lengkap</th>
                      <th class="px-4 py-2 font-head-tabel">Golongan</th>
                      <th class="px-4 py-2 font-head-tabel">Bank</th>
                      <th class="px-4 py-2 font-head-tabel">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="pt-[16px]">
                    <!-- Isi tabel -->
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
                          />
                        </div>
                      </td>
                    </tr>
                    <!-- 1 -->
                    <tr class="pt-[16px] border-b">
                      <td class="py-[16px]">001</td>
                      <td>M. Tirta Mulia, ST., MT.</td>
                      <td>IV A</td>
                      <td>BNI</td>
                      <td>
                        <div class="flex justify-center">
                          <nuxt-link to="/gaji/dosen-tetap/create">
                            <img
                              src="~/assets/img/ic_add.png"
                              alt="Add Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <nuxt-link to="/gaji/dosen-tetap/edit">
                            <img
                              src="~/assets/img/ic_edit.png"
                              alt="Edit Icon"
                              class="w-[24px] mr-[4px]"
                            />
                          </nuxt-link>
                          <img
                            src="~/assets/img/ic_print.png"
                            alt="Print"
                            class="w-[24px] mr-[4px]"
                          />
                          <img
                            src="~/assets/img/ic_delete.png"
                            alt="Delete"
                            class="w-[24px] mr-[4px]"
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
                    src="~/assets/img/ic_nav-left.png"
                    alt="Left Arrow"
                    class="w-[24px] col-span-1 ml-[6px]"
                  />
                  <img
                    src="~/assets/img/ic_nav-right.png"
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
import Dropdown from '~/components/dropdown.vue'
import MonthYearDropdown from '~/components/month-year-dropdown.vue'
import Sidebar from '~/components/Sidebar.vue' // Impor komponen Sidebar

export default {
  name: 'Index',
  head() {
    return {
      title: 'Transaksi Gaji Dosen Tetap',
    }
  },
  components: {
    Sidebar,
    Dropdown,
    MonthYearDropdown, // Daftarkan komponen Sidebar di sini
  },
  // Logika dan konten halaman
  methods: {
    handleSelectClick() {
      // Get the selected values from the MonthYearDropdown component
      const selectedMonth = this.$refs.dropdown.selectedMonth
      const selectedYear = this.$refs.dropdown.selectedYear

      // Implement the action you want to perform when "Pilih" button is clicked
      console.log('Selected month:', selectedMonth)
      console.log('Selected year:', selectedYear)
    },
  },
}
</script>

<style>
/* Gaya untuk konten utama */
</style>
