import React, { useState, useEffect, useContext } from "react";
import Logo2 from "../../assets/Logo2.png";
import AuthContext from "../Context/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [transition, setTransition] = useState(true);
  const [errorTransition, setErrorTransition] = useState(true);
  const [errorText, setErrorText] = useState("");
  const { handleLogin } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setTransition(false);
    }, 300);
  }, []);

  useEffect(() => {
    if (errorText) {
      setTimeout(() => {
        setErrorTransition(false);
      }, 300);
    }
  }, [errorText]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await handleLogin(email, password);
      if (success) {
        setErrorText(success);
      }
    } catch (err) {
      console.log(err);
      !err.response
        ? setErrorText("Network Error")
        : setErrorText(err.response.data.message);
    }
  };

  const handleResetError = () => {
    setErrorTransition(true);
    setTimeout(() => {
      setErrorText("");
    }, 300);
  };

  const transitionClassUp = transition
    ? "opacity-0 translate-y-[50px]"
    : "opacity-100";

  const transitionClassDown = transition
    ? "opacity-0 -translate-y-[50px]"
    : "opacity-100";

  return (
    <div className="w-full mx-auto my-12 h-full">
      <div className="h-[800px] w-[600px] my-[120px] mx-auto rounded-md bg-bg flex-col shadow-xl shadow-black">
        <div
          id="logo"
          className={`${transitionClassDown} w-full mx-auto relative transform transition-all duration-300 ease-in-out mt-2`}
        >
          <img src={Logo2} alt="Logo" className="w-[75px] mx-auto pt-12" />
        </div>
        <h2
          className={`mx-auto w-full text-4xl font-bold tracking-wide text-center p-8 my-2 text-galv-orange ${transitionClassDown} transition-all duration-300 ease-in-out`}
        >
          Login
        </h2>
        <p
          className={`text-center text-white italic tracking-wide ${transitionClassDown} transition-all duration-300 ease-in-out`}
        >
          Admissions Portal
        </p>
        <div className="border-t-[.5px] border-white/70 w-2/3 mx-auto mt-10 mb-4"></div>
        <div
          id="form"
          className={`mx-auto w-full relative ${transitionClassUp} duration-300 transition-all ease-in-out`}
        >
          <form
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
            className="flex-col flex w-full mx-auto text-center"
          >
            <div className="relative my-1 p-2">
              <input
                type="email"
                value={email}
                className={`my-4 py-2 px-2 text-white rounded-md focus:ring-2 focus:ring-accent focus:outline-none w-1/2 bg-secondary transition-all duration-150 ease-in-out ${
                  errorText !== ""
                    ? "border-2 border-red-400 outline-red-400"
                    : "border-none outline-none"
                }}`}
                onChange={handleEmailChange}
                autoComplete="none"
                autoFocus={true}
                onFocus={handleResetError}
              />
              <label
                className={`absolute left-[160px] transition-all duration-300 ease-in-out pointer-events-none ${
                  email
                    ? "text-accent text-md font-bold -top-3"
                    : "text-white/50 top-8"
                }`}
              >
                Email
              </label>
            </div>
            <div className="relative my-1 p-2">
              <input
                type="password"
                value={password}
                className={`my-4 py-2 px-2 text-white rounded-md focus:ring-2 focus:ring-accent focus:outline-none w-1/2 bg-secondary transition-all duration-150 ease-in-out ${
                  errorText !== ""
                    ? "border-2 border-red-400 outline-red-400"
                    : "border-none outline-none"
                }}`}
                onChange={handlePasswordChange}
                autoComplete="none"
                onFocus={handleResetError}
              />
              <label
                className={`absolute left-[160px] transition-all duration-300 ease-in-out pointer-events-none ${
                  password
                    ? "text-accent text-md font-bold -top-3"
                    : "text-white/50 top-8"
                }`}
              >
                Password
              </label>
            </div>
          </form>
          <div className="w-full items-center mx-auto text-center">
            <button
              onClick={handleSubmit}
              className="mx-auto py-2 px-10 bg-secondary text-white/50 text-lg rounded-md my-2 hover:scale-105 hover:text-accent hover:border-accent hover:border-[1px] transition-transform duration-300 ease-in-out"
            >
              Login
            </button>
          </div>
        </div>
        <div className="border-t-[.5px] border-white/70 w-2/3 mx-auto my-10"></div>

        <div id="error" className="text-red-400 text-center">
          {errorText !== "" && (
            <label
              className={`border-2 border-red-400 p-4 w-full bg-secondary rounded-lg transition-all duration-300 ease-in-out ${
                errorTransition ? "translate-y-[5px] opacity-0" : "opacity-100"
              }`}
            >
              {`Error: ${errorText}`}
            </label>
          )}
        </div>
        <div id="help" className="mx-auto w-full my-4">
          <p className="text-white text-center p-2 tracking-wide">
            To create an account, <br /> please contact the{" "}
            <a href="#" className="text-accent underline">
              admissions office.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
