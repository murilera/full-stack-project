import { TweetForm } from './components/layout/TweetForm'
import { TweetItem } from './components/layout/TweetItem'

export const App = () => {
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
