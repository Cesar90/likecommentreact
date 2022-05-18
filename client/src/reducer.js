export default function reducer(state, { type, payload }) {
  switch (type) {
    case 'FAKE_USER':
      return {
        ...state,
        fakeUser: payload,
      }
    case 'GET_COMMENTS':
      return {
        ...state,
        comments: payload,
      }

    case 'CREATE_COMMENT':
      const newComment = payload
      const prevComments = state.comments.filter(
        (comment) => comment._id !== newComment._id
      )
      return {
        ...state,
        comments: [...prevComments, newComment],
      }
    case 'UPVOTE_COMMENT_ADDED':
      const commentInfo = payload
      const updatedComments = state.comments.map((comment) =>
        comment._id === commentInfo._id ? commentInfo : comment
      )
      return {
        ...state,
        comments: updatedComments,
      }
    case 'REPLY_COMMENT_ADDED':
      const commentInfoData = payload
      const updatedCommentsData = state.comments.map((comment) =>
        comment._id === commentInfoData._id ? commentInfoData : comment
      )
      return {
        ...state,
        comments: updatedCommentsData,
      }
    default:
      return state
  }
}
