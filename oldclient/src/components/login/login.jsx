import React, { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Container, TextInput, Button } from "nes-react";

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
    <div>
      <h3>Sign into your account 🔑</h3>
      <Container className="login-container" rounded={true}>
        <form onSubmit={submitUser}>
          <TextInput
            type="text"
            placeholder="User name"
            name="username"
            value={user.username}
            error={errors.username}
            onChange={handleChange}
          />
          <br />
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            value={user.password}
            error={errors.password}
            onChange={handleChange}
          />
          <br />
          <Button className="button" type="submit" primary>
            {loading ? "...loading" : "submit"}
          </Button>
        </form>
        <Errors errors={errors} />
      </Container>
    </div>
  );
};

export default Login;
