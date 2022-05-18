const mongoose = require('mongoose')

const fakeUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

fakeUserSchema.statics.random = function (cb) {
  this.countDocuments(
    function (err, count) {
      if (err) return cb(err)
      var rand = Math.floor(Math.random() * count)
      this.findOne().skip(rand).exec(cb)
    }.bind(this)
  )
}

module.exports = mongoose.model('FakeUser', fakeUserSchema)
