export default (to, from, next) => {
  if (localStorage.getItem('user') != null && localStorage.getItem('user').length > 0) {
    const user = localStorage.getItem('user')
    console.log(user)
    if (user.isAdmin) {
      next()
    } else {
      next('/auth/login')
    }
  } else {
    localStorage.removeItem('user')
    next('/auth/login')
  }
}
