import { Container, TextInput, Button } from "nes-react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";

import { AuthContext} from "../../util/context/context";
import { REGISTER_USER } from "../../util/graphql/mutations";
import Errors from "../errors/errors";
import "./signup.css";

const Signup = () => {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [register, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      console.log(result);
      context.login(result.data.register)
      history.push("/newsfeed");
    },
    variables: newUser,
    onError(err) {
      const newErrors = err.graphQLErrors[0].extensions.exception.errors;
      setErrors(newErrors);
    },
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    register();
    setNewUser({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div>
      <h3>Register a new Account</h3>
      <Container rounded="true" className="login-container">
        <form onSubmit={onSubmit}>
          <TextInput
            type="text"
            placeholder="User name"
            name="username"
            onChange={handleChange}
            value={newUser.username}
          />
          <br />
          <TextInput
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={newUser.email}
          />
          <br />
          <TextInput
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={newUser.password}
          />
          <br />
          <TextInput
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            value={newUser.confirmPassword}
          />
          <br />
          <Button primary>{loading ? "loading..." : "Submit"}</Button>
        </form>
      </Container>
      <Errors errors={errors} />
    </div>
  );
};

export default Signup;
