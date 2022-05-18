import gql from 'graphql-tag'

export const COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription {
    commentAdded {
      _id
      comment
      createdAt
      upvote
      openReplies
      fakeUser {
        _id
        name
        avatar
      }
      replies {
        _id
        reply
        createdAt
        fakeUser {
          _id
          name
          avatar
        }
      }
    }
  }
`

export const UPVOTE_COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription {
    upvoteCommentAdd {
      _id
      comment
      createdAt
      upvote
      openReplies
      fakeUser {
        _id
        name
        avatar
      }
      replies {
        _id
        reply
        createdAt
        fakeUser {
          _id
          name
          avatar
        }
      }
    }
  }
`

export const REPLY_COMMENT_ADDED_SUBSCRIPTION = gql`
  subscription {
    replyAdded {
      _id
      comment
      createdAt
      upvote
      openReplies
      fakeUser {
        _id
        name
        avatar
      }
      replies {
        _id
        reply
        createdAt
        fakeUser {
          _id
          name
          avatar
        }
      }
    }
  }
`
