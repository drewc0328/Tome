import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Login from "./Login";
import User from "../Models/User";
import { AppContext } from "../AppContext";

const LoginContainer: React.FC<{}> = () => {
  const { setUser, setError } = useContext(AppContext);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [redirectMain, setRedirectMain] = useState<boolean>(false);
  // const [localUser, setLocalUser] = useLocalStorage("user", {

  const login = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
      } else {
        setUser(responseData.user);
        setError("");
        setRedirectMain(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const signup = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        setError(responseData.message);
      } else {
        setUser(responseData.user);
        setError("");
        setRedirectMain(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {redirectMain && <Redirect to="/app" />}
      <Login
        login={login}
        signup={signup}
        setUsername={setUsername}
        setPassword={setPassword}
      />
    </div>
  );
};

export default LoginContainer;
