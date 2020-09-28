const Router = require('express')();

const QuestionsController = require('../Questions/controller.js');
const ReviewsController = require('../Reviews/controller.js');
const UsersController = require('../Users/controllers.js');

Router.use('/questions', QuestionsController);
Router.use('/reviews', ReviewsController);
Router.use('/users', UsersController);

module.exports = Router;
