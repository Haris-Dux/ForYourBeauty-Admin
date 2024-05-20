import { reviewsAndRatings } from "../models/ReviewsModel.js";
import { setMongoose } from "../utils/Mongoose.js";

export const deleteReview = async (req,res,next) => {
    try {
        const { id } = req.body;
        if(!id) throw new Error("Review Id Not Found")
        await reviewsAndRatings.findByIdAndDelete(id);
        return res.status(201).json({ message: "Review updated successfully" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getAllReviews = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1; 
    const limit = 5;

    const reviewsData = await reviewsAndRatings.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({createdAt:-1})

    const total = await reviewsAndRatings.countDocuments();

    const response = {
      totalPages:Math.ceil(total / limit),
      page,
      reviewsData,
    };
    setMongoose();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: true, message:error.message });
  }
};

