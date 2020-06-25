export const state = () => ({
    page: 0,
    data: []
})
  
export const mutations = {
    setData (state, data) {
        state.data = data;
    },
    setPage (state, page) {
        state.page = page;
        
        localStorage.setItem('page', page);
    }
}