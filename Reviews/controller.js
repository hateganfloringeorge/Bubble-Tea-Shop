const express = require('express');

const ReviewsService = require('./services.js');
const {
  validateFields,
} = require('../utils');
const {
  authorizeAndExtractToken,
} = require('../security/Jwt');
const {
  authorizeRoles,
} = require('../security/Roles');

const router = express.Router();

router.post('/', authorizeAndExtractToken, authorizeRoles('admin', 'user', 'support'), async (req, res, next) => {
  const {
    userPosting,
    message,
    rating,
  } = req.body;
  try {
    const fieldsToBeValidated = {
      userPosting: {
        value: userPosting,
        type: 'ascii',
      },
      message: {
        value: message,
        type: 'ascii',
      },
      rating: {
        value: rating,
        type: 'int',
      },
    };
    validateFields(fieldsToBeValidated);

    await ReviewsService.add(userPosting, message, rating);

    res.status(201).end();
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allReviews = await ReviewsService.getAll();
    res.json(allReviews);
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
    const review = await ReviewsService.getById(id);
    res.json(review);
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

    await ReviewsService.changeDisplay(id);
    res.status(200).end();
  } catch (err) {
    next(err);
  }
});

router.get('/user/:id', authorizeAndExtractToken, authorizeRoles('admin'), async (req, res, next) => {
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

    const review = await ReviewsService.getByUserId(id);
    res.json(review);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authorizeAndExtractToken, authorizeRoles('admin', 'support'), async (req, res, next) => {
  const {
    id,
  } = req.params;
  const {
    userPosting,
    message,
    rating,
    showOnSite,
  } = req.body;

  try {
    const fieldsToBeValidated = {
      userPosting: {
        value: userPosting,
        type: 'ascii',
      },
      message: {
        value: message,
        type: 'ascii',
      },
      rating: {
        value: rating,
        type: 'int',
      },
      showOnSite: {
        value: showOnSite,
        type: 'bool',
      },
    };
    validateFields(fieldsToBeValidated);

    await ReviewsService.updateById(id, userPosting, message, rating, showOnSite);
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

    await ReviewsService.deleteById(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
