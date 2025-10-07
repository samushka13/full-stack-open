import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes }) => anecdotes)
  const filter = useSelector(({ filter }) => filter.toLowerCase())

  const filteredAnecdotes = anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
  const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)

  const vote = (id) => {
    const match = anecdotes.find((a) => id === a.id)

    if (match) {
      dispatch(voteAnecdote(match))
      dispatch(showNotification({
        text: `You voted for "${match.content}"!`,
        durationInSecs: 3
      }))
    }
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList