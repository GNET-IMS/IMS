export default (state) => {
  return {
    announcements: state.announcements,
    loading: state.loading.models.announcements,
    userId: state.auth.userId,
    user: state.auth.user
  }
}