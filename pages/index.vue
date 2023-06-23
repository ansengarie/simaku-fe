<template>
  <div>
    <Sidebar />
    <!-- Main Content -->
    <div class="lg:pr-[70px] py-[50px] lg:ml-[320px] xl:ml-[365px] px-4 lg:pl-0">
      <!-- Top Section -->
      <section class="flex flex-col flex-wrap justify-between gap-6 md:items-center md:flex-row">
        <div class="flex items-center justify-between gap-4">
          <a href="#" id="toggleOpenSidebar" class="lg:hidden"> </a>
          <div class="text-[32px] font-semibold text-dark">Overview</div>
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
                src="../assets/img/ic_search.png"
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
          <div class="flex items-center justify-between gap-6">
            <div>
              <div class="text-xl font-medium text-dark">Statistics</div>
            </div>
          </div>
        </div>

        <div class="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:gap-11">
          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Dosen Tetap
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">0</div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Dosen Luar Biasa
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">0</div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>

          <div class="card !gap-y-10 min-h-[200px]">
            <div class="flex items-center justify-between">
              <div>
                <p class="overflow-hidden text-grey whitespace-nowrap">
                  Karyawan
                </p>
                <div class="text-[32px] font-bold text-dark mt-[6px]">0</div>
              </div>
              <div>
                <button>
                  <a href="#">
                    <img
                      src="../assets/img/ic_tambah.png"
                      alt=""
                      class="pl-[10px] pt-[10px] w-[36px] h-[36px]"
                    />
                  </a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pt-[50px]">
        <div class="grid md:grid-cols-2 gap-11">
          <!-- Documents -->
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">Documents</div>
                  <p class="text-grey">Standard procedure</p>
                </div>
              </div>
            </div>
            <div class="card md:min-h-[468px]">
              <div class="m-auto text-center">
                <!-- content here -->
              </div>
            </div>
          </div>

          <!-- History -->
          <div>
            <!-- Section Header -->
            <div class="mb-[30px]">
              <div class="flex items-center justify-between gap-6">
                <div>
                  <div class="text-xl font-medium text-dark">History</div>
                  <p class="text-grey">Track the flow</p>
                </div>
              </div>
            </div>
            <div class="card min-h-[468px]">
              <div class="m-auto text-center">
                <!-- content here -->
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
