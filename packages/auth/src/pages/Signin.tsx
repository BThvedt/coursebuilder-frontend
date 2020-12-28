import React, { FC } from "react";
import { Link } from "react-router-dom";

interface IProps {
  onSignIn: () => void;
}

const Signin: FC<IProps> = ({ onSignIn }) => {
  console.log("IN Signin and type of onSign IN is");
  console.log(typeof onSignIn);

  return (
    <>
      <h2>Signin</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSignIn();
        }}
      >
        <p>
          <label htmlFor="username">Email</label>
          <input name="username" id="username" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" />
        </p>
        <button>Signin</button>
      </form>
      <Link to="/auth/signup">SignUp</Link>
    </>
  );
};

export default Signin;
