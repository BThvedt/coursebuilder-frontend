import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  isSignedIn: boolean;
  setIsSignedIn: (signedInState: boolean) => void;
}

const Header: FC<IProps> = ({ isSignedIn, setIsSignedIn }) => {
  return (
    <div>
      <Link to="/">App</Link>
      {isSignedIn ? (
        <button onClick={() => setIsSignedIn(false)}>Logout</button>
      ) : (
        <Link to="/auth/signin">Login</Link>
      )}
    </div>
  );
};

export default Header;
