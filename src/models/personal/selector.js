export default state => {
    return {
        personal: state.personal,
        userId: state.auth.userId,
        loading: state.loading.models.personal,
    }
}