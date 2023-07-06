<template>
  <!-- Sidebar -->
  <div
    class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex flex-col gap-4">
        <a href="#" class="flex justify-center">
          <img src="../assets/img/logo-simaku-index.png" alt="" />
        </a>
        <div class="pt-[43px] text-sm text-grey">Daily Use</div>
        <a href="\" class="nav-link active">
          <img
            src="~/assets/img/fi_grid.png"
            alt="Employees"
            class="w-5 h-5 mr-2"
          />
          Overview
        </a>
        <a href="#" class="nav-link" @click="toggleDropdown('manageUser')">
          <img
            src="~/assets/img/fi_users.png"
            alt="Employees"
            class="w-5 h-5"
          />
          <span>Manage User</span>
          <img
            v-if="isDropdownOpen['manageUser']"
            src="~/assets/img/ic_down.png"
            alt="Employees"
            class="dropdown-icon"
          />
          <img
            v-else
            src="~/assets/img/greater-than.png"
            alt="Employees"
            class="dropdown-icon"
          />
        </a>
        <div v-if="isDropdownOpen['manageUser']" class="ml-7">
          <!-- Dropdown content here -->
          <a href="\manage\dosen_tetap\dosen_tetap" class="ml-5 nav-link">
            Dosen Tetap
          </a>
          <a href="\manage\dosen_lb\dosen_lb" class="ml-5 nav-link">
            Dosen Luar Biasa
          </a>
          <a href="\manage\karyawan\karyawan" class="ml-5 nav-link">
            Karyawan
          </a>
        </div>
        <a href="#" class="nav-link" @click="toggleDropdown('gaji')">
          <img
            src="~/assets/img/tabler_report-money.png"
            alt="Employees"
            class="w-5 h-5"
          />
          <span>Gaji</span>
          <img
            v-if="isDropdownOpen['gaji']"
            src="~/assets/img/ic_down.png"
            alt="Employees"
            class="dropdown-icon"
          />
          <img
            v-else
            src="~/assets/img/greater-than.png"
            alt="Employees"
            class="dropdown-icon"
          />
        </a>
        <div v-if="isDropdownOpen['gaji']" class="ml-7">
          <!-- Dropdown content here -->
          <a href="#" class="ml-5 nav-link"> Dosen Tetap </a>
          <a href="#" class="ml-5 nav-link"> Dosen Luar Biasa </a>
          <a href="#" class="ml-5 nav-link"> Karyawan </a>
        </div>
        <a href="#" class="nav-link" @click="toggleDropdown('laporan')">
          <img src="~/assets/img/flag.png" alt="Employees" class="w-5 h-5" />
          <span>Laporan</span>
          <img
            v-if="isDropdownOpen['laporan']"
            src="~/assets/img/ic_down.png"
            alt="Employees"
            class="dropdown-icon"
          />
          <img
            v-else
            src="~/assets/img/greater-than.png"
            alt="Employees"
            class="dropdown-icon"
          />
        </a>
        <div v-if="isDropdownOpen['laporan']" class="ml-7">
          <!-- Dropdown content here -->
          <a href="#" class="ml-5 nav-link"> Rekapitulasi </a>
          <a href="#" class="ml-5 nav-link"> Pendapatan Bersih </a>
          <a href="#" class="ml-5 nav-link"> Laporan Pajak </a>
          <a href="#" class="ml-5 nav-link"> Laporan Potongan </a>
          <a href="#" class="ml-5 nav-link"> Rekapitulasi Bank </a>
        </div>
        <button class="nav-link" @click="showLogoutModal">
          <img
            src="~/assets/img/fi_log-out.png"
            alt="Employees"
            class="w-5 h-5 mr-2"
          />
          <p class="text-red-700">Logout</p>
        </button>
        <LogoutConfirmationModal
          v-if="showModal"
          @cancel="cancelLogout"
          @confirm="confirmLogout"
        />
      </div>
    </div>
  </div>
</template>

<script>
import LogoutConfirmationModal from '@/components/LogoutConfirmationModal.vue'

export default {
  components: {
    LogoutConfirmationModal,
  },
  name: 'Sidebar',
  data() {
    return {
      isDropdownOpen: {
        manageUser: false,
        gaji: false,
        laporan: false,
      },
      showModal: false,
    }
  },
  methods: {
    toggleDropdown(dropdownName) {
      this.isDropdownOpen[dropdownName] = !this.isDropdownOpen[dropdownName]
    },
    showLogoutModal() {
      this.showModal = true
    },
    cancelLogout() {
      this.showModal = false
    },
    confirmLogout() {
      // Logika untuk melakukan logout, misalnya menghapus token atau data sesi
      this.$router.push('/login')
      // Setelah logout, Anda dapat mengarahkan pengguna kembali ke halaman login atau halaman lain yang sesuai.
      this.showModal = false
      console.log('Logout berhasil!')
    },
  },
}
</script>

<style scoped>
.nav-link {
  display: flex;
  align-items: center;
}

.nav-link img {
  margin-right: 0.5rem;
}

.nav-link .dropdown-icon {
  margin-left: auto;
}
</style>
