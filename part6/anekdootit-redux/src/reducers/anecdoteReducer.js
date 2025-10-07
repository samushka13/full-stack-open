import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return { content: anecdote, id: getId(), votes: 0 }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE':
//       return state.map((s) => s.id === action.payload.id ? { ...s, votes: s.votes + 1 } : s)
//     case 'ADD':
//       return state.concat(action.payload)
//     default: return state
//   }
// }

// export const addVote = (id) => {
//   return { type: 'VOTE', payload: { id } }
// }

// export const addAnecdote = (content) => {
//   return { type: 'ADD', payload: { content, id: getId(), votes: 0 } }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      return state.map((s) => s.id === action.payload.id ? action.payload : s)
    },
    createAnecdote(state, action) {
      return state.concat(action.payload)
    },
    setAnecdotes(_, action) {
      return action.payload
    }
  },
})

export const { addVote, createAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.add({ content, votes: 0 })
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  const id = anecdote.id
  const anecdoteToUpdate = { content: anecdote.content, votes: anecdote.votes + 1 }

  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(id, anecdoteToUpdate)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer
