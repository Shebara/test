export const state = () => ({
    loggedIn: false,
    loaded: false,
})
  
export const mutations = {
    logIn (state) {
        state.loggedIn = true;

        localStorage.setItem('loggedIn', true);
    },
    logOut (state) {
        state.loggedIn = false;

        localStorage.setItem('loggedIn', false);
    },
    load (state) {
        state.loaded = true;
    }
}

export const actions = {
    async nuxtClientInit(store) {
        const loggedIn = localStorage.getItem('loggedIn');
        const token = localStorage.getItem('authToken');

        if (loggedIn && loggedIn == 'true') {
            store.commit('logIn');
        }
        if (token) {
            store.commit('auth/setToken', token);
        }

        store.commit('load');
    }
}
