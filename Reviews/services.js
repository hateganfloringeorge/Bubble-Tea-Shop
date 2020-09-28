const {
  Reviews,
} = require('../data');

const add = async (userPosting, message, rating) => {
  console.log(`Am adaugat review #${userPosting}, #${message}, #${rating}`);
  const newReview = new Reviews({
    userPosting,
    message,
    rating,
  });
  await newReview.save();
};

const getAll = async () => {
  const allReviews = await Reviews.find().lean().populate('userPosting');
  return allReviews;
};

const getById = async (id) => {
  const review = await Reviews.findById(id).lean().populate('userPosting');
  /*
    const { firstName, lastName } = book.author;
    book.author = `${firstName} ${lastName}`;
    */
  return review;
};

const getByUserId = async (id) => {
  const review = await Reviews.find({ userPosting: id }).lean().populate('userPosting');
  console.log(review);
  /*
    books.forEach((element, ind) => {
      const { firstName, lastName } = element.author;
      books[ind].author = `${firstName} ${lastName}`;
    });
    */
  return review;
};

const updateById = async (id, userPosting, message, rating, showOnSite) => {
  console.log(`${userPosting}, ${message}, ${rating}, ${showOnSite}`);
  await Reviews.findByIdAndUpdate(id, {
    userPosting, message, rating, showOnSite,
  });
};

const deleteById = async (id) => {
  await Reviews.findByIdAndDelete(id);
};

const changeDisplay = async (id) => {
  const review = await Reviews.findById(id).lean().populate('userPosting');
  if (review.showOnSite) {
    await Reviews.findByIdAndUpdate(id, { showOnSite: false });
  } else {
    await Reviews.findByIdAndUpdate(id, { showOnSite: true });
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
