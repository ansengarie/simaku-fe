<template>
  <!-- Sidebar -->
  <div
    class="hidden lg:block fixed lg:max-w-[295px] w-full overflow-y-auto h-full bg-white z-[999]"
    id="sidebarHRIS"
  >
    <div class="px-6 py-[50px] gap-y-[50px] flex flex-col">
      <div class="flex flex-col gap-4">
        <a href="#" class="flex justify-center">
          <img src="~/assets/img/logo-simaku-index.png" alt="" />
        </a>
        <div class="pt-[43px] text-sm text-grey">Daily Use</div>

        <!-- Overview -->
        <nuxt-link
          to="/"
          exact
          class="nav-link"
          :class="{ active: isActive('/') }"
        >
          <img
            src="~/assets/img/fi_grid.png"
            alt="Employees"
            class="w-5 h-5 mr-2"
          />
          Overview
        </nuxt-link>

        <!-- Manage Pegawai -->
        <a
          href="#"
          class="nav-link"
          @click="toggleDropdown('managePegawai')"
          :class="{
            active:
              isActive('/manage-pegawai/dosen-tetap') ||
              isActive('/manage-pegawai/dosen-lb') ||
              isActive('/manage-pegawai/karyawan'),
          }"
        >
          <img
            src="~/assets/img/fi_users.png"
            alt="Employees"
            class="w-5 h-5"
          />
          <span>Manage Pegawai</span>
          <img
            v-if="isDropdownOpen['managePegawai']"
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
        <div v-if="isDropdownOpen['managePegawai']" class="ml-7">
          <!-- Dropdown content here -->
          <nuxt-link to="/manage-pegawai/dosen-tetap" class="ml-5 nav-link">
            Dosen Tetap
          </nuxt-link>
          <nuxt-link to="/manage-pegawai/dosen-lb" class="ml-5 nav-link">
            Dosen Luar Biasa
          </nuxt-link>
          <nuxt-link to="/manage-pegawai/karyawan" class="ml-5 nav-link">
            Karyawan
          </nuxt-link>
        </div>

        <!-- Gaji -->
        <a
          href="#"
          class="nav-link"
          @click="toggleDropdown('gaji')"
          :class="{
            active:
              isActive('/gaji/dosen-tetap') ||
              isActive('/gaji/dosen-lb') ||
              isActive('/gaji/karyawan'),
          }"
        >
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
          <nuxt-link to="/gaji/dosen-tetap" class="ml-5 nav-link">
            Dosen Tetap
          </nuxt-link>
          <nuxt-link to="/gaji/dosen-lb" class="ml-5 nav-link">
            Dosen Luar Biasa
          </nuxt-link>
          <nuxt-link to="/gaji/karyawan" class="ml-5 nav-link">
            Karyawan
          </nuxt-link>
        </div>

        <!-- Laporan -->
        <a
          href="#"
          class="nav-link"
          @click="toggleDropdown('laporan')"
          :class="{
            active:
              isActive('/laporan/rekapitulasi-pendapatan') ||
              isActive('/laporan/pendapatan-bersih') ||
              isActive('/laporan/laporan-pajak') ||
              isActive('/laporan/laporan-potongan') ||
              isActive('/laporan/rekapitulasi-bank'),
          }"
        >
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
          <nuxt-link
            to="/laporan/rekapitulasi-pendapatan"
            class="ml-5 nav-link"
          >
            Rekapitulasi Pendapatan
          </nuxt-link>
          <nuxt-link to="/laporan/pendapatan-bersih" class="ml-5 nav-link">
            Pendapatan Bersih
          </nuxt-link>
          <nuxt-link to="/laporan/laporan-pajak" class="ml-5 nav-link">
            Laporan Pajak
          </nuxt-link>
          <nuxt-link to="/laporan/laporan-potongan" class="ml-5 nav-link">
            Laporan Potongan
          </nuxt-link>
          <nuxt-link to="/laporan/rekapitulasi-bank" class="ml-5 nav-link">
            Rekapitulasi Bank
          </nuxt-link>
        </div>

        <!-- Logout -->
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
import LogoutConfirmationModal from '~/components/logout-confirmation-modal.vue'

export default {
  components: {
    LogoutConfirmationModal,
  },
  name: 'Sidebar',
  data() {
    return {
      isDropdownOpen: {
        managePegawai: false,
        gaji: false,
        laporan: false,
      },
      showModal: false,
    }
  },
  methods: {
    isActive(url) {
      return this.$route.path === url
    },
    toggleDropdown(category) {
      this.$set(this.isDropdownOpen, category, !this.isDropdownOpen[category])
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
