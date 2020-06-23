export const state = () => ({
    loggedIn: false
})
  
export const mutations = {
    logIn (state) {
        state.loggedIn = true;
    },
    logOut (state) {
        state.loggedIn = false;
    }
}

export const actions = {
    nuxtServerInit ({ commit }, { req }) {
        console.log(commit, req);
        if (req.session.user) {
            commit('user', req.session.user);
        }
    }
}