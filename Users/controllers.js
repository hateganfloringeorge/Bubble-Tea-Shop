
const express = require('express');
const nodemailer = require('nodemailer');

const UsersService = require('./services.js');
const {
  validateFields,
} = require('../utils');
const {
  authorizeAndExtractToken,
} = require('../security/Jwt');
const {
  authorizeRoles,
} = require('../security/Roles');
const {
  ServerError,
} = require('../errors');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


router.post('/registerAdmin', async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  // validare de campuri
  try {
    const fieldsToBeValidated = {
      username: {
        value: username,
        type: 'ascii',
      },
      password: {
        value: password,
        type: 'ascii',
      },
    };
    validateFields(fieldsToBeValidated);
    await UsersService.addModerators(username, password);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.post('/register', async (req, res, next) => {
  const {
    username,
    password,
    email,
  } = req.body;

  // validare de campuri
  try {
    const fieldsToBeValidated = {
      username: {
        value: username,
        type: 'ascii',
      },
      password: {
        value: password,
        type: 'ascii',
      },
      email: {
        value: email,
        type: 'email',
      },
    };
    validateFields(fieldsToBeValidated);
    const userId = await UsersService.add(username, password, email);

    const link = `http://${req.get('host')}/api/v1/users/confirmation/${userId}`;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Email confirmation',
      html: `Hello,<br> Please confirm your email address using the link below!<br>
      <form action=${link}>
        <input type="submit" value="Click here to verify" />
      </form>`,
    };
    // eslint-disable-next-line no-unused-vars
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        throw new ServerError('Error sending email', 404);
      } else {
        console.log('Sent to email!');
        res.end('Mail sucessfully sent!');
      }
    });

    res.status(201).send('Please, comfirm your email address!');

    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const {
    username,
    password,
  } = req.body;

  try {
    const fieldsToBeValidated = {
      username: {
        value: username,
        type: 'ascii',
      },
      password: {
        value: password,
        type: 'ascii',
      },
    };

    validateFields(fieldsToBeValidated);

    const data = await UsersService.authenticate(username, password);

    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
  try {
    const allUsers = await UsersService.getAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.get('/confirmation/:id', async (req, res, next) => {
  const {
    id,
  } = req.params;

  try {
    validateFields({
      id: {
        value: id,
        type: 'ascii',
      },
    });
    console.log('Got here!');
    await UsersService.confirmUser(id);
    res.status(200).send('Email address confirmed!');
  } catch (err) {
    next(err);
  }
});

module.exports = router;
