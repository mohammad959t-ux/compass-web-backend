import { Router } from "express";

import { getReviewLink, submitReviewLink } from "../controllers/publicReviewLink.controller.js";
import { validate } from "../middlewares/validate.js";
import { submitReviewSchema } from "../validations/review.schema.js";

const router = Router();

router.get("/review-links/:token", getReviewLink);
router.post("/review-links/:token", validate(submitReviewSchema), submitReviewLink);

router.post("/reviews/submit", validate(submitReviewSchema), (req, res) => {
  req.params.token = req.body.token;
  return submitReviewLink(req, res);
});

export default router;
