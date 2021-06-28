import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../util/context/context";
import { LOGIN_USER } from "../../util/graphql/mutations";
import Errors from "../errors/errors";
import "./login.css";

const Login = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [login, { loading }] = useMutation(LOGIN_USER, {
    update(_, result) {
      context.login(result.data.login);
      history.push("/newsfeed");
    },
    variables: user,
    onError(err) {
      const newErrors = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(newErrors);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const submitUser = (event) => {
    event.preventDefault();
    login();
    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div style={{margin: 'auto'}}>
      <h3>Sign into your account 🔑</h3>
      <div className="login-container">
        <form onSubmit={submitUser}>
          <input
            type="text"
            placeholder="User name"
            name="username"
            value={user.username}
            error={errors.username}
            onChange={handleChange}
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            error={errors.password}
            onChange={handleChange}
          />
          <br />
          <input
            type="submit"
            className="button"
            value={loading ? "loading..." : "submit"}
          />
        </form>
      </div>
      <Errors errors={errors} />
    </div>
  );
};

export default Login;
