export default (state) => {
  return {
    messages: state.messages,
    loading: state.loading.models.messages
  }
}