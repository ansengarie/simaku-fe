export default function ({ route, redirect }) {
  if (!localStorage.getItem('token') && route.path !== '/auth/login') {
    return redirect('/auth/login')
  }
}
