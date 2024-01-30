import React, { FormEvent } from 'react'
import BreakiWord from 'Components/BreakiWord'
import { useAppSelector, useAppDispatch } from 'hooks'
import {
  selectForm,
  changeName,
  changeLastName,
  breakifyAsync,
} from 'features/form'
import Utils from 'Utils'

const { defaultForm } = Utils.Constants

function App() {
  const form = useAppSelector(selectForm)

  const dispatch = useAppDispatch()

  const handleChangeName = (value: string) => {
    dispatch(changeName(value))
    if (form.breakify) {
      dispatch(breakifyAsync(false))
    }
  }

  const handleChangeLastName = (value: string) => {
    dispatch(changeLastName(value))
    if (form.breakify) {
      dispatch(breakifyAsync(false))
    }
  }

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!form.breakify) {
      dispatch(breakifyAsync(true))
    }
  }

  const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(changeName(defaultForm.name))
    dispatch(changeLastName(defaultForm.lastName))
    if (form.breakify) {
      dispatch(breakifyAsync(false))
    }
  }

  return (
    <main className="bg-[#212121] flex h-screen justify-center items-center">
      {form.status === 'loading' && (
        <div className="absolute bg-black bg-opacity-50 text-2xl flex top-0 left-0 w-full h-screen justify-center items-center text-white font-black z-10">
          Loading...
        </div>
      )}
      <div className="min-w-[600px]">
        <div className="text-white text-9xl mb-10 text-center">
          <BreakiWord word={form.name} show={form.breakify} />
          <BreakiWord word={form.lastName} show={form.breakify} />
        </div>
        <form
          className="flex flex-col gap-5"
          onSubmit={handleFormSubmit}
          onReset={handleFormReset}
        >
          <div className="flex gap-10">
            <div className="mb-4 flex-1">
              <label
                className="block text-[#cacaca] text-sm font-bold mb-2"
                htmlFor="firstName"
              >
                First Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="firstName"
                type="text"
                placeholder="John"
                onChange={(e) => handleChangeName(e.target.value)}
                value={form.name}
              />
            </div>
            <div className="mb-4 flex-1">
              <label
                className="block text-[#cacaca] text-sm font-bold mb-2"
                htmlFor="lastName"
              >
                Last Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="lastName"
                type="text"
                placeholder="Doe"
                onChange={(e) => handleChangeLastName(e.target.value)}
                value={form.lastName}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#044730] rounded-md text-white p-2"
          >
            Breakify
          </button>
          <button type="reset" className="bg-[#333] rounded-md text-white p-2">
            Reset
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
