const { gql } = require('apollo-server')

module.exports = gql`
  type Reply {
    _id: ID
    reply: String
    fakeUser: FakeUser
    createdAt: String
  }

  type FakeUser {
    _id: ID
    name: String
    avatar: String
  }

  type Comment {
    _id: ID
    comment: String
    createdAt: String
    upvote: Float
    fakeUser: FakeUser
    openReplies: Boolean
    replies: [Reply]
  }

  type Query {
    meFake: FakeUser
    getComments: [Comment!]
  }

  type Mutation {
    createComment(fakeUserId: ID!, comment: String!): Comment
    upvoteComment(commentId: ID!): Comment
    createReply(fakeUserId: ID!, commentId: ID!, reply: String!): Comment
  }

  type Subscription {
    upvoteCommentAdd: Comment
    commentAdded: Comment
    replyAdded: Comment
  }
`
