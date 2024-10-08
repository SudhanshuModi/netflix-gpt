import { useDispatch, useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { login, logout } from "../utils/userSlice";
import { LOGO, USER_AVATAR } from "../utils/constants";

const Header = () => {
  const user = useSelector((state) => state?.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(login({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
      } else {
        dispatch(logout());
        navigate("/");
      }
    });

    // unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="w-full absolute px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <div>
        <img className="w-44" src={LOGO} alt="netflix-logo" />
      </div>
      {user && (
        <div className="flex p-2 items-center gap-2">
          <img
            className="w-12 h-12 rounded-sm"
            src={USER_AVATAR}
            alt="user-icon"
          />
          <button
            className="font-bold text-white"
            onClick={() => signOut(auth)}
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
