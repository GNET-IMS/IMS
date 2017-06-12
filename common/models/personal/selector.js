export default state => {
    return {
        personal: state.personal,
        user: state.auth.user,
        loading: state.loading.models.personal,
    }
}