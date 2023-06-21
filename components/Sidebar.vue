<template>
  <!-- Sidebar -->
  <div class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]" id="sidebarHRIS">
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex flex-col gap-4">
        <div class="text-sm text-grey">Daily Use</div>
        <a href="index.html" class="nav-link active">
          <img src="~/assets/img/fi_grid.png" alt="Employees" class="w-5 h-5 mr-2" />
          Overview
        </a>
        <a href="#" class="nav-link" @click="toggleDropdown">
          <img src="~/assets/img/fi_users.png" alt="Employees" class="w-5 h-5 mr-2" />
          Manage User
          <!-- <img src="~/assets/img/greater-than.png" alt="Employees" class="ml-5" /> -->
          <img v-if="isDropdownOpen" src="~/assets/img/ic_down.png" alt="Employees" class="ml-5" />
          <img v-else src="~/assets/img/greater-than.png" alt="Employees" class="ml-5" />
        </a>
        <div v-if="isDropdownOpen" class="ml-7">
        <!-- Dropdown content here -->
        <a href="#" class="ml-5 nav-link">
          Dosen Tetap
        </a>
        <a href="#" class="ml-5 nav-link">
          Dosen Luar Biasa
        </a>
        <a href="#" class="ml-5 nav-link">
          Karyawan
        </a>
      </div>
      <a href="#" class="nav-link">
          <img src="~/assets/img/fi_briefcase.png" alt="Employees" class="w-5 h-5 mr-2" />
          Kehadiran
        </a>
        <a href="#" class="nav-link">
          <img src="~/assets/img/tabler_report-money.png" alt="Employees" class="w-5 h-5 mr-2" />
          Gaji
        </a>
        <a href="#" class="nav-link">
          <img src="~/assets/img/flag.png" alt="Employees" class="w-5 h-5 mr-2" />
          Laporan
        </a>
        <a href="#" class="nav-link">
          <img src="~/assets/img/fi_log-out.png" alt="Employees" class="w-5 h-5 mr-2" />
          <p class="text-red-700">
            Logout
          </p>
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
      isDropdownOpen: false,
    };
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
  },
}
</script>

<style>
/* Gaya untuk sidebar */
</style>
