/* eslint-disable no-underscore-dangle */
const {
  Users,
} = require('../data');

const {
  generateToken,
} = require('../security/Jwt');

const {
  ServerError,
} = require('../errors');

const {
  hash,
  compare,
} = require('../security/Password');

const getAll = async () => Users.find();

const add = async (username, password, email) => {
  const hashedPassword = await hash(password);
  const role = 'user';
  const confirmed = false;

  const user = new Users({
    username,
    password: hashedPassword,
    email,
    role,
    confirmed,
  });
  await user.save();
  return user._id;
};

const addModerators = async (username, password) => {
  const hashedPassword = await hash(password);
  let role = 'support';
  const confirmed = true;
  switch (username) {
    case 'admin':
      role = 'admin';
      break;
    case 'support':
      role = 'support';
      break;
    default:
  }

  const user = new Users({
    username,
    password: hashedPassword,
    role,
    confirmed,
  });
  await user.save();
  return user._id;
};

const confirmUser = async (id) => {
  console.log('Got here too!');
  console.log(id);
  await Users.findByIdAndUpdate(id, { confirmed: true }, { new: true, useFindAndModify: false });
};

const authenticate = async (username, password) => {
  let foundUser = await Users.findOne({ username });
  const email = await Users.findOne({ email: username });

  if (foundUser === null && email === null) {
    throw new ServerError(`User with username ${username} does not exist!`, 404);
  }

  if (foundUser === null) {
    foundUser = email;
  }

  console.log('Got here x3!');
  console.log(foundUser);
  if (!foundUser.confirmed) {
    throw new ServerError('Please, confirm your email!', 404);
  }

  if (await compare(password, foundUser.password)) {
    const token = await generateToken({
      userId: foundUser._id,
      userRole: foundUser.role,
    });
    return {
      user: foundUser,
      token,
    };
  }
  throw new ServerError('User and password combination is not good!', 404);
};

module.exports = {
  add,
  authenticate,
  getAll,
  addModerators,
  confirmUser,
};
