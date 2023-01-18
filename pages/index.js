import Head from "next/head";
import { useState } from "react";
import { magic } from "@/lib/magic";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const didToken = await magic.auth.loginWithMagicLink({ email: email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Head>
        <title>Magic Auth Practice App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="mt-32 flex justify-center ">
        {!user && (
          <div className="flex flex-col items-center w-11/12">
            <h1 className="text-white font-bold text-3xl">
              Wallet Not Connected
            </h1>
            <form
              onSubmit={login}
              className="flex flex-col items-center w-full"
            >
              <div className="mt-6 flex flex-col items-center w-1/3">
                <label className="pb-4 text-2xl">
                  Electronic Mail Address:
                </label>
                <input
                  className="focus:outline-none bg-slate-700 rounded-xl p-2 mx-2 w-full border-gray-900 border-4"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-8 px-5 py-2.5"
              >
                Sign In
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
