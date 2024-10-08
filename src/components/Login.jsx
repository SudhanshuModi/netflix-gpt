import { useState, useRef } from "react";
import { Header } from ".";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // validate the form data
    if (!isSignInForm && nameRef.current.value.trim() == "") {
      setErrorMessage("Please Enter Full Name");
      return;
    } else {
      setErrorMessage(null);
    }
    const validateMessage = checkValidData(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrorMessage(validateMessage);
    if (validateMessage) return;

    // Sign In / Sign Up logic
    if (isSignInForm) {
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          // redirect to browse page
          navigate("/browse");
        })
        .catch((error) => {
          const { code, message } = error;
          setErrorMessage("Invalid Email or Password");
          console.log(`${code} => ${message}`);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                login({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
            })
            .catch((error) => {
              console.log(error);
              setErrorMessage("Something went wrong");
            });
          console.log(user);
        })
        .catch((error) => {
          const { code, message } = error;
          setErrorMessage("Email already in use");
          console.log(`${code} => ${message}`);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className=""
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
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-sm"
          />
        )}
        <input
          ref={emailRef}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-sm"
        />
        <p className="text-red-500">{errorMessage}</p>
        <button
          className="p-4 mt-4 bg-red-700 w-full font-semibold rounded-md"
          onClick={handleFormSubmit}
        >
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
