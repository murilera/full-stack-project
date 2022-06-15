import { useState } from 'react'
import { TweetForm } from './components/home/TweetForm'
import { TweetItem } from './components/home/TweetItem'
import { Login } from './components/login/login'

export const App = () => {
  const [user, setUser] = useState()

  if (!user) return <Login signInUser={setUser} />

  return (
    <div>
      <TweetForm />
      <TweetItem
        name='Elon Musk'
        username='elonmusk'
        avatar='/src/images/avatar.png'
      >
        Let's make Twitter maximum fun
      </TweetItem>
      <TweetItem
        name='Elon Musk'
        username='elonmusk'
        avatar='/src/images/avatar.png'
      >
        Hello folks
      </TweetItem>
    </div>
  )
}
