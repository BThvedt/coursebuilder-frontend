import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  onSignIn: () => void;
}

const Singup: FC<IProps> = ({ onSignIn }) => {
  return (
    <>
      <h2>Signup</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn();
        }}
      >
        <p>
          <label htmlFor="username">Username</label>
          <input name="username" id="username" />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input name="email" id="emails" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
        </p>
        <button>Signin</button>
      </form>
      <Link to="/auth/signin">Signin</Link>
    </>
  );
};

export default Singup;
