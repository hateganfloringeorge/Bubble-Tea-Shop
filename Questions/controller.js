const express = require('express');
const nodemailer = require('nodemailer');

const QuestionsService = require('./services.js');
const {
  validateFields,
} = require('../utils');
const {
  authorizeAndExtractToken,
} = require('../security/Jwt');
const {
  // eslint-disable-next-line no-unused-vars
  ServerError,
} = require('../errors');
const {
  authorizeRoles,
} = require('../security/Roles');

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// The user adds the question
router.post('/', authorizeAndExtractToken, authorizeRoles('admin', 'user', 'support'), async (req, res, next) => {
  const {
    comment,
    userPosting,
  } = req.body;

  try {
    const fieldsToBeValidated = {
      comment: {
        value: comment,
        type: 'ascii',
      },
      userPosting: {
        value: userPosting,
        type: 'ascii',
      },
    };
    validateFields(fieldsToBeValidated);

    await QuestionsService.add(comment, userPosting);
    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allQuestions = await QuestionsService.getAll();
    res.json(allQuestions);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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
    const question = await QuestionsService.getById(id);
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.get('/authors/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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

    const question = await QuestionsService.getByUserId(id);
    res.json(question);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'support'), async (req, res, next) => {
  const {
    id,
  } = req.params;
  const {
    reply,
  } = req.body;

  try {
    const fieldsToBeValidated = {
      reply: {
        value: reply,
        type: 'ascii',
      },
    };

    validateFields(fieldsToBeValidated);

    const question = await QuestionsService.updateById(id, reply);
    console.log(question);
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: question.userPosting.email,
      subject: 'Answer received',
      html: `Hello,<br>We have answered one of your questions!<br>
      <br>Q: ${question.comment} <br>
      <br>A: ${reply}<br>`,
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

    res.status(201).send('Email sent');

    res.status(201).end();

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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

    await QuestionsService.deleteById(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.get('/change/:id', authorizeAndExtractToken, authorizeRoles('admin', 'support'), async (req, res, next) => {
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

    await QuestionsService.changeDisplay(id);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
