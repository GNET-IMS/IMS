export default (state) => {
  return {
    chat: state.chat,
    loading: state.loading.models.chat,
    userId: state.auth.userId,
    user: state.auth.user
  }
}