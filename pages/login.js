import { useState, useEffect, useContext } from "react";
import { magic } from "@/lib/magic";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/router";
import SocialButton from "@/components/SocialButton";
import { FcGoogle } from "react-icons/fc";
import { FaGithub, FaDiscord } from "react-icons/fa";

const Login = () => {
  const [user, setUser] = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    user?.issuer && router.push("/profile");
  }, [user]);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const didToken = await magic.auth.loginWithMagicLink({
        email: email,
        redirectURI: new URL("/callback", window.location.origin).href,
      });

      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + didToken,
        },
      });

      if (res.status === 200) {
        const userMetadata = await magic.user.getMetadata();
        await setUser(userMetadata);
      }
    } catch (error) {
      setDisabled(false);
      console.error(error);
    }
  };

  return (
    <div className="mt-32 flex justify-center">
      <div className="flex flex-col items-center w-11/12">
        <h1 className="text-white font-bold text-3xl">Wallet Not Connected</h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center w-full"
        >
          <div className="mt-6 flex flex-col items-center w-1/3">
            <label className="pb-4 text-2xl">Electronic Mail Address:</label>
            <input
              className="focus:outline-none bg-slate-700 rounded-xl p-2 mx-2 w-full border-gray-900 border-4"
              type="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={disabled}
            className="w-40 flex justify-center bg-gray-800 border-gray-700 text-white hover:bg-gray-700 active:bg-gray-500 border rounded-lg font-semibold text-xl mt-6 px-5 py-2.5"
          >
            Submit
          </button>
        </form>
        <p className="mt-8 font-semibold text-3xl">Sign in with:</p>
        <div className="flex">
          <SocialButton provider="google">
            <FcGoogle />
          </SocialButton>
          <SocialButton provider="github">
            <FaGithub />
          </SocialButton>
          <SocialButton provider="discord">
            <FaDiscord />
          </SocialButton>
        </div>
      </div>
    </div>
  );
};

export default Login;
