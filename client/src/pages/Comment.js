import React from 'react'
import '../assets/style.css'
import Form from '../components/comment2/Form'
import List from '../components/comment2/List'

const Comment = () => {
  return (
    <div className='container mx-auto bg-gray-50'>
      <div className='max-w-2xl mx-auto mt-12'>
        <div className='flex flex-wrap mt-12 '>
          <div className='w-full'>
            <div className='flex flex-wrap mt-12'>
              <h3 className='mb-6 text-2xl font-bold text-gray-900 '>
                Comments
              </h3>
            </div>
          </div>
        </div>
        <div className='flex flex-wrap mb-12'>
          <div className='w-full'>
            <Form />

            <div className='py-2 px-4 mt-8'>
              <div className='border border-gray-200 dark:border-dark-third border-l-0 border-r-0 border-t-0 py-1'></div>
            </div>

            <List />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
