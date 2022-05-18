const mongoose = require('mongoose')

const commentSchema = mongoose.Schema(
  {
    fakeUser: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'FakeUser',
    },
    comment: {
      type: String,
      required: true,
    },
    upvote: {
      type: Number,
      required: true,
    },
    openReplies: {
      type: Boolean,
      require: true,
      default: false,
    },
    replies: [
      {
        reply: String,
        createdAt: { type: Date, default: Date.now },
        fakeUser: { type: mongoose.Schema.ObjectId, ref: 'FakeUser' },
      },
    ],
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Comment', commentSchema)
