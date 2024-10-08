import { useState } from "react";
import { Header } from ".";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/4d2c5849-b306-4884-9036-6211f7ee0178/web/IN-en-20240930-TRIFECTA-perspective_1e1ca6cd-9e2d-4e9d-9e4b-ba0c2d3a0e31_large.jpg"
          alt="netfix-background"
        />
      </div>
      <form className="absolute p-12 w-3/12 mx-auto right-0 left-0 my-36 bg-black text-white bg-opacity-80 rounded-lg">
        <h1 className="text-3xl font-bold py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <input
          type="text"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <button className="p-4 mt-4 bg-red-700 w-full font-semibold rounded-md">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-sm my-4">
          {isSignInForm ? "New to Netflix?" : "Already registered?"}
          <span
            className="text-blue-700 px-1 cursor-pointer"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up" : "Sign In"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
