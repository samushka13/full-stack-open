import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAll, update } from './requests' 

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotificationDispatch } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const queryKey = ['anecdotes']

  const updateMutation = useMutation({
    mutationFn: update,
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey })
      dispatch({ type: 'VOTED', payload: updatedAnecdote.content })
    },
  })

  const handleVote = (anecdote) => {
    updateMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const result = useQuery({
    queryKey,
    queryFn: getAll,
    refetchOnWindowFocus: false,
    retry: 2
  })

  const anecdotes = result.data

  if (result.isPending) {
    return <div>Fetching anecdotes...</div>
  }

  if (result.isError) {
    return <div>The anecdote service is unavailable due to server problems</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
