// authenticated.js

let timer

export default function ({ route, redirect }) {
  // Hapus timer lama jika ada
  if (timer) {
    clearTimeout(timer)
  }

  if (localStorage.getItem('token') && route.path !== '/auth/login') {
    // Set timer untuk menghapus token dalam 5 menit
    timer = setTimeout(() => {
      localStorage.removeItem('token')
      return redirect('/auth/login')
    }, 1800000) // 60000 ms = 5 menit
  } else if (!localStorage.getItem('token') && route.path !== '/auth/login') {
    return redirect('/auth/login')
  }
}
