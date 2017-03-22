export default state => {
    return {
        users: state.users,
        loading: state.loading.models.users
    }
}