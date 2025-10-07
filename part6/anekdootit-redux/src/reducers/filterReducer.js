import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

// const filterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'FILTER':
//       return action.payload
//     default:
//       return state
//   }
// }

// export const setFilter = (string) => {
//   return { type: 'FILTER', payload: string.toLowerCase() }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(_, action) {
      return action.payload
    },
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
