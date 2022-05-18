import React, { useState } from 'react'

import { useClient } from '../../client'

import { REPLY_COMMENT_MUTATION } from '../../graphql/mutations'

const NewFormReply = ({ fakeUser, comment }) => {
  const client = useClient()
  const [newReply, setNewReply] = useState('')

  const handleNewTaskChange = (e) => {
    setNewReply(e.target.value)
  }

  const handleSubmitReply = async () => {
    const variables = {
      fakeUserId: fakeUser._id,
      commentId: comment._id,
      reply: newReply,
    }
    await client.request(REPLY_COMMENT_MUTATION, variables)
    setNewReply('')
  }

  return (
    <div className=''>
      <div className='flex space-x-2'>
        <img
          src={fakeUser.avatar}
          alt='Profile'
          className='w-9 h-9 rounded-full'
        />
        <input
          type='text'
          placeholder='What are you thoughts?'
          className='outline-none bg-transparent flex-1 dark:bg-dark-third '
          onChange={handleNewTaskChange}
          value={newReply}
        />
        <button
          className='transition duration-300 ease-in-out transform hover:-translate-y-1 block p-4 text-center text-xs text-white font-semibold leading-none bg-purple-500 hover:bg-purple-500 rounded'
          onClick={handleSubmitReply}
        >
          Comment
        </button>
      </div>
    </div>
  )
}

export default NewFormReply
