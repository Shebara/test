export const state = () => ({
    token: '',
    user: {}
})
  
export const mutations = {
    setUser (state, token, user) {
        state.token = token;
        state.user = user;
    }
}