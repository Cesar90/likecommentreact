export const ME_FAKE_QUERY = `
{
  meFake {
    _id
		name
		avatar
  }
}
`

export const GET_COMMENTS_QUERY = `
  {
    getComments{
      _id
      comment
      createdAt
      upvote
      openReplies
      fakeUser{
        _id
        name
        avatar
      }
      replies{
        _id
        reply
        createdAt
        fakeUser{
          _id
          name
          avatar
        }
      }
    }
  }
`
