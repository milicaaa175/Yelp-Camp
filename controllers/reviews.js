const Campground = require('../models/campground');
const Review = require('../models/review');

module.exports.new = async (req, res) => {
    const camp = await Campground.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    camp.reviews.push(review);
    await review.save();
    await camp.save();
    req.flash('success', 'Created a new review!');
    res.redirect(`/campgrounds/${camp._id}`);
};

module.exports.delete = async (req, res) => {
    await Campground.findByIdAndUpdate(req.params.id, {$pull: {reviews: req.params.reviewId}});
    await Review.findByIdAndDelete(req.params.reviewId);
    req.flash('success', 'Deleted a review!');
    res.redirect(`/campgrounds/${req.params.id}`);
};