export default {
  state: () => {
    return {
      user_name: null,
    }
  },
  mutations : {
    setName(state, payload){ state.user_name = payload },
  },
  getters : {
    getUserName: s => s.user_name,
  }
}
