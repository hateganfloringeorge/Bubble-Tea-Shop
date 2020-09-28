const {
  Questions,
} = require('../data');

const add = async (comment, userPosting) => {
  console.log(`Am adaugat #${comment}, #${userPosting}`);
  const newQuestion = new Questions({
    comment,
    userPosting,
  });
  await newQuestion.save();
};

const getAll = async () => {
  const allQuestions = await Questions.find().lean().populate('userPosting');
  return allQuestions;
};

const getById = async (id) => {
  const question = await Questions.findById(id).lean().populate('userPosting');
  return question;
};

const getByUserId = async (id) => {
  const question = await Questions.find({ userPosting: id }).lean().populate('userPosting');
  console.log(question);
  return question;
};

const updateById = async (id, reply) => {
  await Questions.findByIdAndUpdate(id, { reply });
  return Questions.findById(id).lean().populate('userPosting');
};

const deleteById = async (id) => {
  await Questions.findByIdAndDelete(id);
};

const changeDisplay = async (id) => {
  const review = await Questions.findById(id).lean().populate('userPosting');
  if (review.faq) {
    await Questions.findByIdAndUpdate(id, { faq: false });
  } else {
    await Questions.findByIdAndUpdate(id, { faq: true });
  }
};

module.exports = {
  add,
  getAll,
  getById,
  getByUserId,
  updateById,
  deleteById,
  changeDisplay,
};
