import { useState } from 'react'

const MAX_TWEET_CHAR = 140

export const TweetForm = () => {
  const [text, setText] = useState('')

  const changeText = (event) => {
    setText(event.target.value)
  }

  return (
    <div className='border-b border-silver p-4 space-y-6'>
      <div className='flex space-x-5'>
        <img src='/src/images/avatar.png' className='w-7' />
        <h1 className='font-bold text-xl'>Página Inicial</h1>
      </div>

      <form className='pl-12 text-lg flex flex-col'>
        <textarea
          className='bg-transparent outline-none disabled:opacity-50'
          name='text'
          value={text}
          onChange={changeText}
          placeholder='O que está acontecendo?'
        />

        <div className='flex justify-end items-center space-x-3'>
          <span className='text-sm'>
            <span>{text.length}</span> /{' '}
            <span className='text-birdBlue'>{MAX_TWEET_CHAR}</span>
          </span>
          <button
            className='bg-birdBlue px-4 py-2 rounded-full disabled:opacity-50'
            disabled={text.length > MAX_TWEET_CHAR ? true : false}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  )
}
