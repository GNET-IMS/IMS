export default (state) => {
  return {
    notices: state.notices,
    loading: state.loading.models.notices,
    userId: state.auth.userId,
    chat: state.chat,
    messagesLoading: state.loading.models.chat,
    user: state.auth.user,
    announcements: state.announcements,
    announcementsLoadind: state.loading.models.announcements,
  }
}