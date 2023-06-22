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
        <a href="index.html" class="nav-link active">
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
          <a href="#" class="ml-5 nav-link"> Dosen Tetap </a>
          <a href="#" class="ml-5 nav-link"> Dosen Luar Biasa </a>
          <a href="#" class="ml-5 nav-link"> Karyawan </a>
        </div>
        <a href="#" class="nav-link">
          <img
            src="~/assets/img/fi_briefcase.png"
            alt="Employees"
            class="w-5 h-5 mr-2"
          />
          Kehadiran
        </a>
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
          <img
            src="~/assets/img/flag.png"
            alt="Employees"
            class="w-5 h-5"
          />
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
        <a href="#" class="nav-link">
          <img
            src="~/assets/img/fi_log-out.png"
            alt="Employees"
            class="w-5 h-5 mr-2"
          />
          <p class="text-red-700">Logout</p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data() {
    return {
       isDropdownOpen: {
        manageUser: false,
        gaji: false,
        laporan: false,
      },
    }
  },
  methods: {
    toggleDropdown(dropdownName) {
      this.isDropdownOpen[dropdownName] = !this.isDropdownOpen[dropdownName];
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

