import { useMutation, useQueryClient } from '@tanstack/react-query'
import { add } from '../requests' 
import { useNotificationDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({
    mutationFn: add,
    onSuccess: (newAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (prev) => prev.concat(newAnecdote))
      dispatch({ type: 'ADDED', payload: newAnecdote.content })
    },
    onError: () => {
      dispatch({ type: 'ANECDOTE_LENGTH' })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
