//************************************//
//** These are the user regiser and **//
//** login validators used in the   **//
//** user input mutation            **//
//************************************//

module.exports.validateRegisterInput = (
  username,
  email,
  password,
  confirmPassword
) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "email must not be empty";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "email must be a valid email address";
    }
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateEmailInput = (username, password) => {
  const errors = {};
  if (username.trim() === "") {
    errors.username = "username must not be empty";
  }
  if (password.trim() === "") {
    errors.password = "password must not be empty";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
