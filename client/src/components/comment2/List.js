import React, { useState, useEffect, useContext } from 'react'
import { Subscription } from 'react-apollo'
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now'

import { useClient } from '../../client'
import Context from '../../context'

import NewFormReply from './NewFormReply'

import { UPVOTE_COMMENT_MUTATION } from '../../graphql/mutations'
import { GET_COMMENTS_QUERY } from '../../graphql/queries'
import {
  UPVOTE_COMMENT_ADDED_SUBSCRIPTION,
  REPLY_COMMENT_ADDED_SUBSCRIPTION,
} from '../../graphql/subscriptions'

const List = () => {
  const client = useClient()
  const [comments, setComments] = useState([])
  const { state, dispatch } = useContext(Context)
  const [partToggle, setPartToggle] = useState(false)

  const getList = async () => {
    const { getComments } = await client.request(GET_COMMENTS_QUERY)
    dispatch({ type: 'GET_COMMENTS', payload: getComments })
  }

  const onAddPartSelect = (i) => {
    const updatedToggle = !partToggle
    setPartToggle(updatedToggle)
    const updatedData = comments.map((item, idx) => {
      if (idx === i) {
        return {
          ...item,
          openReplies: updatedToggle,
        }
      }
      return item
    })
    setComments(updatedData)
  }

  useEffect(() => {
    setComments(state.comments)
  }, [state.comments])

  useEffect(() => {
    getList()
  }, [])

  const upVoteAction = async (commentId) => {
    const variables = { commentId: commentId }
    await client.request(UPVOTE_COMMENT_MUTATION, variables)
  }

  if (!comments || comments.length === 0) {
    return <div>There are not comments</div>
  }

  return (
    <div className='py-2 px-4 mt-8 mb-12'>
      {comments &&
        comments.map((comment, index) => (
          <div key={comment._id} className='flex space-x-2'>
            <img
              src={comment.fakeUser.avatar}
              alt='Profile'
              className='w-9 h-9 rounded-full'
            />
            <div>
              <div className=' p-2 rounded-2xl text-sm'>
                <div className='flex'>
                  <span className='font-semibold block'>
                    {comment.fakeUser.name}
                  </span>
                  <span className='pl-1 pr-1'>∙</span>
                  {distanceInWordsToNow(Number(comment.createdAt))} ago
                </div>
                <span>{comment.comment}</span>
              </div>
              <div className='p-2 text-xs text-gray-500 dark:text-dark-txt'>
                <span
                  className='font-semibold cursor-pointer'
                  onClick={() => upVoteAction(comment._id)}
                >
                  Upvote <span>{comment.upvote}</span>
                </span>
                <span>.</span>
                <span
                  className='font-semibold cursor-pointer'
                  onClick={() => onAddPartSelect(index)}
                >
                  Reply
                </span>
              </div>

              {comment.openReplies ? (
                <NewFormReply fakeUser={state.fakeUser} comment={comment} />
              ) : null}

              {comment.replies &&
                comment.replies.map((reply) => (
                  <div key={reply._id} className='flex space-x-2'>
                    <img
                      src={reply.fakeUser.avatar}
                      alt='Profile'
                      className='w-9 h-9 rounded-full'
                    />
                    <div>
                      <div className=' p-2 rounded-2xl text-sm'>
                        <div className='flex'>
                          <span className='font-semibold block'>
                            {reply.fakeUser.name}
                          </span>
                          <span className='pl-1 pr-1'>∙</span>
                          {distanceInWordsToNow(Number(reply.createdAt))} ago
                        </div>
                        <span>{reply.reply}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      <Subscription
        subscription={UPVOTE_COMMENT_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          console.log(subscriptionData)
          const upvoteCommentAdd = subscriptionData.data.upvoteCommentAdd
          dispatch({ type: 'UPVOTE_COMMENT_ADDED', payload: upvoteCommentAdd })
        }}
      />
      <Subscription
        subscription={REPLY_COMMENT_ADDED_SUBSCRIPTION}
        onSubscriptionData={({ subscriptionData }) => {
          const replyAdded = subscriptionData.data.replyAdded
          dispatch({ type: 'REPLY_COMMENT_ADDED', payload: replyAdded })
        }}
      />
    </div>
  )
}

export default List
