export default ({store, redirect}) => {
  if (!store.getters.getUserName) return redirect('/login')
}
