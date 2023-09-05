<template>
  <section class="py-[50px] flex flex-col items-center justify-center px-4">
    <img src="~/assets/img/logo-fh.png" />
    <div class="text-[32px] font-semibold text-dark mt-[70px]">Sign In</div>
    <p class="mt-4 text-base leading-7 text-center mb-[50px] text-gre">
      Sistem Informasi Manajemen Keuangan
    </p>
    <form class="w-full card" @submit.prevent="submitLogin">
      <div class="form-group">
        <label for="" class="text-grey">Email Address</label>
        <input v-model="email" type="email" name="email" class="input-field" />
      </div>
      <div class="form-group">
        <label for="" class="text-grey">Password</label>
        <input
          v-model="password"
          type="password"
          name="password"
          class="input-field"
        />
      </div>
      <button
        @click="submitLogin"
        type="submit"
        class="w-full btn btn-primary mt-[14px]"
      >
        Sign In
      </button>
    </form>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      token: '',
    }
  },
  methods: {
    async submitLogin() {
      console.log('Login form submitted')
      console.log('Email:', this.email)
      console.log('Password:', this.password)
      try {
        const response = await this.$axios.post('/login', {
          email: this.email,
          password: this.password,
        })

        console.log('Login response:', response)

        this.token = response.data.data.access_token.split('|')[1]

        // Simpan token ke dalam localStorage atau Vuex store
        // Saat Anda menerima token dari respons API
        localStorage.setItem('token', this.token)
        console.log('Token:', this.token)

        // console.log(localStorage.getItem('token'), 'ini token')
        // Navigasi ke halaman index setelah login berhasil
        this.$router.push('/')

        // localStorage.setItem('token', this.token);
      } catch (error) {
        console.error('Login error:', error)
        window.alert('Login failed. Please check your email and password.')
      }
    },
  },
}
</script>
