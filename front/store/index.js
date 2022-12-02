const state = () => {
  return {
    user_name: null,
  }
}

const mutations = {
  setName(state, payload){ state.user_name = payload },
}

const getters = {
  getUserName: s => s.user_name,
}

export default {
  state: state(),
  mutations: mutations,
  getters: getters
}
