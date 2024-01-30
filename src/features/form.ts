import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'store'
import Utils from 'Utils'

const { defaultForm } = Utils.Constants

export interface FormState {
  name: string
  lastName: string
  breakify: boolean
  status: 'idle' | 'loading'
}

const initialState: FormState = {
  name: defaultForm.name,
  lastName: defaultForm.lastName,
  breakify: false,
  status: 'idle',
}

export const breakifyAsync = createAsyncThunk(
  'form/fetchCount',
  async (breakify: boolean) => {
    const response = await new Promise<{ data: boolean }>((resolve) =>
      setTimeout(() => resolve({ data: breakify }), 500)
    )
    return response.data
  }
)

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },
    changeLastName: (state, action: PayloadAction<string>) => {
      state.lastName = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(breakifyAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(breakifyAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.breakify = action.payload
      })
  },
})

export const { changeName, changeLastName } = formSlice.actions

export const selectForm = (state: RootState) => state.form

export default formSlice.reducer
