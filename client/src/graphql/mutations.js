export const CREATE_COMMENT_MUTATION2 = `
  mutation($fakeUserId: ID!, $comment: String!) {
    createComment(fakeUserId: $fakeUserId, comment: $comment) {
      _id
      comment
      createdAt
      upvote
      fakeUser{
        _id
        name
        avatar
      }
    }
  }
`

export const UPVOTE_COMMENT_MUTATION = `
  mutation($commentId: ID!) {
    upvoteComment(commentId: $commentId) {
      _id
      comment
      createdAt
      upvote
      fakeUser{
        _id
        name
        avatar
      }
    }
  }
`

export const REPLY_COMMENT_MUTATION = `
  mutation($fakeUserId: ID!, $commentId: ID!, $reply: String!) {
    createReply(fakeUserId: $fakeUserId, commentId: $commentId, reply: $reply) {
      _id
      comment
      createdAt
      upvote
      fakeUser{
        _id
        name
        avatar
      }
    }
  }
`
