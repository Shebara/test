export const state = () => ({
    page: 1
})
  
export const mutations = {
    setPage (state, page) {
        state.page = page;
    }
}