const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const Follow = require("../../models/follow");
const User = require("../../models/user");
const { SECRET_KEY } = require("../../config");
const {
  validateRegisterInput,
  validateEmailInput,
} = require("../../util/validators");
const checkAuth = require("../../util/check-auth");

// helper function that takes in a user
// and generates a web token
const generateToken = (user) =>
  jwt.sign(
    // payload is current user
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "24h" }
  );

module.exports = {
  Mutation: {
    /************************/
    /** Login existing user */
    /************************/

    async login(_, { username, password }, context, __) {
      // validate username and password

      const { valid, errors } = validateEmailInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // find the user by using User.findOne query using username
      // if the user does not exist an error will be thrown

      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }

      // if password passes validation, use bcrypt to check if password
      // is correct, then generate web token

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Incorrect password";
        throw new UserInputError("Incorrect password", { errors });
      }
      const token = generateToken(user);

      // returns an object that contains the user document, id,
      // and token

      return {
        ...user._doc,
        id: user._id,
        token,
      };
    },

    /************************/
    /** Register a new user */
    /************************/

    async register(
      _,
      // registerInput: takes in the destructured User object
      { registerInput: { username, email, password, confirmPassword } },
      context,
      __
    ) {
      // check to make sure the register input is valid
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      // if the any of the input is not valid, throw an error
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // check to see if that username already exists,
      // will throw an error that can be used in UI
      const user = await User.findOne({ username });

      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is already taken",
          },
        });
      }
      // creates a new user in MongoDB, password is hashed
      // using brypt
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        timeStamp: new Date().toUTCString(),
        bio: '',
        interests: [''],
        banner: ''
      });
      // save the new user to mongoDB

      const res = await newUser.save();

      // after the new user has been registered, user gets added
      // to the following collection

      const newFollower = new Follow({
        username: res.username,
        userId: res._id,
      });
      newFollower.following.push(res._id);

      newFollower.save();

      // Create a web token

      const token = generateToken(res);

      // returns a new User TYPE object and token

      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async setBio(_, { body }, context, __) {
      const user = checkAuth(context);
      const currentUser = await User.findById(user.id);
      if (body.trim() === '') {
        throw new UserInputError('Empty Bio', {
          errors: {
            body: "Bio can't be empty"
          }
        })
      }
      currentUser.bio = body;
      await currentUser.save();
      return currentUser;
    }
  },

  /*******************/
  /** User queries  **/
  /*******************/

  Query: {
    // returns an array of users from MongoDB
    async getUsers() {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
