const { PubSub } = require('apollo-server')
const FakeUser = require('./models/fakeUserModel')
const Comment = require('./models/commentModel')

const pubsub = new PubSub()
const COMMENT_ADDED = 'COMMENT_ADDED'
const UPVOTE_COMMENT_ADDED = 'UPVOTE_COMMENT_ADDED'
const REPLY_ADDED = 'REPLY_ADDED'

module.exports = {
  Query: {
    meFake: (root, args, ctx) => {
      return new Promise((resolve, reject) => {
        FakeUser.random(async (err, fakeUser) => {
          resolve(fakeUser)
        })
      })
    },
    getComments: async (root, args, ctx) => {
      const comments = await Comment.find({})
        .sort('-createdAt')
        .populate('fakeUser')
        .populate('replies.fakeUser')
      return comments
    },
  },
  Mutation: {
    createComment: async (root, args, ctx) => {
      const newComment = await new Comment({
        comment: args.comment,
        fakeUser: args.fakeUserId,
        upvote: 0,
      }).save()
      const commentAdded = await Comment.populate(newComment, 'fakeUser')
      pubsub.publish(COMMENT_ADDED, { commentAdded })
      return commentAdded
    },
    upvoteComment: async (root, args, ctx) => {
      let commentInfo = await Comment.findOne({ _id: args.commentId })
      let upvoteCount = 0
      if (!Number.isInteger(commentInfo.upvote)) {
        upvoteCount = 0
      } else {
        upvoteCount = commentInfo.upvote + 1
      }
      let commentUpdated = await Comment.findOneAndUpdate(
        { _id: args.commentId },
        { upvote: upvoteCount },
        { new: true }
      )
        .populate('fakeUser')
        .populate('replies.fakeUser')
      pubsub.publish(UPVOTE_COMMENT_ADDED, { commentUpdated })
      return commentUpdated
    },
    createReply: async (root, args, ctx) => {
      console.log('I am here')
      const newReply = { reply: args.reply, fakeUser: args.fakeUserId }
      const commentUpdated = await Comment.findOneAndUpdate(
        { _id: args.commentId },
        { $push: { replies: newReply } },
        { new: true }
      )
        .populate('fakeUser')
        .populate('replies.fakeUser')
      pubsub.publish(REPLY_ADDED, { commentUpdated })
      return commentUpdated
    },
  },
  Subscription: {
    upvoteCommentAdd: {
      subscribe: () => pubsub.asyncIterator(UPVOTE_COMMENT_ADDED),
      resolve: (payload) => {
        return payload.commentUpdated
      },
    },
    replyAdded: {
      subscribe: () => pubsub.asyncIterator(REPLY_ADDED),
      resolve: (payload) => {
        return payload.commentUpdated
      },
    },
    commentAdded: {
      subscribe: () => pubsub.asyncIterator(COMMENT_ADDED),
    },
  },
}
