import React, { FormEvent } from "react";
import { useState } from "react";
// import BreakiWord from "@/Components/BreakiWord";
import BreakiWord from "Components/BreakiWord";

function App() {
  const [name, setName] = useState<string>("Breaking");
  const [lastName, setLastName] = useState<string>("Bad");
  const [breakify, setBreakify] = useState<boolean>(false);

  const handleChangeName = (value: string) => {
    setBreakify(false);
    setName(value);
  };

  const handleChangeLastName = (value: string) => {
    setBreakify(false);
    setLastName(value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBreakify(true);
  };

  const handleFormReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setName("");
    setLastName("");
    setBreakify(false);
  };

  return (
    <main className="bg-[#212121] flex h-screen justify-center items-center">
      <div className="min-w-[600px]">
        <div className="text-white text-9xl mb-10 text-center">
          <BreakiWord word={name} show={breakify} />
          <BreakiWord word={lastName} show={breakify} />
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
                value={name}
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
                value={lastName}
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
  );
}

export default App;
