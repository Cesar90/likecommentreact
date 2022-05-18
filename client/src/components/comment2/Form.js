import React, { useState, useEffect, useContext } from 'react'
import { Subscription } from 'react-apollo'

import { useClient } from '../../client'
import Context from '../../context'

import { ME_FAKE_QUERY } from '../../graphql/queries'
import { CREATE_COMMENT_MUTATION2 } from '../../graphql/mutations'
import { COMMENT_ADDED_SUBSCRIPTION } from '../../graphql/subscriptions'

const Form = () => {
  const client = useClient()
  const [comment, setComment] = useState('')
  const { state, dispatch } = useContext(Context)
  const getFakeUser = async () => {
    const { meFake } = await client.request(ME_FAKE_QUERY)
    dispatch({ type: 'FAKE_USER', payload: meFake })
  }

  useEffect(() => {
    getFakeUser()
  }, [])

  const handleSubmitComment = async () => {
    const variables = { fakeUserId: state.fakeUser._id, comment }
    await client.request(CREATE_COMMENT_MUTATION2, variables)
    setComment('')
  }

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  if (!state.fakeUser) {
    return <div>Loading.....</div>
  }

  return (
    <div className='py-2 px-4'>
      <div className='flex space-x-2'>
        <img
          src={state.fakeUser.avatar}
          alt='Profile'
          className='w-9 h-9 rounded-full'
        />
        <input
          type='text'
          value={comment}
          placeholder='What are you thoughts?'
          onChange={handleChange}
          className='outline-none bg-transparent flex-1 dark:bg-dark-third '
        />
        <button
          className='transition duration-300 ease-in-out transform hover:-translate-y-1 block p-4 text-center text-xs text-white font-semibold leading-none bg-purple-500 hover:bg-purple-500 rounded'
          onClick={handleSubmitComment}
        >
          Comment
        </button>
      </div>
      <Subscription
        subscription={COMMENT_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          console.log(subscriptionData)
          const commentAdded = subscriptionData.data.commentAdded
          dispatch({ type: 'CREATE_COMMENT', payload: commentAdded })
        }}
      />
    </div>
  )
}

export default Form
